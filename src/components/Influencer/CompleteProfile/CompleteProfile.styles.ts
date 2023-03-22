import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/variables';
import styled from 'styled-components';

const InfluencerCompleteProfileWrapper = styled.div`
    /* margin-left: ${CSSVARIABLES.LAYOUT.PRIMARY.MARGIN_LEFT}; */

    .toggleBtn {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;

        display: none;
    }

    .error {
        /* text-align: center; */
        /* margin: 0 auto; */
        color: ${CSSVARIABLES.COLORS.RED};
        font-size: 0.8em;
        margin: 0%;
        /* margin-left: 57%; */
        padding: 0%;
        width: 100%;
    }

    .container {
        width: 40vw;
        margin: 0 auto;

        .title {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        


        input[type='submit'] {
            background-color: ${CSSVARIABLES.COLORS.GREEN_0};
            color: ${CSSVARIABLES.COLORS.WHITE_1};
            border: none;
            border-radius: 0.2rem;
            width: 100%;
            padding: .8em 0em;
            margin-top: 3vh;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 1rem;
        }
    }

    @media (max-width: 768px) {
        .toggleBtn {
            display: block;
        }
        .container {
            width: 100vw;

            .title {
                /* font-size: 0.6em; */
                text-align: center;
            }
        }
    }
`;

export default InfluencerCompleteProfileWrapper;
