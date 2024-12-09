import Delete from "./CRUD/Delete";
import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";

const API_URL = "http://localhost:8080/api/accounts";

interface Account {
  id: number;
  login: string;
  password: string;
  firstname: string;
  lastname: string;
  city: string;
  study: string;
  role: string;
  phone: string;
  createdat: Date;
  editedat: Date;
  valid: boolean;
  date: Date;
}

const Accounts = {
  Create: async (Data: Account) => {
    return await Post(API_URL, Data);
  },
  Read: async () => {
    return await Get(API_URL);
  },
  ReadOne: async (id: string) => {
    return await Get(`${API_URL}/${id}`);
  },
  Login: async (Data: any) => {
    return await Post(`${API_URL}/login`, Data); // Utilisez Post au lieu de Get
  },
  Update: async (Data: Account) => {
    return await Put(API_URL, Data);
  },
  Delete: async (id: string) => {
    return await Delete(API_URL, id);
  },
};

export default Accounts;
