"use client";
import React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  useEmailVerificationMutation,
} from "@/app/service/dummyData";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyEmail = () => {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const password = params.get("password") || "";
  const confirmPassword = params.get("password") || "";
  const name = params.get("name") || "";
  const role ="User"
  const route = useRouter();
  const [EmailVerification, { data, isError, isLoading }] =
    useEmailVerificationMutation();

  const [code, setCode] = useState(["", "", "", ""]);
  const [error, seterror] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    setCode((prevCode) => {
      prevCode[index] = value;
      return [...prevCode];
    });
  };

  const [time, setTime] = useState(30);
  let interval: NodeJS.Timeout;

  const startCountdown = () => {
    if (time > 0) {
      interval = setTimeout(() => setTime(time - 1), 1000);
    } else {
      clearInterval(interval);
    }
  };

  email && startCountdown();

  const handleResend = async () => {
    try {
      const response = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          role,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setTime(30);
      }
    } catch (error) {
      console.error("Error");
    }
  };

  const handlesubmit = async () => {
    const otp = code.join("");
    console.log(otp);

    try {
      //   console.log(typeof email ,typeof otp , otp)
      const response = await EmailVerification({ email, otp });
      console.log(response, !response.error);

      if (!response.error) {
        seterror(false);
        console.log("successful!");
        route.refresh();
        route.push("/auth/LoginPage");
      } else {
        console.log("failed!");
        seterror(true);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="flex justify-center p-10">
      <div className="border w-[720px] h-[850px] px-40 py-28">
        <div className="flex flex-col w-[409px] h-[483px] gap-[45px]">
          <div className="font-black font-[Poppins] flex justify-center w-[409px] h-[38px] text-3xl">
            Verify Email
          </div>

          <div className="w-fit size-4 font-[Epilogue] h-[66px] text-[#7C8493]">
            We've sent a verification code to the email address you provided. To
            complete the verification process, please enter the code here.
          </div>

          <div className="w-[409px] h-289 flex flex-col gap-5">
            <form
              className="flex flex-col h-[114px] w-[409px] gap-5"
              onSubmit={(event) => {
                event.preventDefault();
                handlesubmit();
              }}
            >
              <div className="h-12 flex flex-row gap-9 w-[409px]">
                <input
                  type="text"
                  placeholder="0"
                  required={true}
                  onChange={(e) => handleInputChange(0, e.target.value)}
                  className="border-[#4640DE] bg-[#F8F8FD] border-opacity-40 w-[76px] h-[50px] text-4xl border-[2px] rounded-md text-center "
                />
                <input
                  type="text"
                  placeholder="0"
                  required={true}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="border-[#4640DE] border-opacity-40 w-[76px] h-[50px] border-[2px] text-4xl rounded-md bg-[#F8F8FD] text-center  "
                />
                <input
                  type="text"
                  placeholder="0"
                  required={true}
                  onChange={(e) => handleInputChange(2, e.target.value)}
                  className="border-[#4640DE] border-opacity-40 w-[76px] h-[50px] border-[2px] text-4xl rounded-md bg-[#F8F8FD] text-center "
                />
                <input
                  type="text"
                  placeholder="0"
                  required={true}
                  onChange={(e) => handleInputChange(3, e.target.value)}
                  className="border-[#4640DE] border-opacity-40 w-[76px] h-[50px] border-[2px] text-4xl rounded-md bg-[#F8F8FD] text-center "
                />
              </div>
              <div className="flex justify-center text-[#7C8493]">
                You can request to{" "}
                <Link
                href={""}
                  onClick={handleResend}
                  className="text-[#4640DE] font-medium ml-1 mr-1"
                >
                  Resend code
                </Link>{" "}
                in
              </div>

              <span className="flex justify-center text-[#4640DE] font-medium ml-1 -mt-5">
                {0}:{time < 10 ? `0${time}` : time}
              </span>
              {error && (
                <p
                  className="text-red-600 flex justify-center -mt-[1px] font-semibold gap-1
            "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  Invalid Code
                </p>
              )}
              <button className="bg-[#4640DE] justify-center w-full h-[50px] p-3 bg-opacity-30 rounded-full text-white ">
                Continue
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
