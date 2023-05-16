import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

function setToken (newToken){
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data;
}

const create = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create}