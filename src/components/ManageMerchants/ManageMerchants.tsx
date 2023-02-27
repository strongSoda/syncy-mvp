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
import { AuthContext } from 'global/context/AuthContext';
import { auth } from 'global/constants/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// declare interface IManageMerchantsProps {}

const ManageMerchants: React.FC = () => (
  <ManageMerchantsWrapper data-testid="ManageMerchants">
    <SideBar lightColor={CSSVARIABLES.COLORS.BLUE_1} darkColor={CSSVARIABLES.COLORS.BLUE_0} />
    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
    <MerchantsBar />
    <div className="content">
      <Navbar />
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      <MerchantDetails />
    </div>
  </ManageMerchantsWrapper>
);

const MerchantDetails: React.FC = () => {
  const [ShowAddStoreForm, setShowAddStoreForm] = useState<boolean>(false);
  const [ShowStores, setShowStores] = useState<boolean>(false);
  const [NumberOfStores, setNumberOfStores] = useState<number>(1);

  const emailRef = useRef<HTMLInputElement>(null);
  const resetPasswordEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const user = useContext(AuthContext);

  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);
      

  return (
    <MerchantDetailsWrapper>
      <div className="owner-name">
        {user ? (
          <div>
        <h1>Welcome {user?.email}</h1>
          <p>Account: {!user.emailVerified && 'Not'} Verified</p>
          {/* <Button text="Sign Out" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={logOut} /> */}
        </div>
        ): (
        <>
          <input type="text" placeholder="Name"  />
          <input type="text" placeholder="Email" ref={emailRef} />
          <input type="text" placeholder="Password" ref={passwordRef} />

          <Button text="Forgot Password?" backgroundColor={CSSVARIABLES.COLORS.BLACK_0} onClick={() => setShowPasswordReset(!showPasswordReset)} />

          {showPasswordReset && (
            <div>
              <input type="text" placeholder="Email" ref={resetPasswordEmailRef} />
              {/* <Button text="Reset Password" backgroundColor={CSSVARIABLES.COLORS.BLACK_0} onClick={sendPasswordReset} /> */}
            </div>
          )}
        </>
        )}
        
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
