import * as axios from "axios";
import type {Greet} from "../model/Greet.tsx";
import type {GreetRequestDTO} from "../model/GreetRequestDTO.tsx";

const api = axios.create({
    baseURL: "https://api.meaneefy.com/greet-service/api/greet",
    headers: {
        "Content-Type": "application/json"
    }
});

// GET ALL
export const getAllGreets = async () : Promise<Greet[]> => {
    const response = await api.get<Greet[]>("");
    return response.data;
};

// GET GREET BY ID
export const getGreetById = async (id: string): Promise<Greet> => {
    const response = await api.get<Greet>(`/${id}`);
    return response.data;
};

// DELETE GREET
export const deleteGreet = async (id: string): Promise<Greet> => {
    const response = await api.delete<Greet>(`/${id}`);
    return response.data;
};

// CREATE GREET
export const createGreet = async (greet: GreetRequestDTO): Promise<Greet> => {
    console.log(greet);
    const response = await api.post<Greet>("", greet);
    return response.data;
};

// UPDATE GREET
export const updateGreet = async (greet: Greet): Promise<Greet> => {
    const response = await api.put<Greet>("", greet);
    return response.data;
};