"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
interface FormData {
  email: string;
  password: string;
}
const LoginPage = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  const [error, setError] = useState("");

  const onSubmit = async (form: FormData) => {
    console.log(form);
    const response = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/",
    });

    console.log(response);
    if (response?.ok) {
      setError("");
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center p-10">
      <div className="flex flex-col  mt-10  w-[408px] h-[360px] gap-6">
        <div className="flex justify-center ">
          <div className="font-black size-[32px] w-[261px] flex justify-center">
            WELCOME BACK,
          </div>
        </div>
        <div className=" flex justify-between">
          <span className=" bg-[#D6DDEB]  h-[1px] w-[108px]"></span>
          <span className=" bg-[#D6DDEB]  h-[1px] w-[108px]"></span>
        </div>
        <form
          className="flex flex-col gap-5 h-[254px]"
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => setError("")}
        >
          <div className="flex flex-col">
            <label className="font-[Epilogue] font-semibold text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
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
              placeholder="Enter email address"
              name="email"
              className="border rounded-md h-[40px] p-3 text-sm"
            />
            <p
              className="text-red-600 flex mt-1 font-semibold gap-1">
              {errors.email && (
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
              )}
              {errors.email?.message}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="font-[Epilogue] font-semibold text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
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
              autoComplete="off"
              className="border rounded-md h-[40px] p-3 text-sm"
            />
            <p
              className="text-red-600 flex mt-1 font-semibold gap-1
            "
            >
              {errors.password && (
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
              )}
              {errors.password?.message}
            </p>
            {!errors.email && error && (
              <div className="text-red-600 flex -mb-3 font-semibold gap-1">
                {error}
              </div>
            )}
          </div>
          <button className="border rounded-full  bg-[#4640DE] text-white justify-center h-[50px] p-2">
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
