import axios from "axios";

export async function getChannels() {
  let rawResponse = [];
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

  return channels;
}

export async function getChannelsForUser(ids) {
  let rawResponse = [];
  // eslint-disable-next-line
  for (const channelID of ids) {
    await axios.get(`/channel/${channelID}`).then(value => {
      rawResponse.push(value.data);
    }).catch(err => {
      console.log(err)
      // todo do something with this exception?
    })
  }

  let channels = [];
  rawResponse.forEach(channel => {
    let aChannel = {
      name: channel['name'],
      id: channel['_id']
    };
    channels.push(aChannel);
  });

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
