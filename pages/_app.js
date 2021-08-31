import "../styles/_globals.scss";
import "../styles/sidebar.scss";
import Layout from "../components/layout/layout";
import NextNprogress from "nextjs-progressbar";
import Header from "../components/header";
import "bootstrap/dist/css/bootstrap.min.css";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Header />
      <NextNprogress color="#29D" height={3} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
