import React from "react";
import data from "./Joblist/jobs.json";

interface Job {
  title: string;
  description: string;
  company: string;
  image: string;
  location: string;
}
const Main: React.FC<Job> = ({
  title,
  description,
  company,
  image,
  location,
}) => {
  const details = data.job_postings;
  const Job = data.job_postings;

  return (
    <div className="border rounded-3xl w-[919px] ">
      {/* Job List */}
      <div className="flex flex-row  px-7 py-5">
        <img className="w-10 h-10 mr-5" src={image} />
        <div>
          <p className="font-semibold">{title}</p>
          <div className="flex flex-row mt-2 mb-2">
            {/* // company detail */}
            <p className="font-light text-sm">{company}</p>
            <span className="w-1 h-1 rounded-full bg-gray-500 inline-block mx-1.5 align-middle mt-2"></span>

            <p className=" font-light text-sm">{location}</p>
          </div>
          <p className="text-sm mb-2 w-[650px]">{description}</p>
          <div className="flex flex-row mt-5">
            <div className="font-semibold  bg-[#56CDAD1A]  rounded-full px-3 py-1 text-[#56CDAD] mr-3 text-xs">
              In Person
            </div>

            <div className="w-0.5 h-31 bg-[#D6DDEB] mr-3" />

            <div className="border border-[#FFB836] rounded-full px-3 py-1 text-[#FFB836] font-semibold mr-3 text-xs">
              Education
            </div>
            <div className=" font-semibold border border-[#4640DE] rounded-full px-6 py-1 text-[#4640DE] text-xs">
              IT
            </div>
          </div>
        </div>
        <button>
          <p></p>
        </button>
      </div>
    </div>
  );
};

export default Main;
