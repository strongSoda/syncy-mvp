import { motion } from 'framer-motion';
import styled from 'styled-components';

import CSSVARIABLES from 'global/constants/variables';

const SignupWrapper = styled.div`
  display: flex;
  height: 100vh;
  /* width: 100vw; */
  /* overflow-x: hidden; */
  padding: 0;
  margin: 0;
  header {
    /* margin-top: 4vh; */
    display: flex;
    justify-content: space-around;
    background-color: ${CSSVARIABLES.COLORS.PRIMARY_GREEEN_1};
    z-index: 10;
    position: fixed;
    width: 50%;
    top: 0;
    height: fit-content;
    padding-top: 2vh;
    .brand {
      color: ${CSSVARIABLES.COLORS.GREEN_0};
      letter-spacing: 4px;
      text-transform: uppercase;
      font-weight: 600;
    }
    .login_btn {
      background: ${CSSVARIABLES.COLORS.GREEN_0};
      color: ${CSSVARIABLES.COLORS.WHITE_1};
      padding: 1em 3em;
      font-family: 'Raleway', sans-serif;
      text-transform: uppercase;
      cursor: pointer;
      font-weight: 600;
      border: none;
    }
  }
  div {
    width: 50%;
    form {
      margin-top: 6vh;
      display: flex;
      justify-content: baseline;
      padding-top: 5vh;
      flex-direction: column;
      align-items: center;
      max-height: 80%;
      overflow-y: auto;
      }
      small {
        margin-right: 23em;
        color: ${CSSVARIABLES.COLORS.GRAY_0};
      }
      input {
        width: 40%;
        padding: 1.2em 1em;
        background-color: ${CSSVARIABLES.COLORS.WHITE_0};
        border: none;
        font-family: 'Raleway', sans-serif;
        ::placeholder {
          /* color: #cec5c5; */
          font-family: 'Raleway', sans-serif;
          font-weight: 500;
          opacity: 0.5;
        }
      }
      div {
        color: ${CSSVARIABLES.COLORS.RED};
        margin-left: 6em;
        font-size: 0.8em;
      }
      input[type='submit'] {
        background-color: ${CSSVARIABLES.COLORS.GREEN_0};
        color: ${CSSVARIABLES.COLORS.WHITE_1};
        border: none;
        width: fit-content;
        padding: 1em 4em;
        text-transform: uppercase;
        margin-top: 3vh;
        font-weight: 600;
        cursor: pointer;
      }
    }
  .banner {
    background:
      url('https://images.pexels.com/photos/7004737/pexels-photo-7004737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    /* h1,
    p {
      color: ${CSSVARIABLES.COLORS.WHITE_0};
      position: relative;
      top: 30%;
      width: 60%;
      margin: 0 auto;
    }
    p {
      margin-top: 2.5vh;
    } */

    .title {
      color: ${CSSVARIABLES.COLORS.WHITE_1};
      font-size: 5em;
      margin: 25% 12%;
    }
  }
  @media only screen and (max-width: 768px) {
    /* flex-direction: column; */
    width: 100vw;
    height: fit-content;
    padding: 0%;
    header {
      width: 100%;
    }
    /* overflow-y: auto; */

    #form {
      width: 100vw;
      /* padding: 0%; */
      z-index: 5;

      input {
        width: 80%;
      }

      .error {
        position: relative;
        left: 0;
        margin: 0%;
        padding: 0%;
      }
    }
    .banner {
      display: none;
    }
  }
`;

export default SignupWrapper;
