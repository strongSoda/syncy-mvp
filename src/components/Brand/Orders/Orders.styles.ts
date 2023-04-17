import CSSVARIABLES from 'global/constants/variables';
import styled from 'styled-components';

const OrdersWrapper = styled.div`
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

  .order {
    /* background: yellow; */
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        width: 4vw;
        /* background: yellow; */
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

        .order {
            flex-direction: column;
            align-items: flex-start;
            padding: 0 1vw;
            margin-bottom: 1vh;        
        }
    }
`;

export default OrdersWrapper;
