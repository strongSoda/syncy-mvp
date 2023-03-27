import SideBar from 'components/SideBar/SideBar.lazy';
import { Button, Heading, Pane, Paragraph, Spinner } from 'evergreen-ui';
import API from 'global/constants/api';
import CSSVARIABLES from 'global/constants/variables';
import { AuthContext } from 'global/context/AuthContext';
import { chatClient } from 'global/functions/create-chat';
import logUsage from 'global/functions/usage-logs';
import Hamburger from 'hamburger-react';
import React, { useContext, useEffect, useState } from 'react';
import { Channel, ChannelHeader, ChannelList, ChannelPreviewUIComponentProps, Chat, MessageInput, MessageList, Thread, useChatContext, Window } from 'stream-chat-react';

import "stream-chat-react/dist/css/v2/index.css";

import MessagesWrapper from './Messages.styles';

// declare interface IMessagesProps {}

const Messages: React.FC = () => {
  const user = useContext(AuthContext)

  const [isOpen, setOpen] = useState(true)

  const [channel, setChannel] = useState<any>(null);
  // const [chatClient, setChatClient] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);
  const [sort, setSort] = useState<any>(null);
  const [options, setOptions] = useState<any>(null);
  const [chatExists, setChatExists] = useState<boolean>(false);

  useEffect(() => {
    logUsage('BRAND VISITED MESSAGES PAGE', {user: {email: user?.email}});
  }, [])
  
  // get influencer profile
  const getBrandProfile = async () => {
    // /influencer-profile-personal
    const response = await fetch(`${API}/influencer-profile-personal?email=${user?.email}`)
    const data = await response.json();
    console.log('brandProfile', data?.data);

    return data?.data;
  }
  

  const updateChannelMembers = async (channelId: string) => {
    console.log('updateChannelMembers', channelId);
    // /stream-chat-update-channel-members
    const response = await fetch(`${API}/stream-chat-update-channel-members?email=${user?.email}&userId=${user?.uid}&channelId=${channelId}`)
    const data = await response.json();
    console.log(data, data?.data?.token);
  }

  // get brandInfluencerChannel map from db
  const getBrandInfluencerChannelMap = async () => {
    // /stream-chat-get-brand-influencer-channel-map
    const response = await fetch(`${API}/brand-influencer-channel-map-by-brand?brandEmail=${user?.email}`)
    const data = await response.json();
    console.log('channelMapping', data?.data?.mappings);
    
    if(data?.status === 'success') {
      setChatExists(true);
      const mappings = data?.data?.mappings;
      
      // map through mappings and update channel members
      // mappings?.map(async (mapping: any) => {
      //   console.log('mapping...', mapping);
      //   await updateChannelMembers(mapping?.channel_id)
      // })
      getUserToken(data?.data?.channelId)
    }

    else {
      setChatExists(false);
    }
    // getUserToken(data?.data?.channelId);
  }

  const getUserToken = async (channelId: string) => {
    const brandProfile = await getBrandProfile();

    // await updateChannelMembers(channelId);
    // /stream-chat-token
    const response = await fetch(`${API}/stream-chat-token?uid=${user?.uid}`)
    const data = await response.json();
    console.log(data, data?.data?.token);

    // setUserToken(data?.data?.token);
    
    const user1 = {email: user?.email, id: user?.uid, fullName: brandProfile?.first_name + ' ' + brandProfile?.last_name, imageUrl: brandProfile?.company_logo}
    // const user2 = {fullName: influencer?.fullName, imageUrl: influencer?.imageUrl}

    // setChannel(channel);
    // setChatClient(chatClient);
    chatClient.connectUser(
      {
        id: user1?.id as string,
        name: user1?.fullName,
        image:
          user1?.imageUrl,
      },
      data?.data?.token
    );

    const filters = { members: { $in: [ user?.uid ] } }
    const sort = { last_message_at: -1 };
    const options = { limit: 10 }

    setFilters(filters);
    setSort(sort);
    setOptions(options);
  }

  useEffect(() => {
    // load();
    console.log(user);

    if(user) {
      getBrandInfluencerChannelMap()
      // getUserToken()
    }
  }, [user]);

  // useEffect(() => {
  //   console.log(channel, chatClient);
  //     getChannels(user?.uid);
  // }, [channel, chatClient, user]);

  // channelimransyncynetinfluencerimransyncynet

  const CustomPreview = (props: ChannelPreviewUIComponentProps) => {
    const { channel, setActiveChannel } = props;

    const { channel: activeChannel } = useChatContext();

    const selected = channel?.id === activeChannel?.id;

    const renderMessageText = () => {
      const lastMessageText = channel.state.messages[channel.state.messages.length - 1].text;

      const text = lastMessageText || 'message text';

      return text.length < 60 ? lastMessageText : `${text.slice(0, 70)}...`;
    };

    if (!channel.state.messages.length) return null;

    return (
      <>
      <button aria-label={`Select Channel: ${channel.data?.name || 'Channel'}`} aria-selected={selected} 
        className="str-chat__channel-preview-messenger str-chat__channel-preview" 
        data-testid="channel-preview-button" role="option"
        onClick={() => setChannel(channel)}
      >
        
        <div className="str-chat__channel-preview-messenger--left">
          <div className="str-chat__avatar str-chat__avatar--circle str-chat__message-sender-avatar" 
            data-testid="avatar" title={`${channel.data?.name || 'Channel'}`} 
            style={{flexBasis: "40px", fontSize: "20px", height: "40px", lineHeight: "40px", width: "40px"}}>
              <img alt="J" className="str-chat__avatar-image str-chat__avatar-image--loaded" data-testid="avatar-img" 
                src={channel?.data?.image} style={{flexBasis: "40px", height: "40px", objectFit: "cover", width: "40px",}} />
          </div>
        </div>
          <div className="str-chat__channel-preview-messenger--right str-chat__channel-preview-end">
            <div className="str-chat__channel-preview-end-first-row">
              <div className="str-chat__channel-preview-messenger--name">
                <span>{channel.data?.name || 'Channel'}</span>
              </div>
            </div>
            <div className="str-chat__channel-preview-messenger--last-message">{renderMessageText()}</div>
          </div>

        </button>
      </>
    );
  };

  return (
    <MessagesWrapper data-testid="Messages">
      <div className='toggleBtn'>
        <Hamburger toggled={isOpen} toggle={(setOpen)} />
      </div>

      {isOpen && <SideBar lightColor={CSSVARIABLES.COLORS.BLUE_1} darkColor={CSSVARIABLES.COLORS.BLUE_0} />}
      {chatExists ? 
      <>
      {chatClient ?
        <Chat client={chatClient} theme="str-chat__theme-dark">
        {filters && sort && options &&
         <ChannelList showChannelSearch filters={filters} sort={sort} options={options} Preview={CustomPreview} />}
        {channel ?
          <div className="content">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
          </div>
        :
        <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
          <Paragraph>No Chat selected</Paragraph>
        </Pane> 
      }
      </Chat>
      : 
      <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Paragraph>No Chats yet</Paragraph>
      </Pane>
      }
      </>
      : 
      <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner />
      </Pane>
      }
    </MessagesWrapper>
)
};

export default Messages;
