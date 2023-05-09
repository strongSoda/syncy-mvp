import { motion } from 'framer-motion';
import styled from 'styled-components';

const AiPocWrapper = styled.div`

    .productImageWrapper {
        min-height: 600px;
        background: url("https://img.freepik.com/free-photo/black-wall-product-background_53876-89515.jpg")
            no-repeat center center;
        background-size: contain;
        position: relative;

        .title {
            position: absolute;
            bottom: 10%;
            font-size: 2rem;
        }
        .tagline {
            padding-top: 4rem;
            text-align: center;
            /* position: absolute;
            top: 15%;
            left: 25%; */
            font-size: 2.5rem;
            font-family: 'Permanent Marker', cursive;
        }
        .productImage {
            /* width: 30%; */
            position: absolute;
            top: 25%;
            left: 45%;
            height: 60%;
            /* object-fit: cover; */
            /* opacity: 0.5; */
            background: transparent;
            background-blend-mode: darken;
            /* border-radius: 500em; */
        }
    }

`;

export default AiPocWrapper;
