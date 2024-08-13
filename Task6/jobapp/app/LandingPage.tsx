import React from "react";
import Main from "./Main";
import data from "./Joblist/jobs.json";

import Link from "next/link";

const LandingPage = () => {
  const details = data.job_postings;

  return (
    // pt-10 pl-20 pr-20 w-100
    <div className=" pt-[50px] gap-40">
      <div className="w-[919px] flex flex-col gap-6">
        <div className="flex flex-row w-[919px] h-[68px] justify-between">
          <div className="flex flex-col ">
            <h1 className="font-bold  font-[Poppins] text-4xl">
              Opportunities
            </h1>
            <p className="font-thin mb-10">Showing {details.length} results</p>
          </div>

          <div className="flex items-center ">
            {/* Filtering */}
            <div className="font-thin ">Sort by:</div>
            <select className="text-sm h-6 font-bold mr-3 ml-1">
              <option>Most Relevant</option>
            </select>
          </div>
        </div>

        {details.map((job, index) => (
          <Link href={`/Joblist/${index}`} key={index}>
            <Main
              title={job.title}
              company={job.company}
              image={job.image}
              location={job.about.location}
              description={job.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
