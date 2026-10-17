import { Outlet,useLocation } from "react-router";
import Header from "./Header/Header";


export default function MainLayout(){

     const { pathname } = useLocation();

     const isAuthPage =
     pathname === "/login" || pathname === "/register";

    return(
        <div className="block w-full">
      {!isAuthPage && <Header />}

      <main>
        <Outlet />
      </main>
    </div>
    )
}