import axios from "axios";

const URL = "http://localhost:8081/api/members";
const URLAuth = "http://localhost:8081/auth";

async function getMembers(setClientes, token) {
  var req = { url: "http://localhost:8081/api/members" };
  const a = await axios.get(URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  setClientes(a.data);
  console.log(a.data);
}
async function authUser(setToken) {
  const a = await axios.post(URLAuth, {
    username: "sarah",
    password: "connor",
  });
  setToken(a.data.token);
}

const createMember = (data, token) =>
  new Promise((res, rej) => {
    axios
      .post(URL, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        res();
      })
      .catch((err) => {
        rej(err);
      });
  });

export default {
  getMembers,
  createMember,
  authUser,
};
