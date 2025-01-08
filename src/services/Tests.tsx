import Delete from "./CRUD/Delete";
import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";
import ModelTest from "../models/ModelTest";

const API_URL = `${import.meta.env.VITE_API_URL}/tests`;

const Tests = {
  Create: async (Data: ModelTest) => {
    return await Post(API_URL, Data);
  },
  GetByStudy: async (study: string) => {
    return await Get(`${API_URL}/study/${study}`);
  },
  Read: async () => {
    return await Get(API_URL);
  },
  Update: async (Data: ModelTest) => {
    return await Put(API_URL, Data);
  },
  Delete: async (id: string) => {
    return await Delete(API_URL, id);
  },
};

export default Tests;
