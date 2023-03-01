import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Avatar, Badge, Pane, Paragraph, Popover, Position, Pulsar, Tab, Tablist, TextInputField, toaster, Tooltip } from 'evergreen-ui';

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

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import INFLUENCERS from 'global/constants/infleuncers';

import algoliasearch from 'algoliasearch/lite';
import { ClearRefinements, CurrentRefinements, Highlight, Hits, HitsPerPage, InstantSearch, Pagination, RangeInput, RefinementList, SearchBox, SortBy } from 'react-instantsearch-hooks-web';
import emailjs from '@emailjs/browser';

const searchClient = algoliasearch('L7PFECEWC3', 'a953f96171e71bef23ebd1760c7dea10');

// const openAiKey = "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";

// declare interface IManageRequestsProps {}

const ManageRequests: React.FC = () => (
  <ManageRequestsWrapper data-testid="ManageRequests">
    <SideBar lightColor={CSSVARIABLES.COLORS.PRIMARY_GREEEN_1} darkColor={CSSVARIABLES.COLORS.GREEN_0} />
    {/* <Navbar /> */}
    <SyncyGPT />
    <br />
    <br />
    <br />
    <br />

    <h1>Syncy | Discover Influencers</h1>
    {/* <p>//TODO: SELECT A ROW & DISPLAY FULL INFLUENCER PROFILE</p> */}
    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
    {/* <BasicTabsExample /> */}
    <SearchTable />
    {/* <Influencers /> */}
  </ManageRequestsWrapper>
);

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


interface IInfluencerProfileProps {
  influencer: any;
  setShowInfluencerProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBookCall: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReachout: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfluencerProfile: React.FC<IInfluencerProfileProps> = ({influencer, setShowInfluencerProfile, setShowBookCall, setShowReachout}: IInfluencerProfileProps) => {

  return (
    <div className='influencer-profile'>
      
      <div className='profile-header'>
      <div className='actions'>          
        {influencer?.bookCallInfo && 
          <img className='icon' src={PhoneIcon} alt="call" onClick={() => {
            setShowBookCall(true);
            setShowInfluencerProfile(false);
          }} />
        }
        {/* <img className='icon' src={EyeIcon} alt="eye" onClick={() => setShowInfluencerProfile(true) } /> */}
        <img className='icon' src={EmailIcon} alt="email" onClick={() => {
          setShowReachout(true);
          setShowInfluencerProfile(false);
        }} />
        <img className='icon' src={SaveIcon} alt="save" />
      </div>

      {/* cross icon to close sidebar on click */}
      <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowInfluencerProfile(false) } />
      </div>

      <iframe title={influencer?.fullName} src={`${influencer?.profileUrl}embed`} name="myiFrame" scrolling="yes" frameBorder="0" height="900" width="100%" allowFullScreen={true}></iframe>
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
  useEffect(() => {
    console.log('hit', hit);
  }, [hit]);

  const [showInfluencerProfile, setShowInfluencerProfile] = useState(false);
  const [showBookCall, setShowBookCall] = useState(false);
  const [showReachout, setShowReachout] = useState(false);

    const fixProfileUrl = async () => {
    const res = await fetch(`http://127.0.0.1:5000/?imageUrl=${hit?.imageUrl}&username=${hit?.fullName}}`, {
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
    
    const resp = await fetch(`http://127.0.0.1:5000/update-algolia?url=${data?.url}&objectID=${hit?.objectID}}`, {
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

  const formatNumber = (num: number) => {
    return Intl.NumberFormat('en-US', {
              notation: "compact",
              maximumFractionDigits: 1
            }).format(num);
  }




  return (
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
          {hit?.bookCallInfo && <img className='icon' src={PhoneIcon} alt="eye" onClick={() => setShowBookCall(true) } />}
          <img className='icon' src={EyeIcon} alt="eye" onClick={() => setShowInfluencerProfile(true) } />
          <img className='icon' src={EmailIcon} alt="eye" onClick={() => setShowReachout(true) } />
          <img className='icon' src={SaveIcon} alt="eye" />
        </div>
      </div>
      <small>#<Highlight attribute="category" hit={hit} /></small>
      <p className="card-desc"><Highlight attribute="bio" hit={hit} /></p>
      <div className="card-footer">
        {/* eye icon svg */}
        {/* <Button text="View" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} onClick={() => setShowInfluencerProfile(true)} /> */}
      </div>
    </div>

    {showInfluencerProfile && <InfluencerProfile influencer={hit} setShowInfluencerProfile={setShowInfluencerProfile} setShowBookCall={setShowBookCall} setShowReachout={setShowReachout} />}
    {showBookCall && <BookCall influencer={hit} setShowBookCall={setShowBookCall} />}
    {showReachout && <Reachout influencer={hit} setShowReachout={setShowReachout} />}
  </CardWrapper>
)};

interface IBookCallProps {
  influencer: any;
  setShowBookCall: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookCall: React.FC<IBookCallProps> = ({influencer, setShowBookCall}: IBookCallProps) => {

  return (
    <div className='influencer-profile'>
      {/* cross icon to close sidebar on click */}
      <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowBookCall(false) } />

      {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}
      <div className='container'>  
        <Avatar src={influencer?.imageUrl} alt="profile" name={influencer?.fullName} />
        <h1 className='name'>{influencer?.fullName}</h1>
        <p className='followers'>Followers: {influencer?.followersCount}</p>
        {/* <p className='bio'>{influencer?.bio}</p> */}
        {/* <p className='bio'>{influencer?.imageUrl}</p> */}

        {/* calednly iframe */}
      </div>      
      <iframe src={influencer?.bookCallInfo} width="100%" height="1000px" frameBorder="0"></iframe>
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


  const load = async () => {
    const msg = await createReachout(influencer);
    console.log(msg);
    setMessage(msg);

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

  const sendEmail = () => {
    // emailjs send email

    const templateParams = {
      to_name: influencer?.fullName,
      to_email: 'imran@syncy.net',
    };

    emailjs.send('service_p835il9', 'template_adclu1d', templateParams, 'wo1FnANWwcN5Nav88')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       toaster.success('Email sent successfully');
    }, function(error) {
       console.log('FAILED...', error);
       toaster.danger('Something went wrong. Try again later.');
    });
  }

  const reachout = async () => {
    console.log('reachout');
    sendEmail();
    // load()
  }

  useEffect(() => {
    // load();
  }, []);

  return (
    <div className='influencer-profile'>
      {/* cross icon to close sidebar on click */}
      <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowReachout(false) } />

      {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}
      <div className='container'>  
        <Avatar src={influencer?.imageUrl} alt="profile" name={influencer?.fullName} />
        <h1 className='name'>{influencer?.fullName}</h1>
        <p className='followers'>Followers: {influencer?.followersCount}</p>
        {/* Button to load */}
        <Button text="Reachout" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={reachout} />
      </div>      
      
      <div style={{width: '100%', whiteSpace: 'pre-wrap'}}>
            <div className="ai-result">
              <img className="ai-avatar" src={Syncy} alt='logo'/>
              {!message ? 
               <img src={loadingGif} alt="Loading" style={{height: '2vh'}} />
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
            </div>
            {subject && body && 
              <a className='send-email-btn' href={`mailto:${influencer?.publicEmail || influencer?.mailFound}?subject=${subject}&body=${body}}`}
                target="_blank" rel="noopener noreferrer">
                  <img style={{height: '4vh'}} src='https://cdn.iconscout.com/icon/free/png-256/gmail-2981844-2476484.png' alt='email' />
                  <span>Send Email</span>
              </a>
             }
      </div>
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
            <Pagination />
            <HitsPerPage
              items={[
                { label: '10 per page', value: 10 },
                { label: '20 per page', value: 20, default: true },
              ]}
            />
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

    const load = async () => {

      setMessage("");
      setCategories([]);
      setDoneTyping(false);

      if (!query) return;
      setShowAI(true);
      setLoading(true);
      const msg = await getCategories(query, allCategories);
      console.log(msg);
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
