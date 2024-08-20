"use client";

import React, { useState } from "react";
import Main from "./Main";
import { useGetAllProductQuery } from "./service/dummyData";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";


const LandingPage = () => {
  const { data: session } = useSession();
  const { data, isError, isLoading } = useGetAllProductQuery({});

  if (isError) {
    return <h1 className="font-bold text-3xl"> Error O_O </h1>;
  }
  if (isLoading) {
    return <h1 className="font-bold text-3xl">Loading ... (❁´◡`❁)</h1>;
  }

  return (
    // pt-10 pl-20 pr-20 w-100
    <div className=" pt-[50px] gap-40">
      <div className="w-[919px] flex flex-col gap-6">
        <div className="flex flex-row w-[919px] h-[68px] justify-between">
          <div className="flex flex-col ">
            <h1 className="font-bold  font-[Poppins] text-4xl">
              Opportunities
            </h1>
            <p className="font-thin mb-10">
              Showing {data?.data.length} results
            </p>
          </div>

          <div className="flex items-center gap-2 ">
            {/* Filtering */}
            <div className="font-thin h-6 ">Sort by:</div>
            <select className="text-sm font-bold mr-3 ml-1">
              <option>Most Relevant</option>
            </select>
            {!session && (
              <Link
                href={"/SignPro"}
                className="text-[#4640DE] font-bold  rounded-lg p-2 bg-[#F8F8FD] hover:bg-sky-400 cursor-pointer"
              >
                Register
              </Link>
            )}
            {session ? (
              <Link
                href="/api/auth/signout?callbackUrl=/"
                className="text-[#4640DE] font-bold  rounded-lg p-2 bg-[#F8F8FD] hover:bg-sky-400"
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/auth/LoginPage"
                className="text-[#4640DE] font-bold  rounded-lg p-2 bg-[#F8F8FD] hover:bg-sky-400"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {data.data.map((data: any) => (
          <Link href={`/Joblist/${data.id}`} key={data.id}>
            <Main
              title={data.title}
              company={data.orgName}
              image={data.logoUrl}
              location={data.location}
              description={data.description}
              opType={data.opType}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
