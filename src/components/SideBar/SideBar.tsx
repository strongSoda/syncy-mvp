import React from 'react';

import reactangleImg from 'assets/images/rectangle.png';

import LightChat from '../../assets/icons/Chat.svg';
import Shop from '../../assets/icons/shop.svg';
import SideBarWrapper from './SideBar.styles';

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

const SideBar: React.FC<ISideBarProps> = ({ lightColor, darkColor }: ISideBarProps) => (
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
      <div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">You</a>
        <p className="title">Role Name</p>
      </div>
    </div>
  </SideBarWrapper>
);

export default SideBar;
