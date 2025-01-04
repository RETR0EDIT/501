import React from "react";
import "./styles/PolitiqueConfidentialite.css";

const PolitiqueConfidentialite: React.FC = () => {
    return (
        <div className="politique-confidentialite-container">
            <h1 className="politique-confidentialite-title">Politique de Confidentialité</h1>
            <div className="politique-confidentialite-content">
                <p>
                    <strong>Introduction :</strong><br />
                    Nous attachons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique quelles données nous collectons, comment nous les utilisons et quels sont vos droits à cet égard.
                </p>
                <p>
                    <strong>Données collectées :</strong><br />
                    Nous collectons les données que vous nous fournissez directement, telles que votre nom, adresse e-mail, et toute autre information que vous choisissez de nous communiquer.
                </p>
                <p>
                    <strong>Utilisation des données :</strong><br />
                    Les données collectées sont utilisées pour fournir et améliorer nos services, communiquer avec vous, et respecter nos obligations légales.
                </p>
                <p>
                    <strong>Partage des données :</strong><br />
                    Nous ne partageons pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour fournir nos services ou si la loi nous y oblige.
                </p>
                <p>
                    <strong>Sécurité des données :</strong><br />
                    Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
                </p>
                <p>
                    <strong>Vos droits :</strong><br />
                    Vous avez le droit d'accéder à vos données personnelles, de les rectifier, de demander leur suppression, et de vous opposer à leur traitement. Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : contact@entreprise.com.
                </p>
                <p>
                    <strong>Modifications de la politique :</strong><br />
                    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.
                </p>
            </div>
        </div>
    );
};

export default PolitiqueConfidentialite;