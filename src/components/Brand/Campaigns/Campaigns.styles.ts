import CSSVARIABLES from 'global/constants/variables';
import styled from 'styled-components';

const CampaignsWrapper = styled.div`
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
`;

export default CampaignsWrapper;
