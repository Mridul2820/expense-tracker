import { Toaster } from "react-hot-toast";
import "@appwrite.io/pink";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />
    </div>
  );
}
