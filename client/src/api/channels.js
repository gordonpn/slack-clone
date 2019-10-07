import axios from "axios";

export async function getChannels() {
  const rawResponse = [];
  await axios.get('/channels').then(response => {
    rawResponse.push(response.data);
  });

  let channels = [];
  rawResponse[0].forEach(channel => {
    let aChannel = {
      name: channel['name'],
      id: channel['_id']
    };
    channels.push(aChannel);
  });

  console.log(channels);
  return channels;
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
