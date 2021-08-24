import Sidebar from "../../components/modules/sidebar/sidebar.js";
import Navbar from "../../components/modules/navbar/navbar.js";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const showLayout = router.pathname === "/" ? false : true;
  return (
    <>
      {showLayout && <Navbar/>}
      {showLayout && <Sidebar />}
      {children}
    </>
  );
};

export default Layout;
