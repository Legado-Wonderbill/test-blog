import axios, { AxiosRequestConfig } from "axios";

export type TBlogEntry = {
    id: string;
    title: string;
    description: string;
}

const endpoint = 'https://z8lyp97n12.execute-api.eu-west-2.amazonaws.com/staging/create-blog-entry';
const apiKey = "ehq5opqqIN6vmakuoP1vq9hmArIVz5iU8AMKcJ1r"


export const createBlogEntry = async (blogEntry: TBlogEntry) => {
    try {
    const payload = {
        blogEntry,
    };

    const axiosInstance = axios.create();
    axiosInstance.interceptors.response.use((response) => {
      const config = response.config as AxiosRequestConfig & {
        requestPayload?: string;
      };
      config.requestPayload = response.config.data;
      return response;
    });

    const response = await axiosInstance.post(endpoint, payload, {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
    console.log("response -------------------------------------------------- ", response);
    } catch (error) {
        console.error(error);
        throw (error as Error).message;
    }
}
