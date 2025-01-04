import React from "react";
import axios from "axios";
import pica from "pica";

interface UploadProps {
  uploadUrl: string;
  onUploadSuccess: (imageUrl: string) => void;
  onUploadError?: (error: string) => void;
}

export const Upload: React.FC<UploadProps> = ({
  uploadUrl,
  onUploadSuccess,
  onUploadError,
}) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file);

      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("Utilisateur non connecté.");
        return;
      }

      console.log("User ID:", userId);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = async () => {
        const picaInstance = pica();

        const width = 500;
        const height = (img.height / img.width) * width;
        canvas.width = width;
        canvas.height = height;

        await picaInstance.resize(img, canvas);

        canvas.toBlob(
          async (blob) => {
            if (blob) {
              const formData = new FormData();
              formData.append("image", blob, "image.jpg");

              console.log("FormData prepared:", formData);

              try {
                console.log("Sending request to:", `${uploadUrl}/${userId}`);
                const response = await axios.post(
                  `${uploadUrl}/${userId}`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                console.log("Response received:", response);

                let imageUrl = response.data;
                console.log("Image URL before modification:", imageUrl);

                onUploadSuccess(imageUrl);
                console.log(
                  "Upload success callback called with URL:",
                  imageUrl
                );
              } catch (error) {
                const errorMessage = axios.isAxiosError(error)
                  ? `Erreur lors du téléchargement de l'image: ${
                      error.response?.data || error.message
                    }`
                  : "Erreur lors du téléchargement de l'image.";
                if (onUploadError) {
                  onUploadError(errorMessage);
                }
                console.error(
                  "Erreur lors du téléchargement de l'image",
                  error
                );
              }
            }
          },
          "image/jpeg",
          0.8
        );
      };

      img.src = URL.createObjectURL(file);
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div className="upload-container">
      <label htmlFor="file-upload" className="custom-file-upload">
        <img src="/pen.svg" alt="Upload" />
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};
