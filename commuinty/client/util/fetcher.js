import axios from 'axios'

// const baseURL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:8080/api'
//     : `https://${process.env.SITE_NAME}/api`

const baseURL = `https://lnfthee-community-server.onrender.com/api`
const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }
