import React, { useState } from 'react';

import logo from 'assets/images/logo.svg';

import { StyledImage, StyledWrapper } from './App.styles';
// import Auth from 'components/Auth/Auth';
import { useMoralis } from "react-moralis";
import TransferEth from 'components/TransferEth/TransferEth';

const App: React.FC = () => {
  // const [user, setUser] = useState({})

  const { authenticate, logout, isAuthenticating, isAuthenticated, user } = useMoralis();

  return (
  <StyledWrapper>
    {!isAuthenticated ? (
      <div>
        <button onClick={() => authenticate()} disabled={isAuthenticating}>Connect Wallet</button>
        {/* <button>SEND 0.00001 ETH to Account 1</button> */}
      </div>
    ) : (
      <div>
        <h1>Welcome {user?.get("username")}</h1>
        <TransferEth />
        <button onClick={() => logout()} disabled={isAuthenticating}>
          Logout
        </button>
    </div>
    )}
  </StyledWrapper>
)
};

export default App;
