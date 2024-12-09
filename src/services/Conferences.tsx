import Delete from "./CRUD/Delete";
import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";

const API_URL = "http://localhost:8080/api/conferences";

interface Conference {
    id: number;
    master: string;
    tstart: Date;
    tend: Date;
    title: string;
    content: string;
    room: string;
}
const Conferences = {
    Create: async (Data: Conference) => {
        return await Post(API_URL, Data);
    },
    Read: async () => {
        return await Get(API_URL);
    },
    Update: async (Data: Conference) => {
        return await Put(API_URL, Data);
    },
    Delete: async (id: string) => {
        return await Delete(API_URL, id);
    },
};

export default Conferences;