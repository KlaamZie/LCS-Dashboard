/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import '@/styles/main.scss';
import '@/styles/theme.scss';

function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default App;
