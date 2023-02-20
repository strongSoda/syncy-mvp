// import Moralis from 'moralis/types';
// import React, { useEffect, useState } from 'react';
// // import tokenContractAbi from '../abi';
// // import Moralis from '../moralis';

// const Auth = ({setUser}) => {
//     const [showLogin, setShowLogin] = useState(true)

//     const init = async () => {
//         const web3 = await Moralis.Web3.enable();
//         initUser();
//     }

//     const login = async () => {
//         try {
//             const user = await Moralis.Web3.authenticate();
//             console.log(user);
//             initUser()
            
//         } catch (error) {
//             const code = error.code;
//             const message = error.message;
//             alert(message);
//         }
//     }

//     const logout = async () => {
//         await Moralis.User.logOut();
//         initUser()
//     }

//     const initUser = async () => {
//         const user = await Moralis.User.current()
//         console.log(user);
//         setUser(user)
//         if(user) {
//             setShowLogin(false)
//         } else {
//             setShowLogin(true)
//         }
//     }

//     // useEffect(() => {
//     //     init()
//     // }, [])

//     return (
//         <div>
//             {showLogin ? 
//                 <button id="btnConnect" onClick={login}>Connect Wallet</button>
//                 : 
//                 <div>
//                     <button id="btnUserInfo" onClick={logout}>Logout</button>
//                 </div>
//             }
            
//         </div>
//     )
// }

// export default Auth;