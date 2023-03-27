import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/variables';
import styled from 'styled-components';

const MessagesWrapper = styled.div`
  margin-left: ${CSSVARIABLES.LAYOUT.PRIMARY.MARGIN_LEFT};
  /* padding: ${CSSVARIABLES.LAYOUT.PRIMARY.PADDING}; */

  height: 100vh;
  overflow: hidden;

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

  .toggleBtn {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;

    display: none;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 6vh;

      .toggleBtn {
          display: block;
      }
      .container {
          width: 100vw;

          .title {
              /* font-size: 0.6em; */
              text-align: center;
          }
      }

      .str-chat {
        width: 100%;
      }
      *! > .str-chat-channel-list {
        display: block;
      }

    .str-chat-channel-list {
      width: 30vw;
    }
    .content {
      padding-left: 0;
      /* height: 100vh; */
      width: 80vw;
      margin-left: 30%;
    }
  }
`;

export default MessagesWrapper;
