import Delete from "./CRUD/Delete";
import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";

const API_URL = "http://localhost:8080/api/rates";

interface Rate {
    id: number;
    note: string;
}

const Rates = {
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

export default Rates;