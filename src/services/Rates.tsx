import Delete from "./CRUD/Delete";
import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";
import ModelRate from "../models/ModelRooms";

const API_URL = `${import.meta.env.VITE_API_URL}/rates`;

const Rates = {
  Create: async (Data) => {
    return await Post(API_URL, Data);
  },
  Read: async () => {
    return await Get(API_URL);
  },
  ReadByStudy: async (study: string) => {
    return await Get(`${API_URL}/study/${study}`);
  },
  Update: async (Data) => {
    return await Put(API_URL, Data);
  },
  Delete: async (id) => {
    return await Delete(API_URL, id);
  },
};

export default Rates;
