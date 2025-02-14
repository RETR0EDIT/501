import React, { useState, useEffect } from "react";
import Accounts from "../../services/Accounts";
import { Upload } from "../../services/Upload";
import ModelAccount from "../../models/ModelAccount";
import Resume from "../utils/Resume";
import "../styles/professeur/ProfilsProf.css";

const ProfilsProf: React.FC = () => {
  const [user, setUser] = useState<ModelAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const API_URL = `${import.meta.env.VITE_API_URL}/upload`;
  const uploadUrl = import.meta.env.VITE_UPLOAD_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("Utilisateur non connecté.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await Accounts.ReadOne(userId);
        setUser(response);
        setProfileImage(response.image);
      } catch (err) {
        setError(
          "Erreur lors de la récupération des informations de l'utilisateur."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log("uploadUrl:", uploadUrl);
  }, [uploadUrl]);

  const handleUploadSuccess = (imageUrl: string) => {
    setProfileImage(imageUrl);
  };

  if (isLoading) {
    return <div className="loading">Chargement des données...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profils-visiteur">
      <div className="container-prof">
        <div className="large-section">
          <div className="profile-circle">
            <img
              src={
                profileImage ? `${uploadUrl}/${profileImage}` : `/default.svg`
              }
              alt="Avatar utilisateur"
            />
            <Upload uploadUrl={API_URL} onUploadSuccess={handleUploadSuccess} />
          </div>

          <h2 className="profile-name">{`${user?.firstname || ""} ${
            user?.lastname || ""
          }`}</h2>
          <div className="divider-bar"></div>
          <p className="role">{user?.role || "Rôle non défini"}</p>
        </div>
        <div className="resume_pc">
          <Resume />
        </div>
      </div>
      <div className="small-section">
        <h3 className="section-title">Compte</h3>
        <div className="details-grid">
          <div className="detail-item">
            <label>Email</label>
            <p>{user?.login || "exemple@gmail.com"}</p>
          </div>
          <div className="detail-item">
            <label>Mot de passe</label>
            <p>**************</p>
          </div>
          <div className="detail-item">
            <label>Numéro de téléphone</label>
            <p>{user?.phone || "+33 701 44 23 65"}</p>
          </div>
        </div>
      </div>
      <div className="resume_phone">
        <Resume />
      </div>
    </div>
  );
};

export default ProfilsProf;
