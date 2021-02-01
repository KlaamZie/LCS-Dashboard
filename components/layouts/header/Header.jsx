import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import styles from '@/styles/layouts/header/Header.module.scss';

const Header = ({ title, name }) => {
  const router = useRouter();

  return (
    <header className={styles.container}>
      {
        router.pathname === '/' ? (
          <h1 className={styles.title}>
            Bonjour,
            {' '}
            { name }
          </h1>
        ) : (
          <h1 className={styles.title}>{title}</h1>
        )
      }
      <a
        className={styles.nav}
        href="/api/logout"
      >
        Déconnexion
      </a>
    </header>
  );
};

Header.propTypes = { title: PropTypes.string, name: PropTypes.string };
Header.defaultProps = { title: 'Chargement...', name: '' };

export default Header;
