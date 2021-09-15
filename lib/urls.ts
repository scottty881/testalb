const API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = API_URL
  ? `https://${API_URL}`
  : `http://localhost:${process.env.PORT || 3000}`
export default baseUrl
