import Delete from "./CRUD/Delete";
import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";
import ModelRooms from "../models/ModelRooms";
import { env } from "../../env";
const API_URL = `${env.VITE_APP_API_URL}/rooms`;

const Rooms = {
  Create: async (Data) => {
    return await Post(API_URL, Data);
  },
  Read: async () => {
    return await Get(API_URL);
  },

  Update: async (Data) => {
    return await Put(API_URL, Data);
  },
  Delete: async (id) => {
    return await Delete(API_URL, id);
  },
};

export default Rooms;
