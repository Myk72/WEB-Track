"use client";
import Link from "next/link";
import React, { FormEventHandler, useState } from "react";

import { useRegisterMutation } from "@/app/service/dummyData";
import { useRouter } from "next/navigation";


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role:string
}

const SignUp = () => {
  const [register, { data, isError, isLoading }] = useRegisterMutation();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"User"
    
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  if (isError) {
    return <h1 className="font-bold text-3xl"> Error O_O </h1>;
  }
  if (isLoading) {
    return <h1 className="font-bold text-3xl">Loading ... (❁´◡`❁)</h1>;
  }
  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((t) => ({
      ...t,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const {password,confirmPassword} =formData
    if (confirmPassword !== password){
      setPasswordMismatch(true)
    }
    else{
      try {
        const res = await register(formData);
        if (res.data.success)
          router.push(`/SignPro/VerifyPro?email=${encodeURIComponent(formData.email)}`)
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
            onSubmit={handleSubmit}
            method="post"
          >
            <label className="text-[#515B6F] font-semibold">Full Name</label>
            <input
              id="name"
              onChange={handleChange}
              required={true}
              type="text"
              placeholder="Enter your full name"
              name="name"
              className="border border-[#D6DDEB] rounded-lg h-[50px] py-[12px] px-[16px]"
            />

            <label className="text-[#515B6F] font-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              required={true}
              placeholder="Enter email address"
              name="email"
              value={formData.email}
              className="border border-[#D6DDEB] rounded-lg h-[50px] py-[12px] px-[16px]"
            />

            <label className="text-[#515B6F] font-semibold">Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              required={true}
              placeholder="Enter password"
              name="password"
              className="border border-[#D6DDEB] rounded-lg h-[50px] py-[12px] px-[16px]"
            />

            <label className="text-[#515B6F] font-semibold">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              onChange={handleChange}
              required={true}
              type="password"
              placeholder="Enter password"
              name="confirmPassword"
              className="border border-[#D6DDEB] rounded-lg h-[50px] py-[12px] px-[16px]"
            />
            {passwordMismatch && (
                <div className="text-red-600 mt-2 font-semibold">
                  Password Mismatch!
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
