import PropTypes from 'prop-types';

import styles from '@/styles/modules/Form.module.scss';

const DisplayImage = ({ input }) => (
  input.image
    ? (
      <img
        className={styles.image}
        src={process.env.NEXT_PUBLIC_API_URL + input.image}
        alt={input.name}
      />
    )
    : null
);

DisplayImage.propTypes = { input: PropTypes.objectOf(PropTypes.any).isRequired };

export default DisplayImage;
