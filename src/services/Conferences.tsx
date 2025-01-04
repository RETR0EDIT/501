import Delete from "./CRUD/Delete";
import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";
import ModelConference from "../models/ModelConference";
import { env } from "../../env";
const API_URL = `${env.VITE_APP_API_URL}/conferences`;

const Conferences = {
  Create: async (Data: ModelConference) => {
    const userId = localStorage.getItem("userId");
    return await Post(`${API_URL}?userId=${userId}`, Data);
  },
  Read: async () => {
    return await Get(API_URL);
  },
  Update: async (Data: ModelConference) => {
    return await Put(`${API_URL}/${Data.id}`, Data);
  },
  Delete: async (id: string) => {
    return await Delete(API_URL, id);
  },
};

export default Conferences;
