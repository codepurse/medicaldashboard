import "../styles/_globals.scss";
import "../styles/sidebar.scss";
import Layout from "../components/layout/layout";
import Header from "../components/header";
import 'bootstrap/dist/css/bootstrap.min.css';
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
