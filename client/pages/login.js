import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  toast.configure();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later."

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then(async response => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            toast("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            toast("Invalid email and password combination.");
          } else {
            toast(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          console.log(data.token);
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
          router.push('/account');
        }
      })
      .catch(error => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      })
  }
  console.log("User Context: ", userContext);
  return (
    <div className={styles.container}>
      <Head>
        <title>Login | WePitcher - Amazing Pitch Decks</title>
        <meta name="description" content="A Demo of my skills for the wefunder team :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageBody}>
        <Navbar />
        <main className={styles.main}>
          <h1 className={styles.title}>
            Login To Your <Image src="/wepitcher-logo.png" alt="WePitcher Logo" width={280} height={76} /> Account
          </h1>
          <div className="login-form inline-flex w-full max-w-md">

            <form onSubmit={formSubmitHandler} className="w-full bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-16">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                  <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"                    id="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                </label>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"                    id="email"
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="******************" />
                  <p className="text-red-500 text-xs italic hidden">Please choose a password.</p>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  value="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {isSubmitting ? "Signing In" : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}