import { removeSpecialChar } from 'global/functions/remove-special-char';

import { StreamChat } from 'stream-chat';
const chatClient = new StreamChat("f2hpu5up29pk");

const createChat = (userToken: string, user1: any, user2: any, channelId: string) => {
    chatClient.connectUser(
      {
        id: user1?.uid,
        name: user1?.name || user1?.name,
        image:
          user1?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      },
      userToken
    );

    // const channelId = removeSpecialChar(`channel${user1?.email}${user2?.email || user2?.publicEmail || user2?.mailFound}`);
    console.log('channelId', channelId);
    
    const channel = chatClient.channel("messaging", channelId, {
      // add as many custom fields as you'd like
      image: user2?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      name: user2?.fullName || user2?.firstName || user2?.email,
      members: [user1?.uid],
    });

    return {channel, chatClient};
}

  // get all channels of user from stream chat
export const getChannels = async (userId: string | undefined) => {
    // /stream-chat-get-channels
    const filter = { type: 'messaging', members: { $in: [userId] } };
    const sort = [{ last_message_at: -1 }];

    const channels = await chatClient?.queryChannels(filter as any, sort as any, {
        watch: true, // this is the default
        state: true,
    });

    console.log('channels', channels);
    

    channels?.map((channel: any) => {
            console.log(channel?.data?.name, channel?.cid)
        })
}

export default createChat;
