import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Contact() {
  return (


<div className="flex flex-wrap">
  <div className="flex w-full flex-col md:w-1/2">
  
    <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
      <a href="#" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900">  </a>
    </div>
    <div className="flex mt-12">
      <a href="/" className=" m-3 pb-2  mb-3 btn btn-primary rounded-2xl border  text-red-500 border-red-500 hover:text-gray-100 hover:bg-red-500 ">Back Home  </a>
    </div>
    <div>
      <div className="flex min-h-screen items-center justify-start bg-white">
  <div className="mx-auto w-full max-w-sm p-5">
    <h1 className="text-4xl font-medium">Contact us</h1>
    <p className="mt-3 flex flex-wrap">Email us at abhijeetkokat2003@gmail.com or message us here:</p>

    <form  action="https://formspree.io/f/mjvnrkdg"
  method="POST" className="mt-10 p-5">
    
   

      <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> 
      <div className="grid gap-7 sm:grid-cols-2 p-5">
        <div className="relative z-0">
          <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your name</label>
        </div>
        <div className="relative z-0">
          <input type="text" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your email</label>
        </div>
        <div className="relative z-0 col-span-2">
          <textarea name="message" rows="5" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your message</label>
        </div>
      </div>
      <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Send Message</button>
    </form>
  </div>
</div>
    </div>
  </div>
  <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
    <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
      <p className="mb-8 text-3xl font-semibold leading-10"></p>
      <p className="mb-4 text-3xl font-semibold"> </p>
      <p className=""> </p>
      <p className="mb-7 text-sm opacity-70"> </p>
    </div>
    <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://tse2.explicit.bing.net/th?id=OIP.1lcKJNVsed6ous8NcfJqiQHaEo&pid=Api&P=0&h=180" />
  </div>
</div>
  )
}

export default Contact
