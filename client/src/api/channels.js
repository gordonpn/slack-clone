import axios from "axios";

export async function getChannels() {
  const channelsArray = [];
  await axios.get('/channels').then(response => {
    channelsArray.push(response.data);
  });
  return channelsArray;
}

export function addChannels(name) {
  let channelId = "";

  axios.post(
    '/channels',
    {"name": name},
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(res => {
    channelId = res.data['_id'];
  });

  return channelId;
}
