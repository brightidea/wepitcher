import React, { useCallback, useContext, useEffect } from 'react';
import { UserContext } from "../context/UserContext";
import Link from "next/link";
import Image from 'next/image'
import styles from '../styles/Layout.module.css'

function Navbar() {
  const [userContext, setUserContext] = useContext(UserContext);
  const isLoggedOut = !userContext.token;
  return (
    <nav className={styles.navbar}>
      <div className="flex items-center flex-shrink-0 text-white mr-20">
      <Link href="/">
        <a>
          <Image src="/wepitcher-logo.png" alt="WePitcher Logo" width={122} height={34} />
        </a>
      </Link>
      </div>
      <div className="block lg:hidden">
        <a className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-gray-300 hover:border-gray-300">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </a>
      </div>
      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow content-center	justify-center">
        </div>
        <div className="hidden lg:inline-block">
          <Link href="/decks"><a className="uppercase inline-block text-sm px-4 py-2 leading-none text-black hover:text-gray-500 hover:underline mt-4 lg:mt-2 lg:mr-4">Explore Pitch Decks</a></Link>
          |
          {isLoggedOut
            ? <><Link href="/login"><a className="wepitcherButton wepitcherNavbarButton">LOGIN</a></Link><Link href="/register"><a href="#" className="wepitcherButton wepitcherNavbarButton lg:ml-2">REGISTER</a></Link></> 
            : <Link href="/account"><a className="wepitcherButton wepitcherNavbarButton">ACCOUNT</a></Link> 
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


