import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { wrapper } from "../store/store";
import "../styles/globals.css";

// export interface CustomAppProps extends AppProps {
//   pageProps: { auth?: boolean; session?: Session };
// }

function MyApp({
  Component,
  pageProps: { auth, session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth adminOnly={Component.auth.adminOnly}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

function Auth({ children, adminOnly }: any) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/authorization?message=login required");
    },
  });
  if (status === "loading") {
    return (
      <div className="block border-4 border-red-500 rounded-full border-dashed w-28 h-28 mx-auto mt-20 text-center pt-10 text-red-500 animate-rotateLoader">
        Loading...
      </div>
    );
  }

  if (adminOnly && !session.user?.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
};

export default wrapper.withRedux(MyApp);
