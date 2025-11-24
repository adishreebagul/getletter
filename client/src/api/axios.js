import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  const publicRoutes = ['/users/login', '/users/signup']
  const isPublic = publicRoutes.some((route) => config.url.startsWith(route))


  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
