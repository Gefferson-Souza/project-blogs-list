import axios from "axios";
const baseUrl = '/api/login'

async function login (config) {
    const response = await axios.post(baseUrl, config)
    return response.data
}

export default {login};