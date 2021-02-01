import Head from 'next/head';
import PropTypes from 'prop-types';

import Sidebar from '@/components/layouts/sidebar/Sidebar';
import Header from '@/components/layouts/header/Header';

import styles from '@/styles/layouts/Default.module.scss';

const DefaultLayout = ({ children, title, name }) => (
  <>
    <Head>
      <title>
        {title}
        {' '}
        | Dashboard
      </title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header title={title} name={name} />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  </>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
};
DefaultLayout.defaultProps = { title: 'Bonjour', name: '' };

export default DefaultLayout;
