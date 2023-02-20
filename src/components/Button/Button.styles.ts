import { motion } from 'framer-motion';
import styled from 'styled-components';

import CSSVARIABLES from 'global/constants/variables';

declare interface PROPS {
  backgroundColor: string;
}

const ButtonWrapper = styled.button`
  background-color: ${(buttontheme: PROPS) => buttontheme.backgroundColor};
  color: ${CSSVARIABLES.COLORS.WHITE_0};
  border: none;
  border-radius: 12px;
  padding: 1em 2em;
  font-size: 14px;
  font-weight: 550;
  cursor: pointer;
  width: 190px;
`;

export default ButtonWrapper;
