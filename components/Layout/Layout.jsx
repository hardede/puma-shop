import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + " - Puma" : "Puma"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
