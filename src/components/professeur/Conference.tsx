import React, { useState, useEffect } from "react";
import Conferences from "../../services/Conferences";
import Rooms from "../../services/Rooms";
import ModelConference from "../../models/ModelConference";
import ModelRoom from "../../models/ModelRooms";
import "../styles/professeur/Conference.css";
import Accounts from "../../services/Accounts";

export default function ConferenceProf() {
  const [conferences, setConferences] = useState<ModelConference[]>([]);
  const [filteredConferences, setFilteredConferences] = useState<
    ModelConference[]
  >([]);
  const [selectedConference, setSelectedConference] =
    useState<ModelConference | null>(null);
  const [userId, setUserId] = useState<number | null>(
    localStorage.getItem("userId")
      ? parseInt(localStorage.getItem("userId")!, 10)
      : null
  );
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [rooms, setRooms] = useState<ModelRoom[]>([]);

  const [filters, setFilters] = useState({
    title: "",
    startDate: "",
    endDate: "",
    room: "",
    myConferences: false,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        const user = await Accounts.ReadOne(userId.toString());
        setUserFirstName(user.firstname);
        setUserLastName(user.lastname);
      }
    };

    const fetchConferences = async () => {
      const response = await Conferences.Read();
      setConferences(response);
      setFilteredConferences(response);
    };

    const fetchRooms = async () => {
      const response = await Rooms.Read();
      setRooms(response);
    };

    fetchUserDetails();
    fetchConferences();
    fetchRooms();
  }, [userId]);

  useEffect(() => {
    applyFilters();
  }, [filters, conferences]);

  const checkRoomConflict = (conference: ModelConference) => {
    return conferences.some(
      (conf) =>
        conf.room.id === conference.room.id &&
        conf.id !== conference.id &&
        ((new Date(conf.tstart) <= new Date(conference.tstart) &&
          new Date(conf.tend) > new Date(conference.tstart)) ||
          (new Date(conf.tstart) < new Date(conference.tend) &&
            new Date(conf.tend) >= new Date(conference.tend)))
    );
  };

  const handleCreateOrUpdate = async (conference: ModelConference) => {
    if (new Date(conference.tend) <= new Date(conference.tstart)) {
      alert("L'heure de fin doit être supérieure à l'heure de début.");
      return;
    }

    if (checkRoomConflict(conference)) {
      alert(
        "Il y a déjà une conférence programmée dans cette salle à ce moment-là."
      );
      return;
    }

    if (conference.id) {
      await Conferences.Update(conference);
    } else {
      conference.master = `${userFirstName ?? ""} ${userLastName ?? ""}`;
      const room = rooms.find((r) => r.id === conference.room.id);
      if (room) {
        conference.room = room;
      }

      conference.tstart = conference.tstart.includes(":00")
        ? conference.tstart
        : `${conference.tstart}:00`;

      conference.tend = conference.tend.includes(":00")
        ? conference.tend
        : `${conference.tend}:00`;

      await Conferences.Create(conference);
    }
    const response = await Conferences.Read();
    setConferences(response);
    setSelectedConference(null);
  };

  const handleDelete = async (id: number) => {
    await Conferences.Delete(id.toString());
    const response = await Conferences.Read();
    setConferences(response);
  };

  const handleEdit = (conference: ModelConference) => {
    setSelectedConference(conference);
  };

  const handleCancel = () => {
    setSelectedConference(null);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    let filtered = conferences;

    if (filters.title) {
      filtered = filtered.filter((conference) =>
        conference.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(
        (conference) =>
          new Date(conference.tstart) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(
        (conference) => new Date(conference.tend) <= new Date(filters.endDate)
      );
    }

    if (filters.room) {
      filtered = filtered.filter((conference) =>
        conference.room.name.toLowerCase().includes(filters.room.toLowerCase())
      );
    }

    if (filters.myConferences) {
      filtered = filtered.filter((conference) => {
        return conference.account.id === userId;
      });
    }

    setFilteredConferences(filtered);
  };

  const getUniqueRooms = () => {
    const rooms = conferences.map((conference) => conference.room.name);
    return Array.from(new Set(rooms));
  };

  return (
    <div className="conference-container">
      <h1 className="conference-title">Gestion des Conférences</h1>
      <ConferenceForm
        conference={selectedConference}
        onSave={handleCreateOrUpdate}
        onCancel={handleCancel}
        rooms={rooms}
      />
      <div className="filters">
        <h2>Filtre</h2>
        <div>
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
            placeholder="Filtrer par titre"
            className="filter-input"
          />
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            placeholder="Filtrer par date de début"
            className="filter-input"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            placeholder="Filtrer par date de fin"
            className="filter-input"
          />
          <select
            name="room"
            value={filters.room}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Toutes les salles</option>
            {getUniqueRooms().length === 0 ? (
              <option value="">Aucune salle</option>
            ) : (
              getUniqueRooms().map((room, index) => (
                <option key={index} value={room}>
                  {room}
                </option>
              ))
            )}
          </select>
          <label>
            <input
              type="checkbox"
              name="myConferences"
              checked={filters.myConferences}
              onChange={(e) =>
                setFilters({ ...filters, myConferences: e.target.checked })
              }
            />
            Mes conférences
          </label>
        </div>
      </div>
      <ConferenceList
        conferences={filteredConferences}
        onEdit={handleEdit}
        onDelete={handleDelete}
        userId={userId}
      />
    </div>
  );
}

interface ConferenceFormProps {
  conference: ModelConference | null;
  onSave: (conference: ModelConference) => void;
  onCancel: () => void;
  rooms: ModelRoom[];
}

const ConferenceForm: React.FC<ConferenceFormProps> = ({
  conference,
  onSave,
  onCancel,
  rooms,
}) => {
  const [formData, setFormData] = useState<ModelConference>(
    conference || {
      id: 0,
      master: "",
      tstart: "",
      tend: "",
      title: "",
      content: "",
      room: { id: 0, name: "" }, // Assurez-vous que room est un objet avec une propriété id et name
      account: {
        id: 0,
        login: "",
        firstname: "",
        lastname: "",
      },
    }
  );

  useEffect(() => {
    if (conference) {
      setFormData({
        ...conference,
        tstart: conference.tstart,
        tend: conference.tend,
      });
    }
  }, [conference]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selectedRoom = rooms.find((room) => room.id === parseInt(value));
    if (selectedRoom) {
      setFormData({
        ...formData,
        room: selectedRoom,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="conference-form">
      <div className="form-clan">
        <div className="form-group">
          <label htmlFor="title" className="form-label-conf">
            Titre
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre"
            required
            className="form-input-conf"
          />
        </div>
        <div className="form-group">
          <label htmlFor="room" className="form-label-conf">
            Salle
          </label>
          <select
            name="room"
            value={formData.room.id}
            onChange={handleRoomChange}
            required
            className="form-select-conf"
          >
            <option value="">Sélectionner une salle</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-clan">
        <div className="form-group">
          <label htmlFor="tstart" className="form-label-conf">
            Début
          </label>
          <input
            type="time"
            name="tstart"
            value={formData.tstart}
            onChange={handleChange}
            required
            className="form-input-conf"
            min="08:00"
            max="18:00"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tend" className="form-label-conf">
            Fin
          </label>
          <input
            type="time"
            name="tend"
            value={formData.tend}
            onChange={handleChange}
            required
            className="form-input-conf"
            min="08:00"
            max="18:00"
          />
        </div>
      </div>
      <div className="form-clan">
        <div className="form-area">
          <label htmlFor="content" className="form-label-conf">
            Contenu
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Contenu"
            required
            className="form-textarea-conf"
          />
        </div>
      </div>
      <div className="form-actions-conf">
        <button type="submit" className="form-button">
          Enregistrer
        </button>
      </div>
    </form>
  );
};

interface ConferenceListProps {
  conferences: ModelConference[];
  onEdit: (conference: ModelConference) => void;
  onDelete: (id: number) => void;
  userId: number | null;
}

const ConferenceList: React.FC<ConferenceListProps> = ({
  conferences,
  onEdit,
  onDelete,
  userId,
}) => {
  return (
    <div className="conference-list">
      {conferences.map((conference) => (
        <div key={conference.id} className="conference-item">
          <h3 className="conference-item-title">{conference.title}</h3>

          <p className="conference-item-room">Salle: {conference.room.name}</p>
          <p className="conference-item-time">Début: {conference.tstart}</p>
          <p className="conference-item-time">Fin: {conference.tend}</p>
          <p className="conference-item-master">
            Créé par: {conference.account.firstname}{" "}
            {conference.account.lastname}
          </p>
          {conference.account.id === userId && (
            <div className="conference-item-actions">
              <button
                onClick={() => onEdit(conference)}
                className="conference-item-button"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(conference.id)}
                className="conference-item-button"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
