import Delete from "./CRUD/Delete";
import Get from "./CRUD/Get";
import Post from "./CRUD/Post";
import Put from "./CRUD/Put";

const API_URL = "http://localhost:8080/api/articles";

interface Article {
    id: number;
    title: string;
    content: string;
    creator: string;
    img: string;
    editedat: Date;
    createdat: Date;
}

const Articles = {
    Create: async (Data: Article) => {
        return await Post(API_URL, Data);
    },
    Read: async () => {
        return await Get(API_URL);
    },
    Update: async (Data: Article) => {
        return await Put(API_URL, Data);
    },
    Delete: async (id: string) => {
        return await Delete(API_URL, id);
    },
};

export default Articles;