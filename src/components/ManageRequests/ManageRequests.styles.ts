import { motion } from 'framer-motion';
import styled from 'styled-components';

import CSSVARIABLES from 'global/constants/variables';

const ManageRequestsWrapper = styled.div`
  margin-left: ${CSSVARIABLES.LAYOUT.PRIMARY.MARGIN_LEFT};
  padding: ${CSSVARIABLES.LAYOUT.PRIMARY.PADDING};
  /* background-color: aqua; */

  h1 {
    font-weight: bold;
    font-size: 36px;
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
          /* height: 70vh; */
          /* overflow: auto; */
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
    width: 30vw;
    background-color: ${CSSVARIABLES.COLORS.WHITE_0};
    border-radius: 10px;

    z-index: 1000;

    /* shadow on the left */
    box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.2);

    padding: 1em;
  
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

    

`;

const CardWrapper = styled.div`
  background-color: ${CSSVARIABLES.COLORS.WHITE_0};
  display: flex;
  gap: 1em;
  padding: 1em;
  width: 50vw;
  border-radius: 10px;
  margin-bottom: 4vh;

  .profile-img {
    height: 6vh;
    border-radius: 12em;
  }

  .card-body {
    position: relative;
    bottom: 1vh;
    font-size: 16px;

    .card-footer {
      display: flex;
      justify-content: space-between;

      p {
        font-size: 12px;
        flex: 50%;
        width: 32vw;
      }
    }
  }
  .card-title {
    font-weight: bold;
    font-size: 16px;
  }
`;

export { ManageRequestsWrapper, CardWrapper };
