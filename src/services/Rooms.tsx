import Delete from "./CRUD/Delete";
import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";
import ModelRooms from "../models/ModelRooms";

const API_URL = `${import.meta.env.VITE_API_URL}/rooms`;

const Rooms = {
  Create: async (Data: ModelRooms) => {
    return await Post(API_URL, Data);
  },
  Read: async () => {
    return await Get(API_URL);
  },

  Update: async (Data: ModelRooms) => {
    return await Put(API_URL, Data);
  },
  Delete: async (id) => {
    return await Delete(API_URL, id);
  },
};

export default Rooms;
