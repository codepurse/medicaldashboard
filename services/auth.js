import { useRouter } from "next/router";
import Cookies from "js-cookie";
const withAuth = (WrappedComponent) => {
  return (props) => {
    if (process.browser) {
      const Router = useRouter();
      const accessToken = Cookies.get("token");
      if (Router.pathname !== "/") {
        if (!accessToken) {
          Router.replace("/");
          return null;
        } else {
          return <WrappedComponent {...props} />;
        }
      } else if (Router.pathname == "/") {
        if (accessToken) {
          Router.replace("/dashboard");
          return null;
        } else {
          return <WrappedComponent {...props} />;
        }
      }
      return <WrappedComponent {...props} />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
