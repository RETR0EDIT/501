import axios from "axios";

const Post = async (API_URL: string, data?: object) => {
  try {

    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in POST request:", error, data);
    throw error;
  }
};

export default Post;