"use client";
import React from "react";

import { useState } from "react";
import Link from "next/link";
import { useEmailVerificationMutation } from "@/app/service/dummyData";
import { useRouter } from "next/navigation";

const VerifyEmail = ({ email }: { email: string | string[] }) => {
  const route = useRouter();
  const [EmailVerification, { data, isError, isLoading }] =
    useEmailVerificationMutation();

  const [code, setCode] = useState(["", "", "", ""]);
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

  const handlesubmit = async () => {
    const verificationCode = code.join("");
    console.log(verificationCode)

    try {
      console.log(typeof email ,typeof verificationCode , verificationCode)
      const response = await EmailVerification({ email: email, verificationCode });
      console.log(response,!response.error)
      
      if (!response.error) {
        console.log("successful!");
        // route.refresh()
        route.push("/auth/LoginPage");
      } else {
        console.log("failed!");
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
                <Link href="" className="text-[#4640DE] font-medium ml-1 mr-1">
                  Resend code
                </Link>{" "}
                in
              </div>

              <span className="flex justify-center text-[#4640DE] font-medium ml-1 -mt-5">
                {0}:{time < 10 ? `0${time}` : time}
              </span>

              <button className="bg-[#4640DE] justify-center w-full h-[50px] p-3 bg-opacity-30 rounded-full text-white ">
                Continue {email}
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
