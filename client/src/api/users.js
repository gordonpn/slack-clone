import axios from "axios";

export async function getUserByName(userName) {
  try {
    const response = await axios.get(`/users/username/${userName}`);
    return response;
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

export async function updateUserChannel(userName, channelId) {
  try {
    const response = await axios.patch(`/users/channels/${userName}`, {channelId: channelId});
    return response;
  } catch (error) {
    throw error;
  }
}
