import { motion } from 'framer-motion';
import styled from 'styled-components';

import CSSVARIABLES from 'global/constants/variables';

const ManageMerchantsWrapper = styled.div`
  margin-left: ${CSSVARIABLES.LAYOUT.PRIMARY.MARGIN_LEFT};
  background-color: #17191c;
  height: 100vh;

  h1 {
    font-weight: bold;
    font-size: 36px;
  }

  .content {
    /* padding: ${CSSVARIABLES.LAYOUT.PRIMARY.PADDING}; */
    padding-left: 22.35em;
    /* width: fit-content; */
    /* background-color: #17191c; */
  }
`;

const MerchantDetailsWrapper = styled.div`
  background-color: ${CSSVARIABLES.COLORS.WHITE_0};
  /* width: 700px; */
  height: fit-content;
  /* margin: 2vh auto; */
  /* padding: 2em; */
  border-radius: 12px;

  /* select parent of .str-chat */
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

const AddStoreModalWrapper = styled.div`
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

const StoreCardWrapper = styled.div`
  background-color: #f7f7f7;
  padding: 1em;
  .store-card-conatiner {
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    margin-top: 3vh;
    width: 95%;

    .left-section {
      display: flex;
      align-items: center;
      gap: 1em;

      .profile-img {
        height: 8vh;
        border-radius: 12px;
        background-color: #fff;
      }
      .date {
        /* text-transform: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.TRANFORM}; */
        font-size: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.SIZE};
        color: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.COLOR};
        font-weight: 500;
      }

      a {
        color: ${CSSVARIABLES.SIDEBAR.LINK.COLOR};
        font-size: ${CSSVARIABLES.SIDEBAR.LINK.SIZE};
        text-transform: ${CSSVARIABLES.SIDEBAR.LINK.TRANFORM};
        text-decoration: none;
        display: block;
        font-weight: ${CSSVARIABLES.SIDEBAR.LINK.WEIGHT};
      }
    }
  }
`;

const AddMenuPromptWrapper = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  margin-top: 3vh;
  /* padding-top: 1vh; */
  padding: 0.4em 1em;
  width: 95%;

  .left-section {
    display: flex;
    align-items: center;
    gap: 1em;

    .profile-img {
      height: 4vh;
      border-radius: 10px;
      background-color: #fff;
    }
    .date {
      /* text-transform: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.TRANFORM}; */
      font-size: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.SIZE};
      color: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.COLOR};
      font-weight: 500;
    }

    .menu-name-input {
      color: ${CSSVARIABLES.SIDEBAR.LINK.COLOR};
      font-size: ${CSSVARIABLES.SIDEBAR.LINK.SIZE};
      text-transform: ${CSSVARIABLES.SIDEBAR.LINK.TRANFORM};
      text-decoration: none;
      display: block;
      font-weight: ${CSSVARIABLES.SIDEBAR.LINK.WEIGHT};
      border: none;
      padding: 0.7em;

      :active,
      :focus {
        border: none;
      }

      ::placeholder {
        color: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.COLOR};
        font-family: 'Raleway', sans-serif;
      }
    }
  }
`;

const AddCardBtnWrapper = styled.button`
  position: static;
  background-color: ${CSSVARIABLES.COLORS.BLUE_3};
  color: ${CSSVARIABLES.COLORS.BLUE_0};
  font-weight: 550;
  padding: 1.5em;
  border-radius: 8px;
  border: 2px dashed ${CSSVARIABLES.COLORS.BLUE_2};
  text-align: center;
  margin-top: 3vh;
  cursor: pointer;
  width: 100%;
`;

export { ManageMerchantsWrapper, MerchantDetailsWrapper, AddStoreModalWrapper, StoreCardWrapper, AddCardBtnWrapper, AddMenuPromptWrapper };
