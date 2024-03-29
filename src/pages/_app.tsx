import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '@/config/chakra.config';
import dynamic from 'next/dynamic';
import Layout from 'src/components/HOC/Layout.HOC';
import ProtectedRoute from 'src/components/ProtectedRoutes';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider: any = dynamic(
  () => import('../context/WalletConnectionProvider'),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <WalletConnectionProvider>
      <ChakraProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <ProtectedRoute router={router}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectedRoute>
        </ColorModeProvider>
      </ChakraProvider>
    </WalletConnectionProvider>
  );
}

export default MyApp;
