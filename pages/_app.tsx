import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import { useState } from "react";
import { NextPageWithLayout } from './page';
import ModalProgress from '../components/utility/modalProgress';
import PageContext from '../contexts/pageContext';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}	

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const [loading, setLoading] = useState(false);
  const loadingCtxVal = { loading, setLoading };

  return (
    <>
      {getLayout(
        <PageContext.Provider value={ loadingCtxVal } >
          <Component {...pageProps} />
          <ModalProgress open={loading}  msg={'Syncing...'} />
        </PageContext.Provider>
      )}
    </>
  );
}

export default MyApp;
	