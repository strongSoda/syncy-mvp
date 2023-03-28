import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/variables';
import styled from 'styled-components';

const InfluencerCompleteProfileWrapper = styled.div`
    /* margin-left: ${CSSVARIABLES.LAYOUT.PRIMARY.MARGIN_LEFT}; */

    .toggleBtn {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;

        display: none;
    }

    .error {
        /* text-align: center; */
        /* margin: 0 auto; */
        color: ${CSSVARIABLES.COLORS.RED};
        font-size: 0.8em;
        margin: 0%;
        /* margin-left: 57%; */
        padding: 0%;
        width: 100%;
    }

    .container {
        width: 40vw;
        margin: 0 auto;

        .title {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        


        input[type='submit'] {
            background-color: ${CSSVARIABLES.COLORS.GREEN_0};
            color: ${CSSVARIABLES.COLORS.WHITE_1};
            border: none;
            border-radius: 0.2rem;
            width: 100%;
            padding: .8em 0em;
            margin-top: 3vh;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 1rem;
        }
    }

      .influencer-profile {
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    width: 70vw;
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
      justify-content: space-between;
      align-items: center;

      .actions {
        display: flex;
        gap: 2em;
      }

      margin-bottom: 1em;
    }

    .str-chat {
      height: 80%;
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


    @media (max-width: 768px) {
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

        .influencer-profile {
            width: 90%;

            iframe {
            width: 80%;
            }
            .profile-header {
            width: 80%;
            /* justify-content: space-evenly; */
            }
        }
    }
`;

export default InfluencerCompleteProfileWrapper;
