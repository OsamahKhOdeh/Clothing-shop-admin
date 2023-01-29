import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
let tok;
if(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user))
{
 tok = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken;
}
if (!tok) tok = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzI2YzM0Njk4ODYyNDNlNTVlY2RkNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MzY4ODk1OCwiZXhwIjoxNjczOTQ4MTU4fQ.TAkovSUYpdo-QH_v1Jx-Ft6JV0cuSS6YTshmPbkj95E";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${tok}` },
});
