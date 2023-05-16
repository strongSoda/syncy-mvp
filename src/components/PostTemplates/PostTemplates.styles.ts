import styled from 'styled-components';

const PostTemplatesWrapper = styled.div``;

export const PostTemplateWrapper1 = styled.div`
    margin-bottom: 5vh;

    .productImageWrapper {
        min-height: 600px;
        /* shades of black radial gradient towards right */
        /* background: hsla(354, 95%, 24%, 1); */
        border: 8px solid black;

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
            /* font-family: 'Montez', cursive; */
        }
        .productImage {
            background: transparent;
            margin: 0 auto;
            display: block;
            height: 40vh;
            margin-top: 5vh;
        }
    }
`;

export const PostTemplateWrapper2 = styled.div`
    .productImageWrapper2 {
        height: 600px;
        margin: 0 auto;
        margin-top: 5vh;

        border: 8px solid black;
        

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
                /* font-family: 'Montez', cursive; */
            }
            .benefits {
                font-size: 1.5rem;
                /* font-family: 'Montserrat', sans-serif; */

                .benefit {
                    list-style: none;
                    margin-top: 1rem;
                    text-transform: capitalize;
                }
            }
        }
        .right {
            width: 70%;
            height: 100%;
            position: relative;            
            
            .productImage2 {
                /* background-clip: content-box; */
                margin: 0 auto;
                /* float: right; */
                display: block;
                height: 80%;
                width: 100%;
                object-fit: contain;
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
`

export const PostTemplateWrapper3 = styled.div`
    .productImageWrapper {
        border: 8px solid black;

        position: relative;
        .productImage {
            height: 100%;
            width: 100%;
            object-fit: contain;
            display: block;
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: .7;

            background: yellow;

            z-index: 10;

            .tagline {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                font-size: 3.5rem;
                text-align: center;

                width: 100%;
                /* height: fit-content; */
                
            }

            .title {
                position: absolute;
                bottom: 3%;
                font-size: 2rem;
                right: 3%;

                z-index: 20;
            }
        }
    }
`

export const PostTemplateWrapper4 = styled.div`
    margin-bottom: 5vh;

    .productImageWrapper {
        display: flex;
        justify-content: space-between;

        /* background: #000; */
        min-height: 600px;
        /* shades of black radial gradient towards right */
        /* background: hsla(354, 95%, 24%, 1); */
        border: 8px solid black;

        position: relative;

        .details {
            width: 50%;
        }

        .blob {
            width: 50%;
            margin-top: 13%;
            border-radius: 28% 72% 65% 35% / 37% 70% 30% 63%;
            
            height: 100%;
            padding: 3em;

            .productImage {
                width: 100%;
                object-fit: contain;
                background: transparent;
                margin: 0 auto;
                display: block;
                /* height: 40vh; */
                /* margin-top: 5vh; */
            }

        }

        .details {
            position: relative;
            .title {
                position: absolute;
                bottom: 10%;
                font-size: 2rem;
            }
            .tagline {
                    position: absolute;
                    top: 15%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    font-size: 2.5rem;
                    line-height: 1.2;
                    text-align: center;

                    width: 100%;
            }

            .benefits {
                margin: 40% auto;
                
                font-size: 1.5rem;
                /* font-family: 'Montserrat', sans-serif; */

                .benefit {
                    list-style: none;
                    margin-top: 1rem;
                    width: 100%;
                    text-transform: capitalize;
                }
            }
        }

    }
`;

export default PostTemplatesWrapper;
