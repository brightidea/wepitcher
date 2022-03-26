import React, { useCallback, useContext, useEffect } from 'react';
import { UserContext } from "../context/UserContext";
import { useRouter } from 'next/router';

// import Loader from "./Loader"

const Account = () => {
    const router = useRouter();
    const [userContext, setUserContext] = useContext(UserContext)
    console.log("userContext: ", userContext)
    const fetchUserDetails = useCallback(() => {
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "users/me", {
        method: "GET",
        credentials: "include",
        // Pass authentication token as bearer token in header
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
        },
        }).then(async response => {
        if (response.ok) {
            const data = await response.json()
            setUserContext(oldValues => {
            return { ...oldValues, details: data }
            })
        } else {
            if (response.status === 401) {
            // Edge case: when the token has expired.
            // This could happen if the refreshToken calls have failed due to network error or
            // User has had the tab open from previous day and tries to click on the Fetch button
            window.location.reload();
            } else {
            setUserContext(oldValues => {
                return { ...oldValues, details: null }
            })
            }
        }
        })
    }, [setUserContext, userContext.token])

  useEffect(() => {
    // fetch only when user details are not present
    if (userContext.token && !userContext.details) {
      fetchUserDetails()
    }
  }, [userContext.details, fetchUserDetails])

  useEffect(() => {
    // redirect if no refresh token present
    if (!userContext.token) {
        router.push('/login');
    }
  }, [userContext])

  const logoutHandler = () => {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      setUserContext(oldValues => {
        return { ...oldValues, details: undefined, token: null }
      })
      window.localStorage.setItem("logout", Date.now())
    })
  }

  const refetchHandler = () => {
    // set details to undefined so that spinner will be displayed and
    // fetchUserDetails will be invoked from useEffect
    setUserContext(oldValues => {
      return { ...oldValues, details: undefined }
    })
  }

  return userContext.details === null ? (
    "Error Loading User details"
  ) : !userContext.details ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="user-details">
        <div>
          <p>
            Welcome&nbsp;
            <strong>
              {userContext.details.firstName}
              {userContext.details.lastName &&
                " " + userContext.details.lastName}
            </strong>!
            {userContext.details.companyName}
          </p>
          <p>
            Your reward points: <strong>{userContext.details.points}</strong>
          </p>
        </div>
        <div className="user-actions">
          <button onClick={logoutHandler}>Logout</button>
          <button onClick={refetchHandler}>Refetch</button>
        </div>
      </div>
    </div>
  )
}

export default Account
