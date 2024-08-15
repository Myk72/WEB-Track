"use client";
import React from "react";

import { useParams } from "next/navigation";

import { useGetAllProductByIdQuery } from "../service/dummyData";
import { Provider } from "react-redux";
import { store } from "../store";
import DashBoard from "../components/DashBoard";

const App = () => {
  const params = useParams();
  const id = params.id;
  
  

  return (
    <Provider store={store}>
      <div className="flex justify-center pt-9 ">
        <div>
            <DashBoard id={id}
            />
        </div>
      </div>
  </Provider>
  );
};

export default App;
