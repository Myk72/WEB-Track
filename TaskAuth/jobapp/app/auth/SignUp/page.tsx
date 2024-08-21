"use client";
import Link from "next/link";
import React, { FormEventHandler, useState } from "react";

import { useRegisterMutation } from "@/app/service/dummyData";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Email from "next-auth/providers/email";


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role:string
}

const SignUp = () => {
  const [Register, { data, isError, isLoading }] = useRegisterMutation();
  const router = useRouter();
  const form = useForm<FormData>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  if (isError) {
    return <h1 className="flex justify-center font-bold text-3xl"> Error O_O </h1>;
  }
  if (isLoading) {
    return <h1 className="flex justify-center font-bold text-3xl">Loading ... (❁´◡`❁)</h1>;
  }
  

  const onSubmit = async (data:FormData) => {
    
    const {password,confirmPassword} =data
    
    if (confirmPassword !== password){
      setPasswordMismatch(true)
    }
    else{
      setPasswordMismatch(false)
      try {
        const res = await Register(data);
        if (res.data.success)
          router.push(`/SignPro/VerifyPro?email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.name)}&password=${encodeURIComponent(data.password)}`)
      } catch (error) {
        console.error("Error");
      }
  }};

  return (
    <div className="flex justify-center ">
      <div className="w-[408px] h-full pt-[34px] flex flex-col gap-6 ">
        <div className="flex flex-col gap-6 w-[408px]">
          <div className="flex justify-center font-black text-3xl">
            Sign Up Today!
          </div>
          <Link
            href="/api/auth/signin"
            className="border-[2px] rounded-md flex flex-row justify-center items-center
           gap-2 h-12"
          >
            <img src="/IcongoogleIcon.svg" />
            <div className="text-[#4640DE]">Sign Up with Google</div>
          </Link>

          <div className="flex flex-row items-center  gap-4">
            <span className=" bg-[#D6DDEB]  h-0.5 w-[109px]"></span>
            <div
              className="text-[
#202430]  font-thin w-[190px] "
            >
              Or Sign Up with Email
            </div>
            <span className=" bg-[#D6DDEB]  h-0.5 w-[109px]"></span>
          </div>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >
            <label className="text-[#515B6F] font-semibold">Full Name</label>
            <input
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Full Name is required",
                },
              })}
              type="text"
              placeholder="Enter your full name"
              name="name"
              className="border border-[#D6DDEB] rounded-lg h-[50px] py-[12px] px-[16px]"
            />

            <p className="text-red-600 flex -mt-[1px] font-semibold gap-1
            ">{errors.name &&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            }{errors.name?.message} </p>

            <label className="text-[#515B6F] font-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email",
                },
              })}
              name="email"
              className="border border-[#D6DDEB] rounded-lg h-[50px] py-[12px] px-[16px]"
            />
            <p className="text-red-600 flex -mt-[1px] font-semibold gap-1
            ">{errors.email &&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            }{errors.email?.message}</p>

            <label className="text-[#515B6F] font-semibold">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Enter password"
              name="password"
              className="border border-[#D6DDEB] rounded-lg h-[50px] py-[12px] px-[16px]"
            />
            <p className="text-red-600 flex -mt-[1px] font-semibold gap-1
            ">{ errors.password &&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            }{errors.password?.message}</p>
            <label className="text-[#515B6F] font-semibold">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm Password is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}

              type="password"
              placeholder="Enter password"
              onChange={(e) => setPasswordMismatch(false)}
              name="confirmPassword"
              className="border border-[#D6DDEB] rounded-lg h-[50px] py-[12px] px-[16px]"
            />
            <p className="text-red-600 flex -mt-[1px] font-semibold gap-1
            ">{ errors.confirmPassword &&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            }{errors.confirmPassword?.message}</p>
            {!errors.confirmPassword && passwordMismatch && (
                <div className="text-red-600 flex -mt-[1px] font-semibold gap-1
                ">{<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                }
                  Password does not match
                </div>
              )}
            <button className="bg-[#4640DE] justify-center w-full h-[50px] p-3 mt-4  rounded-full text-white ">
              Continue
            </button>
          </form>


          <div>
            Already have an account?{" "}
            <a href="/auth/LoginPage" className="text-[#4640DE] font-bold">
              Login
            </a>
          </div>
          <div>
            By clicking 'Continue', you acknowledge that you have read and
            accepted our{" "}
            <a href="" className="text-[#4640DE]">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="" className="text-[#4640DE]">
              Privacy Policy
            </a>{" "}
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
