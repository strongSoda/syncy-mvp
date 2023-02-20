import { motion } from 'framer-motion';
import styled from 'styled-components';

import CSSVARIABLES from 'global/constants/variables';

const MerchantsBarWrapper = styled.div`
  height: ${CSSVARIABLES.SIDEBAR.HEIGHT};
  width: ${CSSVARIABLES.SIDEBAR.WIDTH};
  position: fixed;
  z-index: 1;
  top: 0;
  /* left: 0; */
  background-color: ${CSSVARIABLES.COLORS.WHITE_0};
  overflow-x: hidden;
  padding: ${CSSVARIABLES.SIDEBAR.PADDING_TOP};

  h1 {
    font-weight: ${CSSVARIABLES.TYPOGRAPHY.H1.REGULAR.WEIGHT};
    font-size: ${CSSVARIABLES.TYPOGRAPHY.H1.REGULAR.SIZE};
  }

  .title {
    text-transform: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.TRANFORM};
    font-size: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.SIZE};
    color: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.COLOR};
    font-weight: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.WEIGHT};
  }

  .merchants {
    margin-top: 4vh;
  }
`;

const MerchantCardWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1em;
  padding-bottom: 2vh;
  padding-top: 2vh;
  border-bottom: 1px solid ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.COLOR};
  cursor: pointer;

  .profile-img {
    height: 6vh;
    border-radius: 12em;
  }
  .date {
    /* text-transform: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.TRANFORM}; */
    font-size: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.SIZE};
    color: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.COLOR};
    font-weight: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.WEIGHT};
  }

  .owner-name {
    color: ${CSSVARIABLES.SIDEBAR.LINK.COLOR};
    font-size: ${CSSVARIABLES.SIDEBAR.LINK.SIZE};
    text-transform: ${CSSVARIABLES.SIDEBAR.LINK.TRANFORM};
    text-decoration: none;
    display: block;
    font-weight: ${CSSVARIABLES.SIDEBAR.LINK.WEIGHT};
  }
`;

export { MerchantsBarWrapper, MerchantCardWrapper };
