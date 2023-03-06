import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/variables';
import styled from 'styled-components';

const MessagesWrapper = styled.div`
  margin-left: ${CSSVARIABLES.LAYOUT.PRIMARY.MARGIN_LEFT};
  /* padding: ${CSSVARIABLES.LAYOUT.PRIMARY.PADDING}; */

  .content {
    padding-left: 22.35em;
    height: 100vh;
  }
  
  *! > .str-chat-channel-list {
    display: flex !important;
    flex-direction: column !important;
    background: yellow !important;
  }

  .str-chat-channel-list {
    width: 25%;
    position: fixed;
    /* top: 12vh; */
    /* background: #f7f7f7; */
  }
`;

export default MessagesWrapper;
