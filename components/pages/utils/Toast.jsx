import PropTypes from 'prop-types';

import styles from '@/styles/modules/Toast.module.scss';

const Toast = ({ message, display, setDisplay }) => (
  display
    ? (
      <div className={styles.container} onClick={() => setDisplay(false)}>
        <p>{message}</p>
        {/* <input className={styles.button} type="button" value="Annuler" /> */}
      </div>
    )
    : null
);

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired,
  setDisplay: PropTypes.func.isRequired,
};

export default Toast;
