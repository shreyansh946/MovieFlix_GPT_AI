import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../Utilis/FireBase';
import { Link, useNavigate } from 'react-router-dom';
import { FaFilm, FaHeart, FaHome, FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../Utilis/UserSlice';
import { Logo, SL } from '../Utilis/Constant';
import { toggleGptSearchView } from '../Utilis/gptSlice';
import { changeLanguage } from '../Utilis/ConfigSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const user = useSelector(store => store.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        // navigate("/browse");
        }
      else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();

  }, []);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView())
  }

  return (
    <div className="absolute w-screen px-0 md:px-2 py-0 md:py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row md:justify-between md:gap-2">
      <Link to='/browse' >
      <img
        className='w-44'
        src={Logo}
        alt='netflix-logo'
      />
      </Link>
      {user && (<div className="flex p-2 justify-between" >

        {showGptSearch && (<select        className="p-2 m-2 mr-[-40px] bg-gray-900 text-white" onClick={handleLanguageChange}>

          {SL.map((lang) => (<option key={lang.identifier} value={lang.identifier} >{lang.name} </option>))}

        </select>)}

        <Link to='/browse'>
           
            {
              showGptSearch ?  
              <button  className="py-2 px-4 mr-60 md:mr-18 mx-20 md:mx-20 md:my-2 bg-blue-800 text-white rounded-lg mt-[4px] md:mt-1"
              onClick={handleGptSearchClick}>Home</button>
              : 
              <button className="py-2 px-4 mr-60 md:mr-18 mx-20 md:mx-20 md:my-2 bg-blue-800 text-white rounded-lg mt-[4px] md:mt-1"
              onClick={handleGptSearchClick}>GPT Search</button>
            }
          </Link>

          <div type="button" 
          // className="md:w-[100px] right-0 md:mx-[-1%] mt-1 absolute rounded-md z-30"
         
            onMouseEnter={() => setDropdownOpen(true)}
            ref={dropdownRef}>
            {user?.photoURL ? <img
                 className="md:block w-12 h-12 rounded-full"
              alt="usericon"
              src={user?.photoURL}
            /> : <FaUserCircle className="text-white mt-2" style={{ fontSize: 30, cursor: 'pointer' }} />}
          </div>

{isDropdownOpen  && (
            <div className="absolute right-[15px] md:right-10 mt-14 w-32 z-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      <FaUser className="inline mr-2" /> {user?.displayName}
                      
                  </button>
                  <Link to="/browse">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      <FaHome className="inline mr-2" /> Home
                    </button>
                  </Link>
                  <Link to="/favourites">
                    <button  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    >
                      <FaHeart className="inline mr-2"/> Favourites
                    </button>
                  </Link>
                  <Link to="/watchlist">
                    <button  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      <FaFilm className="inline mr-2"/> Watchlist
                    </button>
                  </Link>
                  <button  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem" onClick={HandleSignOut}
                  >
                    <FaSignOutAlt className="inline mr-2" /> Logout
                  </button>
                </div>  
            </div>
          )}

      </div>
      )}
    </div>
  );
};

export default Header;
