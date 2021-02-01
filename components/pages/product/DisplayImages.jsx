import PropTypes from 'prop-types';

import styles from '@/styles/modules/Form.module.scss';

const DisplayImages = ({ input, setInput }) => {
  const handleDelete = (e, url) => {
    e.preventDefault();
    const images = input.images.slice();
    const index = images.findIndex((el) => el.imageUrl === url);
    images.splice(index, 1);
    setInput({ ...input, images });
  };

  const moveImage = (e, fromIndex, toIndex) => {
    e.preventDefault();
    const images = input.images.slice();
    const element = images[fromIndex];
    images.splice(fromIndex, 1);
    images.splice(toIndex, 0, element);
    setInput({ ...input, images });
  };

  return (
    input.images
      ? input.images.map((img, i) => (
        <div
          className={styles.image_container}
          key={img.imageUrl}
        >
          <div>
            <img
              className={styles.image}
              src={process.env.NEXT_PUBLIC_API_URL + img.imageUrl}
              alt={input.name}
            />
          </div>
          <aside className={styles.image_nav}>
            <svg onClick={(e) => moveImage(e, i, i === 0 ? input.images.length - 1 : i - 1)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>

            <input className={styles.image_delete} onClick={(e) => handleDelete(e, img.imageUrl)} type="button" value="Supprimer" />

            <svg onClick={(e) => moveImage(e, i, i === input.images.length - 1 ? 0 : i + 1)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
          </aside>
        </div>
      ))
      : null
  );
};

DisplayImages.propTypes = { input: PropTypes.objectOf(PropTypes.any).isRequired };

export default DisplayImages;
