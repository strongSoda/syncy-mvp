import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Avatar, Pane, Paragraph, Tab, Tablist } from 'evergreen-ui';

import Button from 'components/Button/Button.lazy';
import Navbar from 'components/Navbar/Navbar.lazy';
import SideBar from 'components/SideBar/SideBar.lazy';
import CSSVARIABLES from 'global/constants/variables';

import { CardWrapper, ManageRequestsWrapper } from './ManageRequests.styles';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import INFLUENCERS from 'global/constants/infleuncers';

import algoliasearch from 'algoliasearch/lite';
import { ClearRefinements, CurrentRefinements, Highlight, Hits, HitsPerPage, InstantSearch, Pagination, RangeInput, RefinementList, SearchBox, SortBy } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('L7PFECEWC3', 'a953f96171e71bef23ebd1760c7dea10');

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
        <Avatar src={influencer?.imageUrl} alt="profile" size={40} name={influencer?.fullName} />
        <h1 className='name'>{influencer?.fullName}</h1>
        <p className='followers'>Followers: {influencer?.followersCount}</p>
        <p className='bio'>{influencer?.bio}</p>

        {/* actions like add to list, book call, reachout */}
        <div className='actions'>
          <a className='link' href={influencer.profileUrl} target='_blank' rel='noreferrer' >View Profile</a>
          <Button text="Add to List" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} />
          <Button text="Book Call" backgroundColor={CSSVARIABLES.COLORS.BLUE_0} />
          <Button text="Reachout" backgroundColor={CSSVARIABLES.COLORS.BLACK_0} />
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

  return (
  <CardWrapper data-testid="Card">
    <Avatar src={hit?.imageUrl} alt="profile" size={40} name={hit?.fullName} />
    <div className="card-body">
      <p className="card-title"><Highlight attribute="fullName" hit={hit} /></p>
      <p className="card-desc"><Highlight attribute="bio" hit={hit} /></p>
      <div className="card-footer">
        <p><Highlight attribute="category" hit={hit} /></p>
        <Button text="View" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} onClick={() => setShowInfluencerProfile(true)} />
      </div>
    </div>

    {showInfluencerProfile && <InfluencerProfile influencer={hit} setShowInfluencerProfile={setShowInfluencerProfile} />}
  </CardWrapper>
)};

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
