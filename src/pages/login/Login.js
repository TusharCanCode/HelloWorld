import './Login.css';
// import axios from 'axios';
import { AccountCircle, Facebook, LockOpen, Twitter, LinkedIn, Email, FirstPage, LastPage, ConfirmationNumber } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { login, register } from '../../API';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress } from '@material-ui/core';

export default function Login() {
    const assets = process.env.REACT_APP_PUBLIC_FOLDER;
    const myRef = useRef(null);
    const [userSignIn, setUserSignIn] = useState({});
    const [userSignUp, setUserSignUp] = useState({})
    const handleChangeSignIn = (e) => {
        const value = e.target.value;
        setUserSignIn({ ...userSignIn, [e.target.name]: value });
    }
    const handleChangeSignUp = (e) => {
        const value = e.target.value;
        setUserSignUp({ ...userSignUp, [e.target.name]: value });
    }
    const { user, isFetching, dispatch } = useContext(AuthContext);
    // async function temp() {
    //     try {
    //         const data = { email: 'sparsh@gmail.com', password: 'Test@2021' };
    //         const response = await axios.post('auth/login', data, { withCredentials: true });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const signUpHandle = () => {
        myRef.current.classList.add('signUpMode');
    }
    const signInHandle = () => {
        myRef.current.classList.remove('signUpMode');
    }
    const handleLogin = (e) => {
        e.preventDefault();
        login(userSignIn, dispatch);
    }
    const handleRegister = (e) => {
        e.preventDefault();
        register(userSignUp, dispatch);
    }
    console.log(user);
    return (
        <>
            <div className="loginContainer">
                <div className="color"></div>
                <div className="color"></div>
                <div className="color"></div>
                <div className="upperLeftCircle"></div>
                <div className="loginWrapper" ref={myRef}>
                    <div className="formsContainer">
                        <div className="signInRegisterForm">
                            <form className="signIn" onSubmit={handleLogin}>
                                <h2 className="title">Sign In</h2>
                                <div className="inputField">
                                    <Email className='inputFieldIcon' />
                                    <input type="text" name="email" placeholder="Email" onChange={handleChangeSignIn} />
                                </div>
                                <div className="inputField">
                                    <LockOpen className='inputFieldIcon' />
                                    <input type="password" name="password" placeholder="Password" onChange={handleChangeSignIn} />
                                </div>
                                <button className="btnLogin" disabled={isFetching}>{isFetching ? <CircularProgress color='inherit' size='25px'/> : "Log In"}</button>
                                <p className="socialText">Or Sign In with social platforms</p>
                                <div className="socialMedia">
                                    <Link to="/" className='socialIcon'>
                                        <Facebook />
                                    </Link>
                                    <Link to="/" className='socialIcon'>
                                        <Twitter />
                                    </Link>
                                    <Link to="/" className='socialIcon'>
                                        <LinkedIn />
                                    </Link>
                                </div>
                            </form>

                            <form className="signUp" onSubmit={handleRegister}>
                                <h2 className="title">Sign Up</h2>
                                <div className="nameInputField">
                                    <div className="inputField firstName">
                                        <FirstPage className='inputFieldIcon' />
                                        <input type="text" placeholder="First Name" name='firstName' onChange={handleChangeSignUp} />
                                    </div>

                                    <div className="inputField">
                                        <LastPage className='inputFieldIcon' />
                                        <input type="text" placeholder="Last Name" name='lastName' onChange={handleChangeSignUp} />
                                    </div>
                                </div>
                                <div className="inputField">
                                    <AccountCircle className='inputFieldIcon' />
                                    <input type="text" placeholder="Username" name='userName' onChange={handleChangeSignUp} />
                                </div>
                                <div className="inputField">
                                    <Email className='inputFieldIcon' />
                                    <input type="email" placeholder="Email" name='email' onChange={handleChangeSignUp} />
                                </div>
                                <div className="inputField">
                                    <LockOpen className='inputFieldIcon' />
                                    <input type="password" placeholder="Password" name='password' onChange={handleChangeSignUp} />
                                </div>
                                <div className="inputField">
                                    <ConfirmationNumber className='inputFieldIcon' />
                                    <input type="password" placeholder="Confirm Password" name='rePassword' onChange={handleChangeSignUp} />
                                </div>
                                <button className="btnLogin" disabled={isFetching}>{isFetching ? <CircularProgress color='inherit' size='25px'/> : "Sign Up"}</button>
                            </form>
                        </div>
                    </div>
                    <div className="panelsContainer">
                        <div className="panel leftPanel">
                            <div className="content">
                                <h3>New here?</h3>
                                <p>Join us in the journey of social interaction and let's make friends together.</p>
                                <button className='btnLogin transparent' id='signUpBtn' onClick={signUpHandle} disabled={isFetching}>{isFetching ? <CircularProgress color='inherit' size='20px'/> : "Sign Up"}</button>
                            </div>
                            <img src={assets + "register.svg"} alt="Sign Up" className='image' />
                        </div>

                        <div className="panel rightPanel">
                            <div className="content">
                                <h3>One of us?</h3>
                                <p>If you are already an user, click on the button below and sign in.</p>
                                <button className='btnLogin transparent' id='signInBtn' onClick={signInHandle} disabled={isFetching}>{isFetching ? <CircularProgress color='inherit' size='20px'/> : "Sign In"}</button>
                            </div>
                            <img src={assets + "login.svg"} alt="Sign In" className='image' />
                        </div>
                    </div>
                </div>
                <div className="lowerRightCircle"></div>
            </div>
        </>
    );
}
