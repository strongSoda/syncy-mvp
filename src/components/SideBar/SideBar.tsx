import React, { useContext } from 'react';

import reactangleImg from 'assets/images/rectangle.png';

import LightChat from '../../assets/icons/Chat.svg';
import Shop from '../../assets/icons/shop.svg';
import SideBarWrapper from './SideBar.styles';
import { signOut } from 'firebase/auth';
import { auth } from 'global/constants/firebase';
import { Button, LogOutIcon } from 'evergreen-ui';
import { useHistory } from 'react-router';
import ROUTES from 'global/constants/routes';
import CSSVARIABLES from 'global/constants/variables';
import { AuthContext } from 'global/context/AuthContext';

declare interface ISideBarProps {
  lightColor: string;
  darkColor: string;
}

const Links = [
  {
    icon: LightChat,
    text: 'Discover',
    id: 0,
    path: '/discover',
  },
  // {
  //   icon: Shop,
  //   text: 'Campaigns',
  //   id: 1,
  //   path: '/campaigns',
  // },
];

const SideBar: React.FC<ISideBarProps> = ({ lightColor, darkColor }: ISideBarProps) => {
  const history = useHistory();

  const user = useContext(AuthContext);

  const logOut = async () => {
    await signOut(auth);
    history.push(ROUTES.BRAND.LOGIN);
  };
  return (
  <SideBarWrapper data-testid="SideBar" lightColor={lightColor} darkColor={darkColor}>
    <div className="top-section">
      <p className="title">SYNCY</p>
      {Links.map((Link) => (
        <a key={Link.id} href={Link.path}>
          <img className="icon" src={Link.icon} alt={Link.text} />
          {Link.text}
        </a>
      ))}
    </div>
    <div className="bottom-section">
      {/* <img
        className="profile-img"
        src="https://ph-avatars.imgix.net/2429667/b98d457a-ff12-4ffd-a85a-c7da09f645ec?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=170&h=170&fit=crop&dpr=2"
        alt="profile"
      /> */}

      {user ? 
        <div>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">You</a>
          <p className="title">{user?.email}</p>
          {/* <Button text="View" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} onClick={logOut} /> */}
          <Button iconBefore={LogOutIcon} className="logout" onClick={logOut}>
            Logout
          </Button>
        </div>
      :
      
      <div>
          {/* <p className="title">Logged Out</p> */}
          <a className="title" href={ROUTES.BRAND.LOGIN}>Login</a>
      </div>
      }
    </div>
  </SideBarWrapper>
)};

export default SideBar;
