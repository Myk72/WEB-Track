import React from "react";
import SignUp from "../../SignPro/page";
import { store } from "@/app/Joblist/store";
import { Provider } from "react-redux";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex justify-center p-10">
      <div className="flex flex-col  mt-10  w-[408px] h-[340px] gap-6">
        <div className="flex justify-center ">
          <div className="font-black size-[32px] w-[261px] flex justify-center">
            WELCOME BACK,
          </div>
        </div>
        <div className=" flex justify-between">
          <span className=" bg-[#D6DDEB]  h-[1px] w-[108px]"></span>
          <span className=" bg-[#D6DDEB]  h-[1px] w-[108px]"></span>
        </div>
        <form className="flex flex-col gap-[22px] h-[254px]">
          <div className="flex flex-col">
            <label className="font-[Epilogue] font-semibold text-sm mb-1">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter email address"
              className="border rounded-md h-[40px] p-3 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-[Epilogue] font-semibold text-sm mb-1">
              Password
            </label>
            <input
              type="text"
              placeholder="Enter password"
              name="password"
              className="border rounded-md h-[40px] p-3 text-sm"
            />
          </div>

          <button className="border rounded-full bg-[#4640DE] text-white justify-center h-[50px]">
            Login
          </button>
          <div>
            Don't have account?{" "}
            <Link
              href={"/SignPro"}
              className="text-[#4640DE] font-semibold ml-1"
            >
              {" "}
              Sign Up{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
