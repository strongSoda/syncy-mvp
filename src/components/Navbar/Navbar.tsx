import React from 'react';

import { Button, Pane, Popover, Position, Text, Avatar } from 'evergreen-ui';

import notificationIcon from 'assets/icons/Notifications.svg';
import settingsIcon from 'assets/icons/Setting.svg';

import NavbarWrapper from './Navbar.styles';

// declare interface INavbarProps {}

const Navbar: React.FC = () => (
  <NavbarWrapper data-testid="Navbar">
    <span className="right-section">
      <Popover
        content={
          <Pane width={272} height={350} display="flex" paddingTop="2em" paddingBottom="2em" padding="1em" flexDirection="column" overflowY="auto">
            <h4>Notifications</h4>
            <Pane display="flex" alignItems="center">
              <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" name="Alan Turing" size={30} />
              <Text margin="12px" fontSize="12px">
                Admin Name assigned you a request form Owner Name.
              </Text>
            </Pane>
            <Pane display="flex" alignItems="center">
              <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" name="Alan Turing" size={30} />
              <Text margin="12px" fontSize="12px">
                Admin Name assigned you a request form Owner Name.
              </Text>
            </Pane>
            <Pane display="flex" alignItems="center">
              <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" name="Alan Turing" size={30} />
              <Text margin="12px" fontSize="12px">
                Admin Name assigned you a request form Owner Name.
              </Text>
            </Pane>
          </Pane>
        }
        position={Position.BOTTOM_RIGHT}
      >
        <Button>
          <img src={notificationIcon} alt="notifications" />
        </Button>
      </Popover>

      <img src={settingsIcon} alt="settings" />
    </span>
  </NavbarWrapper>
);

export default Navbar;
