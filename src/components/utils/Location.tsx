import React, { useEffect, useState } from "react";
import Popup from "./Popup";

const Location: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const latMin = 48.954151;
  const latMax = 48.955143;
  const lonMin = 2.877383;
  const lonMax = 2.87932;

  const epicenterLat = (latMin + latMax) / 2;
  const epicenterLon = (lonMin + lonMax) / 2;

  console.log(`Épicentre: Latitude ${epicenterLat}, Longitude ${epicenterLon}`);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (
            latitude >= latMin &&
            latitude <= latMax &&
            longitude >= lonMin &&
            longitude <= lonMax
          ) {
            setLocation({ lat: latitude, lon: longitude });
          } else {
            setError(
              `Vous ne vous trouvez pas dans le secteur autorisé. Vos coordonnées sont.
              Pour les utilisateurs Windows, veuillez vérifier dans les paramètres de confidentialité si la localisation est activée.
               ${latitude} ${longitude}`
            );
          }
        },
        (err) => {
          setError("Erreur lors de la récupération de la localisation");
          console.error("Erreur de géolocalisation", err);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par ce navigateur");
    }
  }, []);

  return (
    <div className="location-container">
      {location && (
        <p>
          Localisation: Latitude {location.lat}, Longitude {location.lon}
        </p>
      )}
      {error && <Popup message={error} />}
    </div>
  );
};

export default Location;
