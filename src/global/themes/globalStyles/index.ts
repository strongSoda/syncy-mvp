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
