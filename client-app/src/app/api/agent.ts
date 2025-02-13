import axios, { AxiosResponse } from "axios";
import { Item } from "../models/item";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Items = {
  list: () => requests.get<Item[]>("/items"),
  details: (id:string) => requests.get<Item>(`/items/${id}`),
  create: (item: Item) => requests.post<void>('/items',item),
  update: (item: Item) => requests.put<void>(`items/${item.id}`,item),
  delete: (id: string) => requests.del<void>(`/items/${id}`)  
};

const agent = {
  Items,
};

export default agent;
