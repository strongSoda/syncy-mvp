import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { Avatar, Badge, Heading, Pane, Paragraph, Popover, Position, Pulsar, SideSheet, Spinner, Tab, Tablist, TextInputField, toaster, Tooltip } from 'evergreen-ui';

import Button from 'components/Button/Button.lazy';
import Navbar from 'components/Navbar/Navbar.lazy';
import SideBar from 'components/SideBar/SideBar.lazy';
import CSSVARIABLES from 'global/constants/variables';

import { createReachout, getCategories } from 'global/ai/model';
import { TypeAnimation } from "react-type-animation";

import EyeIcon from '../../assets/icons/eye.svg';
import EmailIcon from '../../assets/icons/email.svg';
import PhoneIcon from '../../assets/icons/phone.svg';
import SaveIcon from '../../assets/icons/save.svg';
import loadingGif from '../../assets/images/loading.gif';
import Syncy from '../../assets/images/syncy.png';

import { CardWrapper, ManageRequestsWrapper } from './ManageRequests.styles';
import { AgGridReact } from 'ag-grid-react';

// import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
// import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import INFLUENCERS from 'global/constants/infleuncers';

import algoliasearch from 'algoliasearch/lite';
import { ClearRefinements, CurrentRefinements, Highlight, Hits, HitsPerPage, InstantSearch, Pagination, RangeInput, RefinementList, SearchBox, SortBy } from 'react-instantsearch-hooks-web';
import emailjs from '@emailjs/browser';

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";

import { AuthContext } from 'global/context/AuthContext';
import API from 'global/constants/api';
import createChat, { chatClient } from 'global/functions/create-chat';
import { removeSpecialChar } from 'global/functions/remove-special-char';
import sendChatMessage from 'global/functions/send-chat-message';


import { ChannelPreviewUIComponentProps, useChatContext } from 'stream-chat-react';
import formatNumber from 'global/functions/formatFollowers';
import logUsage from 'global/functions/usage-logs';
import Hamburger from 'hamburger-react';
import isMobile from 'global/functions/is-mobile';

const searchClient = algoliasearch('L7PFECEWC3', 'a953f96171e71bef23ebd1760c7dea10');

// const openAiKey = "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";

// declare interface IManageRequestsProps {}

const ManageRequests: React.FC = () => {
  const [isOpen, setOpen] = useState(isMobile.any() ? false : true)

  useEffect(() => {
    // alert(isMobile.any())
  }, [])
  return(
  <ManageRequestsWrapper data-testid="ManageRequests">
    <div className='toggleBtn'>
      <Hamburger toggled={isOpen} toggle={(setOpen)} />
    </div>

    <Pane display="flex" padding={16} marginTop={24} background={CSSVARIABLES.COLORS.YELLOW_GREEN_1} borderRadius={3}>
      <img src={Syncy} alt="Syncy" width="50" height="50" />
      <Pane>
        <Heading size={800} flex={1} alignItems="center" display="flex">
          Syncy
        </Heading>
        <Heading size={400}>
          Where brands connect with quality micro-influencers
        </Heading>
      </Pane>
      <Pane>
      </Pane>
    </Pane>

    {isOpen && <SideBar lightColor={CSSVARIABLES.COLORS.PRIMARY_GREEEN_1} darkColor={CSSVARIABLES.COLORS.GREEN_0} />}
    {/* <Navbar /> */}
    <SyncyGPT />
    <br />

    <h1>Discover Influencers</h1>
    {/* <p>//TODO: SELECT A ROW & DISPLAY FULL INFLUENCER PROFILE</p> */}
    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
    {/* <BasicTabsExample /> */}
    <SearchTable />
    {/* <Influencers /> */}
  </ManageRequestsWrapper>
)};

const Influencers: React.FC = () => {
  const gridRef = useRef<any>();

  const [showInfluencerProfile, setShowInfluencerProfile] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState({});

  const [rowData, setRowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxster", price: 72000}
    ]);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {field: 'name', filter: true, sortable: true, headerName: 'Name'},
    {field: 'username', filter: true, sortable: true, headerName: 'Username'},
    {field: 'bio', filter: true, sortable: true, headerName: 'Bio'},
    {field: 'email', filter: true, sortable: true, headerName: 'Email'},
    {field: 'follower_count', filter: true, sortable: true, headerName: 'Followers', type: 'number', width: 160},
    // {field: 'profile_picture', headerName: 'Profile Picture'},
    // {field: 'profile_url', headerName: 'Profile URL'},
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows);
    
    setShowInfluencerProfile(true);
    setSelectedInfluencer(selectedRows[0]);
  }, []);
  
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState(['New', 'Pending', 'Completed']);
  return (
      <div className="ag-theme-material" style={{width: 'auto', height: 500}}>
        <AgGridReact rowData={INFLUENCERS} ref={gridRef} columnDefs={columnDefs}
         animateRows={true} defaultColDef={defaultColDef} pagination={true} paginationPageSize={10}
         rowSelection='single' onSelectionChanged={onSelectionChanged}
        />
        
        {/* {showInfluencerProfile && <InfluencerProfile influencer={selectedInfluencer} setShowInfluencerProfile={setShowInfluencerProfile} />} */}
      </div>
  );
}

const packs = [
  {
    "id": 0,
    "name": "Discovery Call",
    "price": 25,
    "description": "15 minute call to discuss your brand and how I can help you.",
    "platform": "Instagram",
  },
  {
    "id": 1,
    "name": "1 Reel",
    "price": 250,
    "description": "One reel filmed with professional videographer and equipment.",
    "platform": "Instagram",
  },
  {
    "id": 2,
    "name": "1 Story",
    "price": 100,
    "description": "One story video where I present the product/ brand.",
    "platform": "Instagram",
  },
  {
    "id": 3,
    "name": "1 Post",
    "price": 50,
    "description": "One photo with the product and written information about what you would like to promote.",
    "platform": "Instagram",
  },
]

interface IInfluencerProfileProps {
  influencer: any;
  setShowInfluencerProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBookCall: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReachout: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfluencerProfile: React.FC<IInfluencerProfileProps> = ({influencer, setShowInfluencerProfile, setShowBookCall, setShowReachout}: IInfluencerProfileProps) => {

  const user = useContext(AuthContext)

  useEffect(() => {
    console.log('influencer', influencer);
    logUsage('BRAND VIEW INFLUENCER PROFILE', { user: {email: user?.email}, influencer: influencer?.fullName });
  }, [influencer]);

  return (
    <div className='influencer-profile'>
      
      {/* <div className='profile-header'>
      <div className='actions'>          
        {influencer?.bookCallInfo && 
          <img className='icon' src={PhoneIcon} alt="call" onClick={() => {
            setShowBookCall(true);
            setShowInfluencerProfile(false);
          }} />
        }
        <img className='icon' src={EmailIcon} alt="email" onClick={() => {
          setShowReachout(true);
          setShowInfluencerProfile(false);
        }} />
      </div>
      </div> */}

      {/* <div className='profile-container'>
        <div className='profile'>
          <div className='profile-picture'>
            <Avatar src={influencer?.imageUrl} alt="profile" name={influencer?.fullName} size={80} />
          </div>
          <div className='profile-details'>
            <div className='actions'>          
            {influencer?.bookCallInfo && 
            <img className='icon' src={PhoneIcon} alt="call" onClick={() => {
              setShowBookCall(true);
              setShowInfluencerProfile(false);
            }} />
          }
          <img className='icon' src={EmailIcon} alt="email" onClick={() => {
            setShowReachout(true);
            setShowInfluencerProfile(false);
          }} />
        </div>
            <h1 className='name'>{influencer?.fullName ? influencer?.fullName : influencer?.first_name}</h1>
            {(influencer?.instagram_username || influencer?.instagramUsername) && <p className='username'>@{influencer?.instagram_username 
                  ? influencer?.instagram_username : influencer?.instagramUsername}</p>}
            <h1 className='followers'>{formatNumber(influencer?.followersCount)} Followers</h1>
            <h1 className='location'>{influencer?.location}</h1>
            <h1 className='bio'>{influencer?.bio}</h1>
            <a href="#" className='bio'>Read Reviews</a>
          </div>
        </div>


        <div className='packs'>
          <h1 className='title'>Packs</h1>
          <div className='packs-container'>
            {packs.map((pack, index) => (
              <div className='pack' key={index}>
                <h1 className='name'>{pack.name}</h1>
                <h1 className='price'>${pack.price}</h1>
                <Button text="Book" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} onClick={() => {
                  window.location.href = `https://buy.stripe.com/8wM8y22PG5zi3Wo3dk`;
                }} />
                <p className='description'>{pack.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* <h1 className='title'>Instagram Profile</h1> */}
      <iframe title={influencer?.fullName ? influencer?.fullName : influencer?.first_name} 
        src={`${influencer?.profileUrl ? (influencer?.profileUrl[influencer?.profileUrl.length-1]==="/" ? influencer?.profileUrl 
                : (influencer?.profileUrl + '/')) : (`https://www.instagram.com/${encodeURI(influencer?.instagram_username 
                ? influencer?.instagram_username.trim() : influencer?.instagramUsername.trim())}/`)}embed`} name="myiFrame" scrolling="yes" frameBorder="0" height="900" width="100%" allowFullScreen={true}></iframe>
      {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}
      {/* <div className='container'>  
        <Avatar src={influencer?.imageUrl} alt="profile" name={influencer?.fullName} size={80} />
        <h1 className='name'>{influencer?.fullName}</h1>
        <p className='followers'>Followers: {influencer?.followersCount}</p>
        <p className='bio'>{influencer?.bio}</p>
      </div>       */}
    </div>
  );
}

interface ICardProps {
  hit: any;
}

const Card: React.FC<ICardProps> = ({hit}: ICardProps) => {
  const user = useContext(AuthContext)
  
  useEffect(() => {
    console.log('hit', hit);
  }, [hit]);

  const [showInfluencerProfile, setShowInfluencerProfile] = useState(false);
  const [showBookCall, setShowBookCall] = useState(false);
  const [showReachout, setShowReachout] = useState(false);

    const fixProfileUrl = async () => {
    const res = await fetch(`http://127.0.0.1:8000/imageUpload?imageUrl=${hit?.imageUrl}&username=${hit?.fullName}}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: hit?.imageUrl,
      }),
    });

    const data = await res.json();

    console.log(data);
    
    const resp = await fetch(`http://127.0.0.1:8000/update-algolia?url=${data?.url}&objectID=${hit?.objectID}}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        influencer: hit
      }),
    });



  }

  useEffect(() => {
    // check if imageUrl contains 'imgur'
    if (!hit?.imageUrl?.includes('imgur')) {
      // fixProfileUrl();
    }
  },[])

  return (
  <>
  {hit?.fullName.toLowerCase().includes('test') && !user?.email?.includes('syncy.net')  ? null : (
    <CardWrapper data-testid="Card">
    <Avatar src={hit?.imageUrl} alt="profile" size={80} name={hit?.fullName} />
    <div className="card-body">
      <div className='card-header'>
        <p className="card-title">
          <Highlight attribute="fullName" hit={hit} />
        </p>
        <Badge color="neutral">
          {formatNumber(hit?.followersCount)} Followers
        </Badge>
        {/* <small>{formatNumber(hit?.followersCount)} Followers</small>         */}
        <div className='actions'>          
          {hit?.bookCallInfo && hit?.bookCallInfo.includes('calendly') && <img className='icon' src={PhoneIcon} alt="eye" onClick={() => setShowBookCall(true) } />}
          <img className='icon' src={EyeIcon} alt="eye" onClick={() => setShowInfluencerProfile(true) } />
          <img className='icon' src={EmailIcon} alt="eye" onClick={() => setShowReachout(true) } />
          {/* <img className='icon' src={SaveIcon} alt="eye" /> */}
        </div>
      </div>
      <small>#<Highlight attribute="category" hit={hit} /></small>
      <p className="card-desc"><Highlight attribute="bio" hit={hit} /></p>
      <div className="card-footer">
        {/* eye icon svg */}
        {/* <Button text="View" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} onClick={() => setShowInfluencerProfile(true)} /> */}
      </div>
    </div>

    <SideSheet
        isShown={showInfluencerProfile}
        onCloseComplete={() => setShowInfluencerProfile(false)}
        preventBodyScrolling
        width={1300}
      >
        <InfluencerProfile influencer={hit} setShowInfluencerProfile={setShowInfluencerProfile} setShowBookCall={setShowBookCall} setShowReachout={setShowReachout} />
      </SideSheet>
    {showBookCall && <BookCall influencer={hit} setShowBookCall={setShowBookCall} />}
    {showReachout && <Reachout influencer={hit} setShowReachout={setShowReachout} />}
  </CardWrapper>
  )}
  </>
)};

interface IBookCallProps {
  influencer: any;
  setShowBookCall: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookCall: React.FC<IBookCallProps> = ({influencer, setShowBookCall}: IBookCallProps) => {

  const user = useContext(AuthContext);
  const [brandUserProfile, setBrandUserProfile] = useState<any>(null);

  const getBrandUserProfile = async () => {
    // /brand_user_profile
    const response = await fetch(`${API}/brand_user_profile?email=${user?.email}`)
    const data = await response.json();
    console.log('brand_user_profile', data?.data);
    setBrandUserProfile(data?.data);
  }

  useEffect(() => {
    getBrandUserProfile();
    logUsage('BRAND BOOK CALL BUTTON CLICKED', {user: {email: user?.email}, influencer: influencer?.fullName});
  },[])

  return (
    <div className='influencer-profile'>
      {/* cross icon to close sidebar on click */}
      <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowBookCall(false) } />

      {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}
      <div className='container'>  
        <Avatar src={influencer?.imageUrl} alt="profile" name={influencer?.fullName} size={80} />
        <h1 className='name'>{influencer?.fullName}</h1>
        <p className='followers'>Followers: {formatNumber(influencer?.followersCount)}</p>
        {/* <p className='bio'>{influencer?.bio}</p> */}
        {/* <p className='bio'>{influencer?.imageUrl}</p> */}

        {/* calednly iframe */}
      </div>      
      {brandUserProfile ? 
        <iframe title={influencer?.fullName} 
        src={`${influencer?.bookCallInfo}?email=${user?.email}&name=${brandUserProfile?.first_name} ${brandUserProfile?.last_name}&guests=assistant@syncy.net`} 
        width="100%" height="1000px" frameBorder="0">
        </iframe> 
      :
      <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner />
      </Pane>
      }
    </div>
  );
}

interface IReachoutProps {
  influencer: any;
  setShowReachout: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reachout: React.FC<IReachoutProps> = ({influencer, setShowReachout}: IReachoutProps) => {

  const [message, setMessage] = React.useState<string | undefined>("");
  const [subject, setSubject] = React.useState<string | undefined>("");
  const [body, setBody] = React.useState<string | undefined>("");

  const [messageGenerated, setMessageGenerated] = React.useState<boolean>(false);
  const [messageGenerating, setMessageGenerating] = React.useState<boolean>(false);
  const [sendingMessage, setSendingMessage] = React.useState<boolean>(false);
  const [showEditMessage, setShowEditMessage] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);
  
    const user = useContext(AuthContext)

  const [userToken, setUserToken] = useState<string | null>(null);

  const [channel, setChannel] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);
  const [sort, setSort] = useState<any>(null);
  const [options, setOptions] = useState<any>(null);

  const [channelMapping, setChannelMapping] = useState<any>(null);
  
  const load = async () => {
    setLoading(true);
    const brandUserProfile = await getBrandUserProfile();
    setLoading(false);

    setMessageGenerating(true);
    const msg = await createReachout(influencer, brandUserProfile);
    console.log(msg);

    logUsage('BRAND GENERATED AI REACHOUT MESSAGE NOT YET SENT', {user: {email: user?.email}, influencer: influencer?.fullName, meesage: msg});

    setMessage(msg);
    setMessageGenerated(true);
    setMessageGenerating(false);

    // extract subject and body from msg string
    const lines = msg?.trim().split('\n') || [];
    const subject = lines?.shift();

    // collect all lines into an array except first line (subject) and join them with new line character to form body of email message. URLencode the body.
    const body = lines?.slice(1).join(`%0D%0A`);

    

    console.log(subject);
    console.log('%%%%%%%%%%%%%%%%');
    console.log(encodeURI(body));
    
    
    setSubject(subject);
    setBody(body);
  };

  const sendEmail = async () => {
    // get brand user profile
    const brandUserProfile = await getBrandUserProfile();

    // emailjs send email
    const templateParams = {
      to_name: influencer?.fullName,
      // todo: use email of influencer
      to_email: influencer?.email || influencer?.publicEmail || influencer?.mailFound,
      brand_name: brandUserProfile?.company_name,
      contact_name: brandUserProfile?.first_name + ' ' + brandUserProfile?.last_name,
    };

    emailjs.send('service_p835il9', 'template_adclu1d', templateParams, 'wo1FnANWwcN5Nav88')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
      //  setShowReachout(false);
       toaster.success('Email sent successfully');
    }, function(error) {
       console.log('FAILED...', error);
       toaster.danger('Something went wrong. Try again later.');
    });
  }

  const reachout = async () => {
    setSendingMessage(true);
    console.log('reachout');
    sendEmail();
    await createBrandInfluencerChannel();
    setSendingMessage(false);
    // load()
  }

  // check mapping exists
  const checkMapping = async () => {
    const response = await fetch(`${API}/brand-influencer-channel-map?brandEmail=${user?.email}&influencerEmail=${influencer?.email || influencer?.publicEmail || influencer?.mailFound}`);
    const data = await response.json();
    console.log('mapping', data);
    
    if (data?.status === 'success') {
      getUserToken(data?.data?.channelId);
      setChannelMapping(true);
    } else {
      // createBrandInfluencerChannel();
      setChannelMapping(false);
    }
  }

  // delete brand influencer channel mapping
  const deleteBrandInfluencerChannel = async () => {
    
    const response = await fetch(`${API}/brand-influencer-channel-map?brandEmail=${user?.email}&influencerEmail=${influencer?.email || influencer?.publicEmail || influencer?.mailFound}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('mapping', data);
    if (data?.status === 'success') {
      setChannelMapping(false);
      setShowEditMessage(false);
      setMessageGenerating(false);
      setShowReachout(false);
      // const destroy = await channel.delete();
    }
  }

  // get brand user profile
  const getBrandUserProfile = async () => {
    // /brand_user_profile
    const response = await fetch(`${API}/brand_user_profile?email=${user?.email}`)
    const data = await response.json();
    console.log('brand_user_profile', data?.data);
    return data?.data;
  }

  // create channel for brand and influencer
  const createChannel = async (channelId: string, channelName: string,  userId: string) => {
    //   const channel = chatClient.channel('messaging', channelId, {
    //   name: channelName,
    //   image: user1?.imageUrl,
    //   members: [user1.id],
    // });
    // Here, 'travel' will be the channel ID
    // await channel.create();
    console.log('creating channel...', channel);
    // call GET api /stream-chat-create-channel with channelId, channelName, userId, imageUrl
    const response = await fetch(`${API}/stream-chat-create-channel?channelId=${channelId}&channelName=${channelName}&userId=${userId}&imageUrl=${influencer?.imageUrl}`);
    const data = await response.json();
    console.log('channel created', data);
  }

  // create brandInfluencerChannel mapping
  const createBrandInfluencerChannel = async () => {
    const brandUserProfile = await getBrandUserProfile();
    const user1 = {email: user?.email, id: user?.uid, fullName: brandUserProfile?.company_name, imageUrl: brandUserProfile?.company_logo}
    const user2 = {fullName: influencer?.fullName, imageUrl: influencer?.imageUrl}
    
    const channelId = removeSpecialChar(`channel${user?.email}${influencer?.email || influencer?.publicEmail || influencer?.mailFound}`);
    const channelName = `${user2?.fullName} x ${user1?.fullName}`

    // try {
    //   await createChannel(channelId, channelName);
    // } catch(e) {
    //   console.log(e);
    // }

    const response = await fetch(`${API}/brand-influencer-channel-map`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        brandEmail: user?.email,
        influencerEmail: influencer?.email || influencer?.publicEmail || influencer?.mailFound,
        channelId: channelId,
      }),
    });
    const data = await response.json();
    console.log('mapping', data);

    sendFirstMessage(channelId, channelName, user1?.id as string);
  }
  
  const getUserToken = async (channelId: string) => {
    console.log('getUserToken', channelId);
    
    const brandUserProfile = await getBrandUserProfile();

    // /stream-chat-token
    const response = await fetch(`${API}/stream-chat-token?uid=${user?.uid}`)
    const data = await response.json();
    console.log(data, data?.data?.token);

    setUserToken(data?.data?.token);

    const user1 = {email: user?.email, id: user?.uid, fullName: brandUserProfile?.company_name, imageUrl: brandUserProfile?.company_logo}
    const user2 = {fullName: influencer?.fullName, imageUrl: influencer?.imageUrl}
    
    const {channel, chatClient} = createChat(data?.data?.token, user1, user2, channelId);

    // wait for 3 seconds
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    setChannel(channel);
    // setChatClient(chatClient);
    
    const filters = { members: { $in: [ user1?.id ] } }
    const sort = { last_message_at: -1 };
    const options = { limit: 10 }
    
    setFilters(filters);
    setSort(sort);
    setOptions(options);

    console.log('channel', channel?.id, channel?.cid, channel?.data?.id);

    channel?.id?.replaceAll('messaging:', '');
  }

  const sendFirstMessage = async (channelId: string, channelName: string, userId: string) => {
    await createChannel(channelId, channelName, userId);
    await sendChatMessage(channelId, user?.uid, message);
    await getUserToken(channelId);
    logUsage('BRAND FIRST MESSAGE SENT', {user: {email: user?.email}, influencer: influencer?.fullName, meesage: message, channelId: channelId, channelName: channelName});
    setChannelMapping(true);
  }

  useEffect(() => {
    // load();
    console.log(user, influencer);
    logUsage('BRAND REACHOUT BUTTON CLICKED', {user: {email: user?.email}, influencer: influencer?.fullName});
    if(user) {
      checkMapping();
    }
  }, [user]);


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
    <div className='influencer-profile' style={{marginBottom: '2em'}}>
      {/* cross icon to close sidebar on click */}
      <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowReachout(false) } />
      
      {channelMapping ?
       <>
        {channel && chatClient && filters && sort && options &&
        <Chat client={chatClient} theme="str-chat__theme-dark">
        {/* <ChannelList showChannelSearch filters={filters} sort={sort} options={options} Preview={CustomPreview} /> */}
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

        {/* check if "test" case insensitive is present in influencer?.fullName  */}
        {influencer?.fullName?.toLowerCase().includes('test') &&
          <Button text="Reset" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={deleteBrandInfluencerChannel} />
        }
      </>
      : 
      <>    
        {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}
        <div className='container'>  
          <Avatar src={influencer?.imageUrl} alt="profile" name={influencer?.fullName} size={80} />
          <h1 className='name'>{influencer?.fullName}</h1>
          <p className='followers'>Followers: {formatNumber(influencer?.followersCount)}</p>

          {messageGenerated ? 
          <div style={{width: '100%', whiteSpace: 'pre-wrap'}}>
            <div className="ai-result">
              <img className="ai-avatar" src={Syncy} alt='logo'/>
              {!message ? 
              <img src={loadingGif} alt="Loading" style={{height: '2vh'}} />
              : 
              <>
              {showEditMessage ?
              // textarea for message
              <textarea className='message-textarea' value={message} onChange={(e) => setMessage(e.target.value)} rows={30} cols={80} />
            :
              <TypeAnimation
                sequence={[
                  message as any,
                  1000,
                  () => {
                    // setDoneTyping(true);
                    console.log("Done typing!"); // Place optional callbacks anywhere in the array
                  },
                ]}
                wrapper="p"
                cursor={true}
                // repeat={Infinity}
                style={{ fontSize: "1em" }}
                speed={75}
              />
            }
            </>

            }
              </div>
            
            {!showEditMessage && <Button text="Edit" backgroundColor={CSSVARIABLES.COLORS.BLUE_0} onClick={() => setShowEditMessage(true) } />}
            <Button text={sendingMessage ? "Sending...": "Send Message"} backgroundColor={CSSVARIABLES.COLORS.GREEN_0} onClick={reachout} />

            {/* {subject && body && 
              <a className='send-email-btn' href={`mailto:${influencer?.publicEmail || influencer?.mailFound}?subject=${subject}&body=${body}}`}
                target="_blank" rel="noopener noreferrer">
                  <img style={{height: '4vh'}} src='https://cdn.iconscout.com/icon/free/png-256/gmail-2981844-2476484.png' alt='email' />
                  <span>Send Email</span>
              </a>
            } */}
        </div>
        :
        <>
          {messageGenerating ? 
          <div style={{width: '100%', whiteSpace: 'pre-wrap'}}>
            <div className="ai-result">
              <img className="ai-avatar" src={Syncy} alt='logo'/>
            <img src={loadingGif} alt="Loading" style={{height: '2vh'}} />
            </div>
          </div>
          : <Button text={loading ? "Loading..." : "Reachout"} backgroundColor={CSSVARIABLES.COLORS.PURPLE_2} onClick={load} />}
        </>
        }

        </div>      
      </>
      }

      {/* <iframe src={influencer?.bookCallInfo} width="100%" height="1000px" frameBorder="0"></iframe> */}
    </div>
  );
}

function BasicTabsExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState(['New', 'Pending', 'Completed']);
  return (
    <Pane height={120}>
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {tabs.map((tab, index) => (
          <Tab key={tab} id={tab} onSelect={() => setSelectedIndex(index)} isSelected={index === selectedIndex} aria-controls={`panel-${tab}`}>
            {tab}
          </Tab>
        ))}
      </Tablist>
      <Pane padding={16} flex="1">
        {tabs.map((tab, index) => (
          <Pane key={tab} id={`panel-${tab}`} role="tabpanel" aria-labelledby={tab} aria-hidden={index !== selectedIndex} display={index === selectedIndex ? 'block' : 'none'}>
            {[0, 1].map((item) => (
              <section key={item}>
                {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
                {/* <Card /> */}
              </section>
            ))}
          </Pane>
        ))}
      </Pane>
    </Pane>
  );
}

// function Hit({ hit }: { hit: any }) {
//   return <Card />
// }

// outline of search table component
const SearchTable: React.FC = () => {
  const [showInfluencerProfile, setShowInfluencerProfile] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState({});

  const user = useContext(AuthContext);

  useEffect(() => {
    logUsage('BRAND VISITED DISCOVER PAGE', {user: {email: user?.email}});
  }, [])

  return (
    <InstantSearch searchClient={searchClient} indexName="influencers" routing={true}>
      {/* <RefinementsSideba dynamicWidgets={true} /> */}
      <SearchBox placeholder="Search influencers" autoFocus />
      <div className='searchtable-container'>
        <div className='filters'>
          <div className='clear-filters'>
            <ClearRefinements
              translations={{
                resetButtonText: 'Clear Filters',
              }}
            />
          </div>
          <br/>
          <h3>Categories</h3>
          <RefinementList attribute="category" showMore={true} searchable={true} searchablePlaceholder="Search categories..." />
          <h3>Followers</h3>
          <RangeInput attribute="followersCount" />
        </div>
        <div className='results'>
          <CurrentRefinements />
          <div className='container'>
            <Hits hitComponent={Card as any} />
          </div>
          <div className='footer'>
            {isMobile.any() ? <>
              <Pagination showFirst={false} showLast={false} totalPages={4} />
            </> : <Pagination />}
            {!isMobile.any() && <HitsPerPage
              items={[
                { label: '10 per page', value: 10 },
                { label: '20 per page', value: 20, default: true },
              ]}
            />}
          </div>
        </div>
      </div>
    </InstantSearch>
  )
}

const SyncyGPT: React.FC = () => {
  const [query, setQuery] = React.useState<string | undefined>("");

    const [message, setMessage] = React.useState<string | undefined>("");
    const [allCategories, setAllCategories] = React.useState<string[]>([]);
    const [categories, setCategories] = React.useState<string[]>([]);

    const [showAI, setShowAI] = React.useState<boolean>(false);

    const [loading, setLoading] = React.useState<boolean>(false);

    const [doneTyping, setDoneTyping] = React.useState<boolean>(false);

    const user = useContext(AuthContext);

    const load = async () => {

      setMessage("");
      setCategories([]);
      setDoneTyping(false);

      if (!query) return;
      setShowAI(true);
      setLoading(true);
      const msg = await getCategories(query, allCategories);
      console.log(msg);

      logUsage('BRAND GENERATED AI CATEGORIES', {user: {email: user?.email}, query: query, categories: msg});
  
      setCategories(msg);
      setMessage(`The influencers best suited for your product are: \n\n\n * ${msg[0]}\n * ${msg[1]}\n * ${msg[2]}`);
      setLoading(false);
    };

    const find = async () => {
      setQuery("");
      const query_params = `?influencers%5BrefinementList%5D%5Bcategory%5D%5B0%5D=${categories[0].replace('Influencers','')}&influencers%5BrefinementList%5D%5Bcategory%5D%5B1%5D=${categories[1].replace('Influencers','')}&influencers%5BrefinementList%5D%5Bcategory%5D%5B2%5D=${categories[2].replace('Influencers','')}`
    
      const url = `${window.location.origin}${window.location.pathname}${query_params}`;
      window.location.href = url;
    }

  useEffect(() => {
    const index = searchClient.initIndex('influencers');
    index.search('', {
      facets: ['*'],
      
    }).then(({ facets }) => {
      console.log('here', facets);
      // iterate through hits and collect the values for category in an array
      // const categories = hits.map((hit: any) => hit.category);
      // collect all keys of an object into an array
      const allCategories = facets ? Object.keys(facets.category) : {} ;
      setAllCategories(allCategories as any);
      console.log(allCategories);
    });
  }, []);

  return (
    <div className='syncy-gpt'>
    <Popover
      content={
        <div>

          <div className='query-input-container'>
          <h1>SyncyGPT</h1>
            <TextInputField
              label="What are you making?"
              required
              description="Enter a product name or description"
              value={query}
              onChange={(e:any) => setQuery(e.target.value)}
              placeholder="e.g. a t-shirt, mba course, marketing SaaS, etc."
            />
          { allCategories.length > 0 && (
            <div style={{textAlign: 'center'}}>
              <Button text="Suggest Ideas" backgroundColor={CSSVARIABLES.COLORS.BLACK_0} onClick={load} disabled />
            </div>
            )
          }
          </div>
        {/* <Button onClick={load}  intent="success" disabled={!query}>Suggest Ideas</Button> */}
        {/* <button onClick={load}>Suggest Ideas</button> */}
        <div style={{width: '100%', whiteSpace: 'pre-wrap'}}>
          {showAI ?
          <>
            <div className="ai-result">
              <img className="ai-avatar" src={Syncy} alt='logo'/>
              {loading ? 
               <img src={loadingGif} alt="Loading" style={{height: '2vh'}} />
              : ''
              }

              {message && !loading ?
              <TypeAnimation
                sequence={[
                  message as any,
                  1000,
                  () => {
                    setDoneTyping(true);
                    console.log("Done typing!"); // Place optional callbacks anywhere in the array
                  },
                ]}
                wrapper="p"
                cursor={true}
                // repeat={Infinity}
                style={{ fontSize: "1em" }}
                speed={75}
              />
            : ''}

            </div>
          </>
           : ''}
          <div style={{display: 'block', textAlign: 'center', marginBottom: '2vh'}}>
          {doneTyping && <Button style={{margin: '0 auto'}} text="Find Influencers" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} onClick={find} />}
          </div>
        </div>
        </div>
      }
      position={Position.TOP_RIGHT}
    >
      <div className='syncy-avatar-container'>
        <div className="blob purple">
          <img className='syncy-avatar' src={Syncy} alt="SyncyGPT Logo" />
        </div>
        </div>
    </Popover>

    </div>
  )
}

export default ManageRequests;
