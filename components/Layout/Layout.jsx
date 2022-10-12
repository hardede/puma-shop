import Head from "next/head";
import React from "react";
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
      <div className="flex min-h-screen flex-col justify-between">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
