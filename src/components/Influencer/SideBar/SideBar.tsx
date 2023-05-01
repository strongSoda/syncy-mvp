import React, { useContext, useEffect } from 'react';

import reactangleImg from 'assets/images/rectangle.png';

import LightChat from '../../../assets/icons/Chat.svg';
import Shop from '../../../assets/icons/shop.svg';
import ProfileIcon from '../../../assets/icons/profile.svg';
import SideBarWrapper from './SideBar.styles';
import { signOut } from 'firebase/auth';
import { auth } from 'global/constants/firebase';
import { Button, LogOutIcon } from 'evergreen-ui';
import { useHistory } from 'react-router';
import ROUTES from 'global/constants/routes';
import CSSVARIABLES from 'global/constants/variables';
import { AuthContext } from 'global/context/AuthContext';
import { logout } from 'features/user/userSlice';
import { useAppDispatch } from 'hooks/storeHooks';

declare interface ISideBarProps {
  lightColor: string;
  darkColor: string;
}

const Links = [
  {
    icon: Shop,
    text: 'Dashboard',
    id: 1,
    path: ROUTES.INFLUENCER.DASHBOARD,
  },
  {
    icon: ProfileIcon,
    text: 'My Deliverables',
    id: 3,
    path: ROUTES.INFLUENCER.CONTENT_PACKS,
  },
  {
    icon: ProfileIcon,
    text: 'My Orders',
    id: 4,
    path: ROUTES.INFLUENCER.ORDERS,
  },
  // {
  //   icon: LightChat,
  //   text: 'Messages',
  //   id: 0,
  //   path: ROUTES.INFLUENCER.MESSAGES,
  // },
  {
    icon: ProfileIcon,
    text: 'Profile',
    id: 2,
    path: ROUTES.INFLUENCER.COMPLETE_PROFILE,
  },
];

const SideBar: React.FC<ISideBarProps> = ({ lightColor, darkColor }: ISideBarProps) => {
  const history = useHistory();
  const dispatch = useAppDispatch()

  const user = useContext(AuthContext);

  const logOut = async () => {
    await signOut(auth);
    dispatch(logout())
    history.push(ROUTES.INFLUENCER.LOGIN);
  };

  useEffect(() => {
    const url = window.location.pathname
    const activeLink = document.getElementById(url)
    if(activeLink) {
      activeLink.style.background = darkColor;
      activeLink.style.color = lightColor;
      activeLink.style.borderRadius = '10px';
    }
  }, [])

  return (
  <SideBarWrapper id="Sidebar" data-testid="SideBar" lightColor={lightColor} darkColor={darkColor}>
    <div className="top-section">
      <p className="title">SYNCY</p>
      {Links.map((Link) => (
        <a key={Link.id} href={Link.path} id={Link.path as any}>
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
