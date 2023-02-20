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
`}
`;

export default globalStyle;
