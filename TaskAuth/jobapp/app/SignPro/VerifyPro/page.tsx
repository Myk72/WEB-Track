"use client";
import React from "react";
import VerifyEmail from "../../auth/Verification/page";

import { Provider } from "react-redux";
import { store } from "../../Joblist/store";


const VerifyPro = () => {
  
  
  return (
    <Provider store={store}>
      <div>
        <VerifyEmail />
      </div>
    </Provider>
  );
};

export default VerifyPro;
