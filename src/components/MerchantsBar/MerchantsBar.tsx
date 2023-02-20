import React from 'react';

import { useHistory } from 'react-router';

import ROUTES from 'global/constants/routes';

import { MerchantCardWrapper, MerchantsBarWrapper } from './MerchantsBar.styles';
// declare interface IMerchantsBarProps {}

const MerchantsBar: React.FC = () => (
  <MerchantsBarWrapper data-testid="MerchantsBar">
    <h1>Campaigns</h1>
    <h3 className="title">//TODO: Create list and profile to list</h3>
    <div className="merchants">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <MerchantCard key={item} />
      ))}
    </div>
  </MerchantsBarWrapper>
);

const MerchantCard: React.FC = () => {
  const history = useHistory();
  return (
    <MerchantCardWrapper>
      {/* <img
        className="profile-img"
        src="https://ph-avatars.imgix.net/2429667/b98d457a-ff12-4ffd-a85a-c7da09f645ec?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=170&h=170&fit=crop&dpr=2"
        alt="profile"
      /> */}
      <div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <p className="owner-name">Campaign name</p>
        <p className="date">Created on Day, Time</p>
      </div>
    </MerchantCardWrapper>
  );
};

export default MerchantsBar;
