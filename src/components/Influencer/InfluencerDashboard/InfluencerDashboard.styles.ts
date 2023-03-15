import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/variables';
import styled from 'styled-components';

const InfluencerDashboardWrapper = styled.div`
  margin-left: ${CSSVARIABLES.LAYOUT.PRIMARY.MARGIN_LEFT};
  padding: ${CSSVARIABLES.LAYOUT.PRIMARY.PADDING};

  .invite {
    
    width: 40%;
    /* margin: 0 auto; */
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    /* justify-content: center; */
    
    .actions {
      position: absolute;
      right: 0;

      display: flex;
      gap: 1em;

      .icon {
        height: 1.5em;
        cursor: pointer;
      }
    }
  } 

    /* fixed sidebar full height */
  .brand-profile {
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    width: 40vw;
    background-color: ${CSSVARIABLES.COLORS.WHITE_0};
    border-radius: 10px;

    overflow: auto;

    * {
      /* outline: 2px solid red; */
    }

    /* overflow: auto; */

    z-index: 100;

    /* shadow on the left */
    box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.2);

    padding: 1em;

    .profile-header {
      display: flex;
      flex-direction: row;
      /* justify-content: space-between; */
      /* align-items: center; */
      .actions {
        display: flex;
        gap: 2em;
      }

      margin-bottom: 1em;
    }

    .container {
      /* background: red; */
      display: flex;
      flex-direction: row;
      gap: 1em;
      align-items: center;
    }

    .str-chat {
      height: 60%;
    }

    .send-email-btn {
      padding: 0.5em 1em;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;

      border: 1px solid ${CSSVARIABLES.COLORS.GRAY_0};

      text-decoration: none;

      color: ${CSSVARIABLES.COLORS.BLACK_0};

      display: flex;
      align-items: center;
      gap: 0.5em;

      width: fit-content;
    }

    iframe {
      background-image: url("https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif");   
      background-repeat: no-repeat;
      background-size: 10%;
      margin: 0 auto;
      background-position: center;
    }
  
    .profile-img {
      height: 16vh;
      border-radius: 12em;
    }

    .name {
      font-weight: bold;
      font-size: 24px;
    }

    .bio {
      font-size: 16px;
    }

    .followers {
      font-size: 16px;
      color: ${CSSVARIABLES.COLORS.GRAY_0};
    }

    .cross-icon {
      /* position: absolute; */
      left: 1em;
      top: 1em;
      cursor: pointer;
      height: 2em;
    }

    .icon {
      height: 1.5em;
      cursor: pointer;
    }

    .container {
      padding: 2em;

      .actions {
        margin: 1em auto;
        width: 100%;

        .link {
          text-decoration: none;
          /* color: ${CSSVARIABLES.COLORS.WHITE_0}; */
          /* background: ${CSSVARIABLES.COLORS.BLUE_0}; */
          padding: 0.5em 1em;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          width: 80%;

          position: relative;
          left: 35%;
          margin-bottom: 1em !important;
        }

        button {
          width: 100%;
          margin: 1em 0.5em;
        }

      }
    }
  }

  @media only screen and (max-width: 768px) {
    margin-left: 0;
    padding: 0;
    /* overflow-x: hidden; */
    /* background: yellow !important; */

    /* width: 80%; */

    * {
      /* outline: 2px solid red; */
    }

    h1 {
      text-align: center;
    }

    .invite {
      width: 100%;
    }

    .brand-profile {
      width: 80%;
      padding: 2em;
    }
  }
`;

export default InfluencerDashboardWrapper;
