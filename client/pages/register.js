import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {
  toast.configure();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")

  const [userContext, setUserContext] = useContext(UserContext)

  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "users/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username: email, password, companyName: companyName }),
    })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            toast("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            toast("Invalid email and password combination.")
          } else if (response.status === 500) {
            console.log(response)
            const data = await response.json()
            if (data.message) toast(data.message || genericErrorMessage)
          } else {
            setError(genericErrorMessage)
          }
        } else {
          const data = await response.json()
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
        }
      })
      .catch(error => {
        setIsSubmitting(false)
        toast(genericErrorMessage)
      })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Register | WePitcher - Amazing Pitch Decks</title>
        <meta name="description" content="A Demo of my skills for the wefunder team :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageBody}>
        <Navbar />
        <main className={styles.main}>
          <h1 className={styles.title}>
            Create Your <Image src="/wepitcher-logo.png" alt="WePitcher Logo" width={280} height={76} /> Account
          </h1>
          <div className="register-form inline-flex w-full max-w-lg">
            <form onSubmit={formSubmitHandler} className="w-full bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-16">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    First Name
                    <input 
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={e => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Last Name
                    <input 
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      onChange={e => setLastName(e.target.value)}
                      value={lastName}
                      />
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Email
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Password
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="password"
                      type="password"
                      placeholder="*****************"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </label>
                  <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Company Name
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="companyName"
                      type="text"
                      placeholder="Acme Inc."
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                    />
                  </label>
                  {/* <p className="text-gray-600 text-xs italic">This will double as your deck's "slug"</p> */}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  value="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {isSubmitting ? "Creating Account..." : "Create Account"}
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