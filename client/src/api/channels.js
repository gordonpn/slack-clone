import axios from "axios";

export async function getChannels() {
  const channelsArray = [];
  await axios.get('/channels').then(response => {
    channelsArray.push(response.data);
  });
  return channelsArray;
}

export async function addChannels(name, id) {
  let channelId = "";

  await axios.post(
    '/channels',
    {
      "name": name,
      "ownerId": id
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(res => {
    channelId = res.data['_id'];
  }).catch(err => {
    throw err;
  });

  return channelId;
}
