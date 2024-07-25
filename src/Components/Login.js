import React, { useRef, useState } from 'react'
import Header from './Header'
import { CheckValidData } from '../Utilis/Validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Utilis/FireBase';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utilis/UserSlice';
import { USER_AVATAR, backgournd_img } from '../Utilis/Constant';
import { useNavigate } from 'react-router-dom';

const Login = () => {

        const [IsSignInForm,setIsSignInForm] = useState(true);
        const [errorMessage,setErrorMessage]= useState(null);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const toggleSignInForm = () =>{ 

                setIsSignInForm(!IsSignInForm);

        }
        const name = useRef(null);
        const email = useRef(null);
        const password = useRef(null);

        const handleButtonClick = () =>{
            const message =  CheckValidData(email.current.value,password.current.value);
            setErrorMessage(message);

                if(message) return;

                if(!IsSignInForm)
                {   
                    //Sign UP form
                    createUserWithEmailAndPassword(auth, 
                        email.current.value, 
                        password.current.value)
                    .then((userCredential) => {
                   
                      const user = userCredential.user;

                      updateProfile(user, {
                        displayName: name.current.value,
                         photoURL: USER_AVATAR,
                      }).then(() => {
                        const {uid, email, displayName,photoURL} = auth.currentUser;
                        dispatch(
                          addUser(
                          {uid: uid,email: email,displayName: displayName,photoURL: photoURL}
                        ));

                        navigate("/browse");
                      }).catch((error) => {
                        setErrorMessage(error.message);
                        navigate("/error");
                      });

                      console.log(user);                    
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      setErrorMessage(errorCode + "-" + errorMessage)
                   
                    });
                }
                else
                {
                    signInWithEmailAndPassword(auth, email.current.value, 
                        password.current.value)
                    .then((userCredential) => {
                      // Signed in 
                      const user = userCredential.user;
                      console.log(user);
                      navigate("/browse");
                      // ...
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      setErrorMessage(errorCode + "-" + errorMessage)
                    });
                }


        }


  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img className="h-screen object-cover md:w-screen" src={backgournd_img} 
             alt='netflix-backgrounf-img' />
        </div>
       
         
           <form 
           onClick={(e) =>{
            e.preventDefault()
           }}
           
           className="w-full md:w-3/12 absolute p-12 bg-black my-30 mt-36 md:mt-10 
           mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className='font-bold text-3xl py-2'>{IsSignInForm ? "Sign In" :"Sign Up"} </h1>

                {
                    !IsSignInForm && (
                        <input ref={name} type="text" 
                placeholder='Enter Name Here' 
                className='p-4 my-4 w-full font-bold bg-gray-700' />
                    )
                }

                <input  ref = {email} type="text" 
                placeholder='Enter Email Here' 
                className='p-4 my-4 w-full font-bold bg-gray-700' />

                <input ref={password} type="password"
                 placeholder='Enter password here'
                  className='p-4 my-4 w-full font-bold bg-gray-700' />

                <p className='text-red-500 font-bold text-lg'>{errorMessage}</p>  

                <button className="p-4 my-4 bg-red-700 w-full rounded-lg"
                    onClick={handleButtonClick}
                >{IsSignInForm ? "Sign In" :"Sign Up"} </button>

                <p className='py-4 cursor-pointer' onClick={toggleSignInForm} >
                     {IsSignInForm ? "New to Netflix?Sign Up Now " :"Already Register? Sign In Now"} </p> 
            </form>
          
    
    </div>
  )
}

export default Login