import { motion } from 'framer-motion';
import styled from 'styled-components';

import CSSVARIABLES from 'global/constants/variables';

const ManageRequestsWrapper = styled.div`
  margin-left: ${CSSVARIABLES.LAYOUT.PRIMARY.MARGIN_LEFT};
  padding: ${CSSVARIABLES.LAYOUT.PRIMARY.PADDING};

  /* * {outline: 2px solid red;} */
  /* margin: 0 auto; */
  /* background-color: aqua; */

  h1 {
    font-weight: bold;
    font-size: 36px;
  }

  .toggleBtn {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;

    display: none;
  }

  .syncy-gpt {

    .syncy-avatar-container {
      cursor: pointer;
      position: absolute;
      top: 1vh;
      right: 18vw;
    }
    .syncy-avatar {
      height: 14vh;
    }
  }

    .blob {
      background: black;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
      margin: 10px;
      height: 20px;
      width: 20px;
      transform: scale(1);
      animation: pulse-black 2s infinite;
    }

    .blob.purple {
      background: rgba(142, 68, 173, 1);
      box-shadow: 0 0 0 0 rgba(142, 68, 173, 1);
      animation: pulse-purple 2s infinite;
    }

    @keyframes pulse-purple {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(142, 68, 173, 0.7);
      }
      
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(142, 68, 173, 0);
      }
      
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(142, 68, 173, 0);
      }
    }


  .ais-Hits-item {
    list-style: none !important;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
  }

  .searchtable-container {
    display: flex;
    gap: 2em;
    width: 100%;
      .filters {
        margin-top: 2em;
        width: 18vw !important;

        .clear-filters {
          width: 10vw;
        }
      }
      .results {
        margin-top: 2em;

        .container {
          margin-top: 2em;
        }
      }
      .footer {
        display: flex;
        gap: 2em;
        align-items: center;
      }
  }
  .ag-row-selected::before {
    background-color: ${CSSVARIABLES.COLORS.BLUE_2};
  }

  /* fixed sidebar full height */
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

    .profile-details, .profile-picture {
      /* background: yellow; */
      text-align: center;
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

  @media only screen and (max-width: 768px) {
    margin-left: 0;
    padding: 0;

    h1 {
      text-align: center;
    }

    .toggleBtn {
      display: block;
    }

    .searchtable-container {
      display: block;

      .filters {
        display: none;
        
        margin-top: 2em;
        width: 100% !important;

        background: yellow;
        /* margin-left: */
        /* padding: 0 auto; */

        .clear-filters {
          width: 100%;
        }
      }
      .results {
        margin-top: 2em;
        width: 100%;
          /* background: yellow; */


        .container {
          margin-top: 2em;

          width: 90%;
          margin: 0 auto;
          /* height: 70vh; */
          /* overflow: auto; */

          /* .profile-img {
            height: 8vh !important;
          } */

          .ais-Hits-item {
            /* width: 100vw !important; */
          }

          .actions {
            /* display: block; */
          }
        }

      .footer {
        /* width: 50%; */

        .ais-Pagination {
          width: 30vw !important;
          padding: 1em;
        }
        .ais-HitsPerPage-select {
          margin-top: 10vh;
        }
      }
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

const CardWrapper = styled.div`
  background-color: ${CSSVARIABLES.COLORS.WHITE_0};
  display: flex;
  gap: 1em;
  padding: 0.8em;
  width: 50vw;
  border-radius: 10px;
  margin-bottom: 1vh;

  * {
    /* outline: 2px solid red; */
  }
  .profile-img {
    /* height: 6vh; */
    /* border-radius: 12em; */
  }

  .card-body {
    position: relative;
    /* bottom: 1vh; */
    font-size: 16px;
    width: 100%;

    .card-header {
      display: flex;
      align-items: center;
      /* justify-content: space-evenly; */

      /* gap: 1.2em; */

      .card-title {
        width: 50%;
        font-size: 16px;
      }

    }

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
    .card-desc {
      font-size: 14px;
      color: gray;
      font-weight: 500;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      
      p {
        font-size: 12px;
        flex: 50%;
        width: 22vw;
      }
    }
  }
  .card-title {
    font-weight: bold;
    font-size: 16px;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 10px auto;

    .card-body {
      /* width: 80%; */
    }

    .card-header {
      display: block !important;

      .actions {
        position: relative;
      }
    }
  }

`;

export { ManageRequestsWrapper, CardWrapper };
