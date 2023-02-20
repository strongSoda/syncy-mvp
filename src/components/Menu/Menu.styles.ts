import { motion } from 'framer-motion';
import styled from 'styled-components';

import CSSVARIABLES from 'global/constants/variables';

const MenuWrapper = styled.div`
  margin-left: ${CSSVARIABLES.LAYOUT.PRIMARY.MARGIN_LEFT};
  h1 {
    font-weight: bold;
    font-size: 36px;
  }

  .content {
    padding: ${CSSVARIABLES.LAYOUT.PRIMARY.PADDING};
    padding-left: 22.35em;
    width: fit-content;
  }
`;

const StoreDetailsWrapper = styled.div`
  background-color: ${CSSVARIABLES.COLORS.WHITE_0};
  width: 700px;
  height: fit-content;
  margin: 2vh auto;
  padding: 2em;
  border-radius: 12px;

  .owner-name {
    display: flex;
    gap: 1em;
    align-items: center;

    .profile-img {
      height: 4vh;
      border-radius: 12em;
    }

    a {
      color: ${CSSVARIABLES.SIDEBAR.LINK.COLOR};
      font-size: ${CSSVARIABLES.TYPOGRAPHY.H2.REGULAR.SIZE};
      text-transform: ${CSSVARIABLES.SIDEBAR.LINK.TRANFORM};
      text-decoration: none;
      display: block;
      font-weight: ${CSSVARIABLES.SIDEBAR.LINK.WEIGHT};
      padding: 0%;
      height: fit-content;
    }
  }

  .stores {
    max-height: 50vh;
    overflow: auto;
  }

  .no-store {
    display: flex;
    align-items: center;
  }
`;

const AddItemModalWrapper = styled.div`
  display: flex;
  gap: 1.5em;
  .col {
    width: 50%;
    .input-container {
      padding: 1em;

      .input-label {
        /* color: ${CSSVARIABLES.TYPOGRAPHY.INPUT_LABEL.REGULAR.COLOR}; */
        font-size: ${CSSVARIABLES.TYPOGRAPHY.INPUT_LABEL.REGULAR.SIZE};
        font-weight: ${CSSVARIABLES.TYPOGRAPHY.INPUT_LABEL.REGULAR.WEIGHT};
        text-transform: ${CSSVARIABLES.TYPOGRAPHY.INPUT_LABEL.REGULAR.TRANFORM};
      }
      .input-row {
        display: flex;
        gap: 1em;
        margin-top: 1vh;
        align-items: center;
        .input-field {
          background-color: #eeeeee;
          border: none;
          border-radius: 4px;
          width: 269px;
          height: 34px;
          padding: 0.3em 1em;

          &::placeholder {
            font-family: 'Raleway', sans-serif;
            font-size: 12px;
            color: #b1b1b1;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

const ItemCardWrapper = styled.div`
  padding: 1em;
`;

export { MenuWrapper, StoreDetailsWrapper, AddItemModalWrapper, ItemCardWrapper };
