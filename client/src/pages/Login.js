import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import './Login.css'

function Login() {
    const [_, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      
      event.preventDefault();
      try {
        const result = await axios.post("https://culinashare.onrender.com/auth/login", {
          username,
          password,
        });
        alert (result?.data?.message)
        
        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userID);
        if (result?.data?.success) {
          localStorage.setItem('recipes-app-data', JSON.stringify(result?.data?.data));

          window.location.href = "/";
        }

        // alert("login Successfully !")
        // navigate("/");
      } catch (error) {
        console.error(error.message);
      }
    };
  return (
    <div className="flex flex-wrap">
  <div className="flex w-full flex-col md:w-1/2">
  <div className="flex ">
      <a href="/" className=" m-3 pb-2  mb-3 btn btn-primary rounded-2xl border  text-red-500 border-red-500 hover:text-gray-100 hover:bg-red-500 ">Back Home  </a>
    </div>
    <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
      <a href="#" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900">  </a>
    </div>
    <div className="lg:w-[28rem] sign-res mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
    <p className="text-left text-3xl font-bold">Welcome Back, RECIPE<span className='text-red-600'>NINJA</span></p>
      <p className="mt-2 text-left text-gray-500">Welcome back, please enter your details.</p>
      <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"><img className="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt /> Log in with Google</button>
      <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
        <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
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
            <input type="password" id="login-password" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2">Log in</button>
      </form>
      <div className="py-12 text-center">
        <p className="whitespace-nowrap text-gray-600">
          Don't have an account?
          <a href="/signup" className="underline-offset-4 font-semibold text-gray-900 underline">Sign up for free.</a>
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

  )
}

export default Login
