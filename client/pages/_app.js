import React, { useContext, useCallback, useEffect } from 'react';
import '../styles/globals.css'
import { UserProvider } from "../context/UserContext"
import Layout from '../components/layout';
import { UserContext } from '../context/UserContext';
import {useLocalStorage} from '../utils/localStorage';

function MyApp({ Component, pageProps }) {
  const [userContext, setUserContext] = useContext(UserContext);
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);

  const verifyUser = useCallback(() => {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      console.log("Response: ", response);
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
        setRefreshToken(null);
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 1 * 30 * 1000);
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser]);
  
  /**
  * Sync logout across tabs
  */
  const syncLogout = useCallback(event => {
    if (event.key === "logout") {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout)
    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout])

    
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

export default MyApp
