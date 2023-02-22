import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Avatar, Pane, Paragraph, Tab, Tablist } from 'evergreen-ui';

import Button from 'components/Button/Button.lazy';
import Navbar from 'components/Navbar/Navbar.lazy';
import SideBar from 'components/SideBar/SideBar.lazy';
import CSSVARIABLES from 'global/constants/variables';

import { createReachout } from 'global/ai/model';
import { TypeAnimation } from "react-type-animation";

import EyeIcon from '../../assets/icons/eye.svg';
import EmailIcon from '../../assets/icons/email.svg';
import PhoneIcon from '../../assets/icons/phone.svg';
import SaveIcon from '../../assets/icons/save.svg';

import { CardWrapper, ManageRequestsWrapper } from './ManageRequests.styles';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import INFLUENCERS from 'global/constants/infleuncers';

import algoliasearch from 'algoliasearch/lite';
import { ClearRefinements, CurrentRefinements, Highlight, Hits, HitsPerPage, InstantSearch, Pagination, RangeInput, RefinementList, SearchBox, SortBy } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('L7PFECEWC3', 'a953f96171e71bef23ebd1760c7dea10');

const openAiKey = "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"

// declare interface IManageRequestsProps {}

const ManageRequests: React.FC = () => (
  <ManageRequestsWrapper data-testid="ManageRequests">
    <SideBar lightColor={CSSVARIABLES.COLORS.PRIMARY_GREEEN_1} darkColor={CSSVARIABLES.COLORS.GREEN_0} />
    {/* <Navbar /> */}
    <h1>Discover Influencers</h1>
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
        
        {showInfluencerProfile && <InfluencerProfile influencer={selectedInfluencer} setShowInfluencerProfile={setShowInfluencerProfile} />}
      </div>
  );
}


interface IInfluencerProfileProps {
  influencer: any;
  setShowInfluencerProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfluencerProfile: React.FC<IInfluencerProfileProps> = ({influencer, setShowInfluencerProfile}: IInfluencerProfileProps) => {

  return (
    <div className='influencer-profile'>
      {/* cross icon to close sidebar on click */}
      <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowInfluencerProfile(false) } />

      {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}
      <div className='container'>  
        <Avatar src={influencer?.imageUrl} alt="profile" name={influencer?.fullName} size={80} />
        <h1 className='name'>{influencer?.fullName}</h1>
        <p className='followers'>Followers: {influencer?.followersCount}</p>
        <p className='bio'>{influencer?.bio}</p>
        {/* <p className='bio'>{influencer?.imageUrl}</p> */}

        {/* actions like add to list, book call, reachout */}
        <div className='actions'>
          <a className='link' href={influencer.profileUrl} target='_blank' rel='noreferrer' >View Profile</a>
          <Button text="Add to List" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} />
          <Button text="Book Call" backgroundColor={CSSVARIABLES.COLORS.BLUE_0} />
          <Button text="Reachout" backgroundColor={CSSVARIABLES.COLORS.BLACK_0} />
          {/* <Button text="Fix Profile Pic" backgroundColor={CSSVARIABLES.COLORS.BLACK_0} onClick={fixProfileUrl} /> */}
        </div>
      </div>      
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


  return (
  <CardWrapper data-testid="Card">
    <Avatar src={hit?.imageUrl} alt="profile" size={80} name={hit?.fullName} />
    <div className="card-body">
      <div className='card-header'>
        <p className="card-title">
          <Highlight attribute="fullName" hit={hit} />
        </p>
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

    {showInfluencerProfile && <InfluencerProfile influencer={hit} setShowInfluencerProfile={setShowInfluencerProfile} />}
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

  useEffect(() => {
    const load = async () => {
      const msg = await createReachout(openAiKey, influencer);
      console.log(msg);
      setMessage(msg);
    };
    load();
  }, [openAiKey, influencer]);

  return (
    <div className='influencer-profile'>
      {/* cross icon to close sidebar on click */}
      <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowReachout(false) } />

      {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}
      <div className='container'>  
        <Avatar src={influencer?.imageUrl} alt="profile" name={influencer?.fullName} />
        <h1 className='name'>{influencer?.fullName}</h1>
        <p className='followers'>Followers: {influencer?.followersCount}</p>
        {/* <p className='bio'>{influencer?.bio}</p> */}
        {/* <p className='bio'>{influencer?.imageUrl}</p> */}
        {/* calednly iframe */}
      </div>      
      
      <div style={{width: '100%', whiteSpace: 'pre-wrap'}}>
      {message ?
      <TypeAnimation
        sequence={[
          message as any,
          1000,
          () => {
            console.log("Done typing!"); // Place optional callbacks anywhere in the array
          },
        ]}
        wrapper="p"
        cursor={true}
        // repeat={Infinity}
        style={{ fontSize: "1em" }}
        speed={75}
      /> : 'Loading...'}
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
                { label: '8 per page', value: 8, default: true },
                { label: '16 per page', value: 16 },
              ]}
            />
          </div>
        </div>
      </div>
    </InstantSearch>
  )
}



export default ManageRequests;
