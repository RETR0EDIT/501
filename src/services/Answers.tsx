import Delete from "./CRUD/Delete";

import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";
import ModelAnswers from "../models/ModelAnswers";

const API_URL = `${import.meta.env.VITE_API_URL}/answers`;

const Answers = {
  Create: async (Data: ModelAnswers) => {
    return await Post(API_URL, Data);
  },
  Read: async () => {
    return await Get(API_URL);
  },
  ReadOne: async (id: string) => {
    return await Get(`${API_URL}/${id}`);
  },
  ReadByUserId: async (userId: string) => {
    return await Get(`${API_URL}/user/${userId}`);
  },
  Update: async (Data: ModelAnswers) => {
    return await Put(API_URL, Data);
  },
  Delete: async (id: string) => {
    return await Delete(API_URL, id);
  },
};

export default Answers;
