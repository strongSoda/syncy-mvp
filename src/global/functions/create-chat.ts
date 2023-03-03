import { StreamChat } from 'stream-chat';
const chatClient = new StreamChat("f2hpu5up29pk");

const createChat = (userToken: string, user1: any, user2: any, channelId: string) => {
    chatClient.connectUser(
      {
        id: user1?.id,
        name: user1?.fullName,
        image:
          user1?.imageUrl,
      },
      userToken
    );

    // const channelId = removeSpecialChar(`channel${user1?.email}${user2?.email || user2?.publicEmail || user2?.mailFound}`);
    console.log('channelId', channelId);
    
    const channel = chatClient.channel("messaging", channelId, {
      // add as many custom fields as you'd like
      image: user2?.imageUrl,
      name: user2?.fullName,
      members: [user1?.id],
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
