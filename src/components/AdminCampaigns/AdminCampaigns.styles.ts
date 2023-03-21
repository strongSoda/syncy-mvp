import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/variables';
import styled from 'styled-components';

const AdminCampaignsWrapper = styled.div`

    .form {
        width: 60%;
        margin: 0 auto;
        /* background-color: #fff; */


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

`;

export default AdminCampaignsWrapper;
