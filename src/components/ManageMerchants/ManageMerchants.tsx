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
import SideBar from 'components/SideBar/SideBar.lazy';
import CSSVARIABLES from 'global/constants/variables';

import { AddCardBtnWrapper, AddMenuPromptWrapper, AddStoreModalWrapper, ManageMerchantsWrapper, MerchantDetailsWrapper, StoreCardWrapper } from './ManageMerchants.styles';
import API from 'global/constants/api';
import { AuthContext } from 'global/context/AuthContext';
import createChat, { getChannels } from 'global/functions/create-chat';
import { Channel, ChannelHeader, Chat, getChannel, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import "stream-chat-react/dist/css/v2/index.css";

// declare interface IManageMerchantsProps {}

const ManageMerchants: React.FC = () => (
  <ManageMerchantsWrapper data-testid="ManageMerchants">
    {/* <SideBar lightColor={CSSVARIABLES.COLORS.BLUE_1} darkColor={CSSVARIABLES.COLORS.BLUE_0} /> */}
    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
    {/* <MerchantsBar /> */}
    <div className="content">
      <Navbar />
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      <MerchantDetails />
    </div>
  </ManageMerchantsWrapper>
);

const brand = {
    "uid": "YxvfViOBSdOWZnAsDfr77qwjl1e2",
    "email": "imran@syncy.net",
    "fullName": "Pewdiepie",
    "emailVerified": true,
    "isAnonymous": false,
    "providerData": [
        {
            "providerId": "password",
            "uid": "imran@syncy.net",
            "displayName": null,
            "email": "imran@syncy.net",
            "phoneNumber": null,
            "photoURL": null
        }
    ],
    "stsTokenManager": {
        "refreshToken": "APJWN8d21R7A8kIQ3c1RYfWBEcjbn2VOWi1NYamD_jG0TKqVb2QweUt3K1md0taptVvgeUjhdM-0vy900_kYgCxWEZjZljoBxo4NYL1GW_s1oZc7IvVWg2182K-Z5_vL2Grn-zsPgeJCkUmsN22Q9MpM6M6rDf57dbPjhct2S7zh2tlchXfpPGnDA3YDWtVAT71rDRqEKzwU",
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3luY3ktNzUxNTIiLCJhdWQiOiJzeW5jeS03NTE1MiIsImF1dGhfdGltZSI6MTY3NzczNzI1MywidXNlcl9pZCI6Ill4dmZWaU9CU2RPV1puQXNEZnI3N3F3amwxZTIiLCJzdWIiOiJZeHZmVmlPQlNkT1dabkFzRGZyNzdxd2psMWUyIiwiaWF0IjoxNjc3NzQzNzMxLCJleHAiOjE2Nzc3NDczMzEsImVtYWlsIjoiaW1yYW5Ac3luY3kubmV0IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiaW1yYW5Ac3luY3kubmV0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.DwtPCJLBq5c2W8dKOcvmD2gLY367q17LPiKn2-sRCjVxKbbeH0_tsOxJPf2cBWBTfwXzW20ihQbXXn610qM9UWcHvMkc0JZHSmFK1rsMbRwUKoo-wYiI629OeJcDn41ZtAFB0yLGn8tBBF8XEXKnP9A8bQhnzrhksOEGhfIl0GW0V8_ZlTifQzJjHvjMO4HRV0riXuSnk9azOvNJtJ9C6SqxrpDcBhwTEAHAAA-xPuVPHHoBKnntDfNDKlI4NZvco3aPaDsSvECXmQHXINcAmbNpNlYjFvpnKfduQlzz6zH86lv9qHSMeKvFbMX37R8VLrJM_Z8elit7RPmkVJJXLQ",
        "expirationTime": 1677747331926
    },
    "createdAt": "1677602064637",
    "lastLoginAt": "1677737253388",
    "apiKey": "AIzaSyAmINvpQDTBrE90Uw4DJjdsYxTX_GbP-Sk",
    "appName": "[DEFAULT]"
}

const MerchantDetails: React.FC = () => {
  const [ShowAddStoreForm, setShowAddStoreForm] = useState<boolean>(false);
  const [ShowStores, setShowStores] = useState<boolean>(false);
  const [NumberOfStores, setNumberOfStores] = useState<number>(1);

  const user = useContext(AuthContext)

  const [channel, setChannel] = useState<any>(null);
  const [chatClient, setChatClient] = useState<any>(null);


  const updateChannelMembers = async () => {
    // /stream-chat-update-channel-members
    const response = await fetch(`${API}/stream-chat-update-channel-members?email=${user?.email}&userId=${user?.uid}&channelId=channelimransyncynetinfluencerimransyncynet`)
    const data = await response.json();
    console.log(data, data?.data?.token);
  }

  // get brandInfluencerChannel map from db
  const getBrandInfluencerChannelMap = async () => {
    // /stream-chat-get-brand-influencer-channel-map
    const response = await fetch(`${API}/brand-influencer-channel-map?influencerEmail=${user?.email}&brandEmail=imran@syncy.net`)
    const data = await response.json();
    console.log('channelMapping', data?.data?.channelId);

    getUserToken(data?.data?.channelId);
  }

  const getUserToken = async (channelId: string) => {
    await updateChannelMembers();
    // /stream-chat-token
    const response = await fetch(`${API}/stream-chat-token?uid=${user?.uid}`)
    const data = await response.json();
    console.log(data, data?.data?.token);

    // setUserToken(data?.data?.token);
    
    const {channel, chatClient} = createChat(data?.data?.token, user, brand, channelId);
    setChannel(channel);
    setChatClient(chatClient);
  }

  useEffect(() => {
    // load();
    console.log(user);

    if(user) {
      getBrandInfluencerChannelMap()
    }
  }, [user]);

  // useEffect(() => {
  //   console.log(channel, chatClient);
  //     getChannels(user?.uid);
  // }, [channel, chatClient, user]);

  // channelimransyncynetinfluencerimransyncynet

  return (
    <MerchantDetailsWrapper>
        {channel && chatClient &&
        <Chat client={chatClient} theme="str-chat__theme-dark">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
        </Chat>
        }
      <div className="owner-name">
        {/* <img
          className="profile-img"
          src="https://ph-avatars.imgix.net/2429667/b98d457a-ff12-4ffd-a85a-c7da09f645ec?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=170&h=170&fit=crop&dpr=2"
          alt="profile"
        /> */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">No campaigns created</a>
      </div>


      {ShowStores ? (
        <>
          <div className="stores">
            {[...Array(NumberOfStores)].map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <StoreCard key={i} />
            ))}
          </div>
          <AddCardBtn onClick={() => setNumberOfStores(NumberOfStores + 1)} />
        </>
      ) : (
        <div className="no-store">
          <img className="profile-img" src={shopImg} alt="shop" />
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <h1>No campaigns created</h1>
            <p>Create a Campaign by clicking on "Create Campaign".</p>
            <Button text="Create Campaign" backgroundColor={CSSVARIABLES.COLORS.BLUE_0} onClick={() => setShowAddStoreForm(true)} />
          </div>
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      <AddStoreModal isShown={ShowAddStoreForm} setIsShown={setShowAddStoreForm} setShowStores={setShowStores} />
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
