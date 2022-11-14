import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
