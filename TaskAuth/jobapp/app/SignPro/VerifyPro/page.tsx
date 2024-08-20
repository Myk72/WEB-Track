"use client";
import React from "react";
import VerifyEmail from "../../auth/Verification/page";

import { Provider } from "react-redux";
import { store } from "../../Joblist/store";

import { useSearchParams } from "next/navigation";

const VerifyPro = () => {
  const params = useSearchParams()
  const email = params.get('email') || ""
  

  return (
    <Provider store={store}>
      <div>
        <VerifyEmail email={email} />
      </div>
    </Provider>
  );
};

export default VerifyPro;
