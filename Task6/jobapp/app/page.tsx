import Image from "next/image";
import Main from "./Main";
import LandingPage from "./LandingPage";
import App from "./Joblist/[Dash]/page";
// import DashBoard from "./Joblist/DashBoard";

export default function Home() {
  return (
    <main className="flex justify-center align-middle">
      {/* <App /> */}
      <LandingPage />
    </main>
  );
}
