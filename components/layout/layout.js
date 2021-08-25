import Sidebar from "../../components/modules/sidebar/sidebar.js";
import Navbar from "../../components/modules/navbar/navbar.js";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const DynamicNavbar = dynamic(
  () => import("../../components/modules/navbar/navbar.js"),
  { ssr: false }
);

const Layout = ({ children }) => {
  const router = useRouter();
  const showLayout = router.pathname === "/" ? false : true;
  return (
    <>
      {showLayout && <DynamicNavbar />}
      {showLayout && <Sidebar />}
      {children}
    </>
  );
};

export default Layout;
