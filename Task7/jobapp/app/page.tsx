"use client";

import { Provider } from "react-redux";
import { store } from "./Joblist/store";
import LandingPage from "./LandingPage";

export default function Home() {
  return (
    // <StrictMode>
    <Provider store={store}>
      <main className="flex justify-center align-middle">
        {/* <App /> */}
        <LandingPage />
      </main>
    </Provider>
    // </StrictMode>,
  );
}
