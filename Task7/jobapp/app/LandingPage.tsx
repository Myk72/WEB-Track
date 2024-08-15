import React from "react";
import Main from "./Main";
import { useGetAllProductQuery } from "./Joblist/service/dummyData";
import Link from "next/link";

const LandingPage = () => {
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

          <div className="flex items-center ">
            {/* Filtering */}
            <div className="font-thin h-6 ">Sort by:</div>
            <select className="text-sm font-bold mr-3 ml-1">
              <option>Most Relevant</option>
            </select>
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
