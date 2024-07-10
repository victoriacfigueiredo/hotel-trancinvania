import axios from "axios";
import { AxiosInstance } from "axios";

class APIService{
    public api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:5001"
        });
    }
}

export default new APIService();