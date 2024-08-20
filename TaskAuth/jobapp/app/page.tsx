"use client";

import { Provider } from "react-redux";
import { store } from "./Joblist/store";
import LandingPage from "./LandingPage";
import LoginPage from "./auth/LoginPage/page";
import SignUp from "./SignPro/page";
import SignPro from "./SignPro/page";

export default function Home() {
  return (
    // <StrictMode>
    <Provider store={store}>
      <main className="flex justify-center align-middle">
        {/* <App /> */}
        <LandingPage />
        {/* <LoginPage/> */}
        {/* <SignUp /> */}
        {/* <SignPro/> */}
      </main>
    </Provider>
    // </StrictMode>,
  );
}
