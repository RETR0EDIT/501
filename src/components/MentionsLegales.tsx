import React from "react";
import "./styles/MentionsLegales.css";

const MentionsLegales: React.FC = () => {
    return (
        <div className="mentions-legales-container">
            <h1 className="mentions-legales-title">Mentions Légales</h1>
            <div className="mentions-legales-content">
                <p>
                    <strong>Éditeur du site :</strong><br />
                    Xtraide inc<br />
                    6 Rue Marcel Clavier Coulommiers <br />
                    Email : contact@entreprise.com
                </p>
                <p>
                    <strong>Directeur de la publication :</strong><br />
                    Nicolas Thieblemont
                </p>

                <p>
                    <strong>Propriété intellectuelle :</strong><br />
                    Le contenu du site, incluant, de façon non limitative, les textes, images, graphismes, logos, icônes, et sons, est la propriété de l'éditeur du site ou de ses partenaires.
                </p>
                <p>
                    <strong>Conditions d'utilisation :</strong><br />
                    L'utilisation de ce site implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment.
                </p>
            </div>
        </div>
    );
};

export default MentionsLegales;