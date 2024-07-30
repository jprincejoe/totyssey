import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
