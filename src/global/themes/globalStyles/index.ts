import CSSVARIABLES from 'global/constants/variables';
import { createGlobalStyle, css } from 'styled-components';

const globalStyle = createGlobalStyle`
${({ theme }) => css`
  body {
    margin: 0;
    font-family: 'Raleway', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  html,
  body,
  #root {
    box-sizing: border-box;
    margin: 0;
    padding: 0%;
  }
  body {
    background: ${theme.backgroundColor};
  }

  html {
    font-size: '100%';
  }

  .query-input-container {
    width: 450px;
    padding: 2em;
  }

  .ai-result {
  width: 100%;
  margin: 2% auto;
  background-color: #282c34;
  color: white;
  padding: 1em;
  text-align: left;

  display: flex;
  align-items: center;
}
.ai-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline;
}
  .influencer-profile {
    padding: 1em;
    
    .packs {
      margin-top: 8vh;
      margin-bottom: 8vh;

      padding: 2em;
      background: ${CSSVARIABLES.COLORS.WHITE_1};

      .packs-container {
        /* background: yellow; */
        display: flex;
        gap: 2em;
  
        text-align: center;
        
        .pack {
          .name {
            font-weight: bold;
            font-size: 24px;
          }
        }
      }
    }
    .title {
      text-align: center;
      font-size: 24px;
    }
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
      text-align: center;

      .actions {
        .icon {
          padding: 0 1em;
        }
      }
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
  }
  
@media only screen and (max-width: 768px) {
  .query-input-container {
    min-width: 80%;
    margin-left: 30%;
  }
  .ai-result {
    width: 100%;
    /* margin-left: 6em; */
    margin-left: 3%;
  }
}


`}
`;

export default globalStyle;
