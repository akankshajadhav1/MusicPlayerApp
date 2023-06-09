import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { app } from '../config/firebaseConfig'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer';
import { validateUser } from '../api';

const Login = ({ setAuth }) => {
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const [{ user }, dispatch] = useStateValue()

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if (userCred) {
                setAuth(true);
                window.localStorage.setItem("auth", "true")
                firebaseAuth.onAuthStateChanged((userCred) => {
                    if (userCred) {
                        userCred.getIdToken().then((token) => {
                            validateUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data
                                })
                            })
                        })
                        navigate('/', { replace: true })
                    }
                    else {
                        setAuth(false);
                        dispatch({
                            type: actionType.SET_USER,
                            user: null
                        })
                        navigate("/login")
                    }
                })
            }
        })
    }
    useEffect(() => {
        if (window.localStorage.getItem("auth") === "true") {
            navigate("/", { replace: true })
        }

    }, [])

    return (
        <>
            <div>

            </div>

            <div className='relative w-screen h-screen'>

                <div className='absolute inset-0 bg-darkOverlay flex items-center justify-center p-4'>
                    <div className=''>
                        <img className='w-min' src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg' />
                    </div>
                    <div className='w-full md:w-460 h-510 p-4 bg-lightOverlay shadow-2xl rounded-full backdrop-blur-md flex flex-col items-center justify-center'>
                        <div onClick={loginWithGoogle} className=' w-30 h-20 flex items-center  justify-center gap-2 rounded-lg  bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all'>
                            <FcGoogle className='text-xl' />
                            SignIn with Google
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login