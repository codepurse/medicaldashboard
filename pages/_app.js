import "../styles/_globals.scss";
import "../styles/sidebar.scss";
import Layout from "../components/layout/layout";
import MessageService from "../services/api/api.message";
import NextNprogress from "nextjs-progressbar";
import Header from "../components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Snack from "../components/elements/snackbar";
import Modal from "../components/modal/unsaved";
import { useBussinessStore} from "../store/store";
import useSWR, { mutate } from "swr";
import { useEffect } from "react";
const fetcher = (url) =>
  MessageService.getAllBusiness(1).then((response) => response.data);
function MyApp({ Component, pageProps }) {
  const { data, error } = useSWR("AllBusiness", fetcher);
  const setBuss = useBussinessStore((state) => state.addBusiness);

  useEffect(() => {
   if (data) {
     setBuss(data);
   }
  }, [data])
  return (
    <Layout>
      <Header />
      <Snack />
      <Modal />
      <NextNprogress color="#29D" height={3} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
