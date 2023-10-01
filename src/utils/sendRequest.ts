
import axios, { AxiosRequestConfig, Method } from 'axios';

interface RequestOptions {
    payload: object,
    thunkApi: any,
    method: Method;
}

export const sendRequest = async (url: string, options?: Partial<RequestOptions>) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    
    const token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const method = options?.method || "GET";
    let config: AxiosRequestConfig = { method: method, url: url };
    if (options?.payload) {
        if (method.toUpperCase() === "GET") {
            config["params"] = options.payload;
        } else {
            config["data"] = options.payload;
        }
    }
    const request = await axios(config).then(res => res.data);
    // Make sure all requesting request are done before set status fulfilled.
    return request;
};