import { motion } from 'framer-motion';
import styled from 'styled-components';

import CSSVARIABLES from 'global/constants/variables';

declare interface PROPS {
  lightColor: string;
  darkColor: string;
}
const SideBarWrapper = styled.div`
  height: ${CSSVARIABLES.SIDEBAR.HEIGHT};
  width: ${CSSVARIABLES.SIDEBAR.WIDTH};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: ${(sideBartheme: PROPS) => sideBartheme.lightColor};
  overflow-x: hidden;
  padding-top: ${CSSVARIABLES.SIDEBAR.PADDING_TOP};

  .top-section {
    width: 80%;
    margin: 4em auto;
    /* padding: 2em;     */
    /* background-color: red; */

    .title {
      text-transform: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.TRANFORM};
      font-size: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.SIZE};
      color: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.COLOR};
      font-weight: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.WEIGHT};
    }

    a {
      color: ${CSSVARIABLES.SIDEBAR.LINK.COLOR};
      font-size: ${CSSVARIABLES.SIDEBAR.LINK.SIZE};
      text-transform: ${CSSVARIABLES.SIDEBAR.LINK.TRANFORM};
      font-weight: 500;
      text-decoration: none;
      display: block;
      margin-top: 1vh !important;
      display: flex;
      gap: 1em;
      padding: 1em;
      .icon {
        height: 2vh;
      }
      &:hover {
        background-color: ${(sideBartheme: PROPS) => sideBartheme.darkColor};
        color: ${CSSVARIABLES.COLORS.WHITE_0};
        border-radius: 12px;
      }
    }
  }

  .bottom-section {
    width: 80%;
    margin: 4em auto;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    bottom: 0;

    .profile-img {
      height: 6vh;
      border-radius: 12em;
    }
    .title {
      text-transform: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.TRANFORM};
      font-size: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.SIZE};
      color: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.COLOR};
      font-weight: ${CSSVARIABLES.TYPOGRAPHY.TITLE.FADED.WEIGHT};
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
`;

export default SideBarWrapper;
