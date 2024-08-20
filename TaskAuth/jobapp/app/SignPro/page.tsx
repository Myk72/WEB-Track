"use client"
import React from "react";
import { store } from "../Joblist/store";
import { Provider } from "react-redux";
import SignUp from "../auth/SignUp/page";


const SignPro = () => {
  return (
    <Provider store={store}>
      <div>
        <SignUp />
      </div>
    </Provider>
  );
};

export default SignPro;
