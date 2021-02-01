import Link from 'next/link';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import styles from '@/styles/layouts/sidebar/SidebarLink.module.scss';

const SidebarLink = ({ route, name, children }) => {
  const router = useRouter();

  return (
    <li className={`${router.pathname === route ? styles.active : ''} ${styles.link}`}>
      <Link href={route}>
        <a>
          { children }
          {name}
        </a>
      </Link>
    </li>
  );
};

SidebarLink.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SidebarLink;
