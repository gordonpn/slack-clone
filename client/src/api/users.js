import axios from "axios";

export async function getUserByName(userName) {
  try {
    return await axios.get(`/users/username/${userName}`);
  } catch (error) {
    throw error;
  }
}

export async function addUser(userName) {
  let response = "";

  await axios.post('/users', {
      username: userName
    }
  ).then(res => {
    response = res;
  });

  return response;
}
