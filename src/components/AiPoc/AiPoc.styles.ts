import { motion } from 'framer-motion';
import styled from 'styled-components';

const AiPocWrapper = styled.div`

    .productImageWrapper {
        min-height: 600px;
        /* shades of black radial gradient towards right */
        background: hsla(354, 95%, 24%, 1);

        background: linear-gradient(90deg, hsla(354, 95%, 24%, 1) 0%, hsla(234, 70%, 24%, 1) 100%);

        background: -moz-linear-gradient(90deg, hsla(354, 95%, 24%, 1) 0%, hsla(234, 70%, 24%, 1) 100%);

        background: -webkit-linear-gradient(90deg, hsla(354, 95%, 24%, 1) 0%, hsla(234, 70%, 24%, 1) 100%);

        position: relative;

        
        .title {
            position: absolute;
            bottom: 10%;
            font-size: 1rem;
        }
        .tagline {
            padding-top: 4rem;
            text-align: center;
            font-size: 2.5rem;
            font-family: 'Montez', cursive;
        }
        .productImage {
            background: transparent;
            margin: 0 auto;
            display: block;
            height: 40vh;
            margin-top: 5vh;
        }
    }

    .productImageWrapper2 {
        height: 600px;
        margin: 0 auto;
        margin-top: 5vh;
        

        display: flex;
        justify-content: space-between;
        overflow-x: hidden;

        .left {
            width: 50%;
            color: black;

            padding-left: 5%;

            .tagline2 {
                padding-top: 4rem;
                text-align: center;
                font-size: 3.5rem;
                line-height: 1.2;
                font-family: 'Montez', cursive;
            }
            .benefits {
                font-size: 1.5rem;
                font-family: 'Montserrat', sans-serif;

                .benefit {
                    list-style: none;
                    margin-top: 1rem;
                }
            }
        }
        .right {
            width: 70%;
            height: 100%;
            position: relative;
            
            background: linear-gradient(105deg, white 25%, yellow 25%);
            
            
            .productImage2 {
                /* background-clip: content-box; */
                margin: 0 auto;
                /* float: right; */
                display: block;
                height: 80%;
                margin-top: 5vh;
            }
            .title2 {
                position: absolute;
                bottom: 2%;
                font-size: 1rem;
                right: 3%;
            }
        }
    }
`;

export default AiPocWrapper;
