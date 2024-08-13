"use client";
import React from "react";
import Main from "../../Main";
import data from "../jobs.json";
import DashBoard from "./DashBoard";
import { useParams } from "next/navigation";
// import DashBoard from "./DashBoard";

const App = () => {
  const details = data.job_postings;
  const params = useParams();
  const idx = parseInt(params.Dash as string);
  // console.log(idx);
  // console.log(params);

  return (
    <div className="flex justify-center pt-9 ">
      <div>
        <DashBoard
          description={details[idx].description}
          responsibilities={details[idx].responsibilities}
          age={details[idx].ideal_candidate.age}
          gender={details[idx].ideal_candidate.gender}
          traits={details[idx].ideal_candidate.traits}
          location={details[idx].about.location}
          posted_on={details[idx].about.posted_on}
          deadline={details[idx].about.deadline}
          end_date={details[idx].about.end_date}
          start_date={details[idx].about.start_date}
          categories={details[idx].about.categories}
          required_skills={details[idx].about.required_skills}
          when_where={details[idx].when_where}

          //   categories: [""];
          //   required_skills: [""];
          // }
        />
      </div>
    </div>
  );
};

export default App;
