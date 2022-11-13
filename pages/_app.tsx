import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { setupStore, wrapper } from "../store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const persistor = persistStore(setupStore());
  return (
    <PersistGate persistor={persistor} loading={<div>Loading</div>}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
