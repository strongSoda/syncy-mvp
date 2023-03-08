/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useRef, useState } from 'react';

import { Dialog, Pane, Table } from 'evergreen-ui';

import storeImg from 'assets/images/McD.png';
import reactangleImg from 'assets/images/rectangle.png';
import shopImg from 'assets/images/shop.png';
import Button from 'components/Button/Button.lazy';
import MerchantsBar from 'components/MerchantsBar/MerchantsBar.lazy';
import Navbar from 'components/Navbar/Navbar.lazy';
import CSSVARIABLES from 'global/constants/variables';

import { AddCardBtnWrapper, AddMenuPromptWrapper, AddStoreModalWrapper, ManageMerchantsWrapper, MerchantDetailsWrapper, StoreCardWrapper } from './ManageMerchants.styles';
import API from 'global/constants/api';
import { AuthContext } from 'global/context/AuthContext';
import createChat, { chatClient, getChannels } from 'global/functions/create-chat';
import { Channel, ChannelHeader, ChannelList, ChannelPreviewUIComponentProps, Chat, getChannel, MessageInput, MessageList, Thread, useChatContext, Window } from 'stream-chat-react';
import "stream-chat-react/dist/css/v2/index.css";
import SideBar from 'components/Influencer/SideBar/SideBar.lazy';

// declare interface IManageMerchantsProps {}

const ManageMerchants: React.FC = () => (
  <ManageMerchantsWrapper data-testid="ManageMerchants">
    <SideBar lightColor={CSSVARIABLES.COLORS.BLUE_1} darkColor={CSSVARIABLES.COLORS.BLUE_0} />
    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
    {/* <MerchantsBar /> */}
    {/* <div className="content"> */}
      {/* <Navbar /> */}
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      <MerchantDetails />
    {/* </div> */}
  </ManageMerchantsWrapper>
);

const MerchantDetails: React.FC = () => {
  const [ShowAddStoreForm, setShowAddStoreForm] = useState<boolean>(false);
  const [ShowStores, setShowStores] = useState<boolean>(false);
  const [NumberOfStores, setNumberOfStores] = useState<number>(1);

  const user = useContext(AuthContext)

  const [channel, setChannel] = useState<any>(null);
  // const [chatClient, setChatClient] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);
  const [sort, setSort] = useState<any>(null);
  const [options, setOptions] = useState<any>(null);

  
  // get influencer profile
  const getInfluencerProfile = async () => {
    // /influencer-profile-personal
    const response = await fetch(`${API}/influencer-profile-personal?email=${user?.email}`)
    const data = await response.json();
    console.log('influencerProfile', data?.data);

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
    const response = await fetch(`${API}/brand-influencer-channel-map-by-influencer?influencerEmail=${user?.email}`)
    const data = await response.json();
    console.log('channelMapping', data?.data?.mappings);
    
    if(data?.status === 'success') {
      const mappings = data?.data?.mappings;
      
      // map through mappings and update channel members
      mappings?.map(async (mapping: any) => {
        console.log('mapping...', mapping);
        await updateChannelMembers(mapping?.channel_id)
      })
      
      getUserToken(data?.data?.channelId)
    }
    // getUserToken(data?.data?.channelId);
  }

  const getUserToken = async (channelId: string) => {
    const influencerProfile = await getInfluencerProfile();

    // await updateChannelMembers(channelId);
    // /stream-chat-token
    const response = await fetch(`${API}/stream-chat-token?uid=${user?.uid}`)
    const data = await response.json();
    console.log(data, data?.data?.token);

    // setUserToken(data?.data?.token);
    
    const user1 = {email: user?.email, id: user?.uid, fullName: influencerProfile?.first_name + ' ' + influencerProfile?.last_name, imageUrl: influencerProfile?.imageUrl}
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
    <MerchantDetailsWrapper>
      {chatClient &&
        <Chat client={chatClient} theme="str-chat__theme-dark">
        {filters && sort && options &&
         <ChannelList showChannelSearch filters={filters} sort={sort} options={options} Preview={CustomPreview} />}
        {channel &&
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
        }
      </Chat>}
    </MerchantDetailsWrapper>
  );
};

interface AddStoreModalProps {
  isShown: boolean;
  setIsShown: (value: React.SetStateAction<boolean>) => void;
  setShowStores: (value: React.SetStateAction<boolean>) => void;
}
const AddStoreModal: React.FC<AddStoreModalProps> = ({ isShown, setIsShown, setShowStores }: AddStoreModalProps) => {
  const [ShowLocateModal, setShowLocateModal] = useState<boolean>(false);

  return (
    <Pane>
      <Dialog width="fit-content" isShown={isShown} title="Create New Campaign" onCloseComplete={() => setIsShown(false)} hasFooter={false}>
        <AddStoreModalWrapper>
          <div className="col">
            <div className="input-container">
              <div className="input-label">CAMPAIGN NAME</div>
              <div className="input-row">
                {/* <span>+1</span> */}
                <span>
                  <input className="input-field" type="text" placeholder="BLACK FRIDAY" />
                </span>
              </div>
            </div>
            {/* <div className="input-container">
              <div className="input-label">EMAIL ADDRESS</div>
              <div className="input-row">
                <span>
                  <input className="input-field" type="email" placeholder="Type Email here" />
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="input-label">TYPE</div>
              <div className="input-row">
                <span>
                  <input className="input-field" type="text" placeholder="Select Category" />
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="input-label">CREATE USERNAME</div>
              <div className="input-row">
                <span>
                  <input className="input-field" type="text" placeholder="Create Username" />
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="input-label">CREATE PASSWORD</div>
              <div className="input-row">
                <span>
                  <input className="input-field" type="text" placeholder="Create Password" />
                </span>
              </div>
            </div> */}
          </div>
          {/* <div className="col">
            <div className="input-container">
              <div className="input-label">WRITE DESCRIPTION</div>
              <div className="input-row">
                <span>
                  <textarea className="input-field" placeholder="Type Description Here" rows={10} />
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="input-label">ADDRESS INFO</div>
              <div className="input-row">
                <span onClick={() => setShowLocateModal(true)}>Locate</span>
                <span>
                  <input type="text" className="input-field" placeholder="B street" />
                </span>
              </div>
            </div>
          </div> */}
        </AddStoreModalWrapper>
        <Button
          text="Save"
          backgroundColor={CSSVARIABLES.COLORS.BLUE_0}
          onClick={() => {
            setShowStores(true);
            setIsShown(false);
          }}
        />
      </Dialog>
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      <LocateModal show={ShowLocateModal} setShow={setShowLocateModal} />
    </Pane>
  );
};

interface LocateModalProps {
  show: boolean;
  setShow: (value: React.SetStateAction<boolean>) => void;
}

const LocateModal: React.FC<LocateModalProps> = ({ show, setShow }: LocateModalProps) => (
  <Pane>
    <Dialog width="fit-content" isShown={show} title="Create New Campaign" onCloseComplete={() => setShow(false)} hasFooter={false}>
      <AddStoreModalWrapper>
        <div className="col">
          <div className="input-container">
            <div className="input-label">SEARCH LOCATION</div>
            <div className="input-row">
              <span>
                <input className="input-field" type="text" placeholder="Search Location" />
              </span>
            </div>
          </div>
        </div>
      </AddStoreModalWrapper>
      <Button text="Set Location" backgroundColor={CSSVARIABLES.COLORS.BLUE_0} onClick={() => setShow(false)} />
    </Dialog>
  </Pane>
);

const StoreCard: React.FC = () => {
  const [SowAddMenuPrompt, setSowAddMenuPrompt] = useState<boolean>(false);

  return (
    <StoreCardWrapper>
      <div className="store-card-conatiner">
        <div className="left-section">
          <img className="profile-img" src={storeImg} alt="profile" />
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">Store Name</a>
            <p className="date">Address Line 1, Town, City, Zip code</p>
          </div>
        </div>
        <div className="left-section">
          <Button text="Add Menu" backgroundColor="#f39873" onClick={() => setSowAddMenuPrompt(!SowAddMenuPrompt)} />
        </div>
      </div>
      {SowAddMenuPrompt && <AddMenuPrompt />}
    </StoreCardWrapper>
  );
};

const AddMenuPrompt: React.FC = () => {
  const [MenuName, setMenuName] = useState<string>('');
  return (
    <AddMenuPromptWrapper>
      <div className="left-section">
        <img className="profile-img" src={reactangleImg} alt="profile" />
        <input className="menu-name-input" type="text" placeholder="Type Menu Name" value={MenuName} onChange={(e) => setMenuName(e.target.value)} />
      </div>
      <div className="left-section">
        <Button text="Create Menu" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} />
      </div>
    </AddMenuPromptWrapper>
  );
};

declare interface AddCardBtnProps {
  // eslint-disable-next-line react/require-default-props
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const AddCardBtn: React.FC<AddCardBtnProps> = ({ onClick }: AddCardBtnProps) => (
  <AddCardBtnWrapper onClick={onClick}>
    <span>Add Store</span>
  </AddCardBtnWrapper>
);

export default ManageMerchants;
