import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://culinashare.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="flex w-full  flex-col md:w-1/2">
          <div className="flex ">
            <a href="/" className=" m-3 pb-2  mb-3 btn btn-primary rounded-2xl border  text-red-500 border-red-500 hover:text-gray-100 hover:bg-red-500 ">Back Home  </a>
          </div>
          <div className="lg:w-[28rem] mx-auto sign-res my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <p className="text-left text-3xl font-bold">Welcome To Our, RECIPE<span className='text-red-600'>NINJA</span></p>
            <p className="mt-2 text-left text-gray-500">Welcome back, please enter your details.</p>

            <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
              <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">SignUp</div>
            </div>
            <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input type="text" id="login-email" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="UserName" required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input type="password" id="login-password" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"> SignUp</button>
            </form>
            <div className="py-12 text-center">
              <p className="whitespace-nowrap text-gray-600">
                Already have an account?
                <a href="Login" className="underline-offset-4 font-semibold text-gray-900 underline">Login Now</a>
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p className="mb-8 text-3xl font-semibold leading-10">We work 10x faster than our compeititors and stay consistant. While they're bogged won with techincal debt, we're realeasing new features.</p>
            <p className="mb-4 text-3xl font-semibold">John Elmond</p>
            <p className="">Founder, Emogue</p>
            <p className="mb-7 text-sm opacity-70">Web Design Agency</p>
          </div>
          <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxmDwWhVfoMgtUHniqBnLwjEG64ZmpG3jgfG-r1FiKw&s" />
        </div>
      </div>

    </div>
  )
}

export default Signup
