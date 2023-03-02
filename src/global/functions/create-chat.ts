import { removeSpecialChar } from 'global/functions/remove-special-char';

import { StreamChat } from 'stream-chat';
const chatClient = new StreamChat("f2hpu5up29pk");

const createChat = (userToken: string, user1: any, user2: any, chan: any) => {
    chatClient.connectUser(
      {
        id: user1?.uid,
        name: "Pewdiepie",
        image:
          user1?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      },
      userToken
    );

    const channelId = removeSpecialChar(`channel${user1?.email}${user2?.email || user2?.publicEmail || user2?.mailFound}`);
    console.log('channelId', channelId);
    
    const channel = chatClient.channel("messaging", chan, {
      // add as many custom fields as you'd like
      image: user2?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      name: user2?.fullName || user2?.email,
      members: [user1?.uid],
    });

    return {channel, chatClient};
}

export default createChat;
