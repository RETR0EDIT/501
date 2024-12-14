import React, { useState } from "react";
import axios from "axios";

interface UploadProps {
  uploadUrl: string;
  onUploadSuccess: (imageUrl: string) => void;
  onUploadError?: (error: string) => void;
}

export const Upload: React.FC<UploadProps> = ({ uploadUrl, onUploadSuccess, onUploadError }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Veuillez sélectionner une image.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setMessage("Utilisateur non connecté.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `${uploadUrl}/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Image téléchargée avec succès.");
      const imageUrl = response.data; // Supposons que l'URL de l'image est renvoyée dans la réponse
      setImageUrl(imageUrl); // Mettre à jour l'état avec l'URL de l'image
      onUploadSuccess(imageUrl); // Appeler la fonction de rappel avec l'URL de l'image
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? `Erreur lors du téléchargement de l'image: ${error.response?.data || error.message}`
        : "Erreur lors du téléchargement de l'image.";
      setMessage(errorMessage);
      if (onUploadError) {
        onUploadError(errorMessage);
      }
      console.error("Erreur lors du téléchargement de l'image", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Télécharger</button>
      <p>{message}</p>
    </div>
  );
};