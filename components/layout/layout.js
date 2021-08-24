import Sidebar from "../../components/modules/sidebar/sidebar.js";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const showSidebar = router.pathname === "/" ? false : true;
  return (
    <div>
      {showSidebar && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
