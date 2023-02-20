import { motion } from 'framer-motion';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
  width: 100%;
  margin-bottom: 5vh;
  padding: 1em;
  .right-section {
    width: 10%;
    position: fixed;
    right: 0%;
    display: flex;
    gap: 2em;

    img {
      cursor: pointer;
    }
  }
`;

export default NavbarWrapper;
