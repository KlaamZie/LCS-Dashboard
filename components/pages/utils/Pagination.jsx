import styles from '@/styles/modules/ItemsTable.module.scss';

import PropTypes from 'prop-types';

const Pagination = ({ page, setPage, data }) => {
  const prevPage = async () => {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  };

  const nextPage = () => {
    if (page < Math.ceil(data.number / data.limit)) {
      setPage((p) => p + 1);
    }
  };

  return (
    <aside className={styles.paginate}>
      <button type="button" onClick={prevPage}>
        {'< '}
        Précédent
      </button>
      <p>
        Page :
        {' '}
        {page}
        {' '}
        /
        {' '}
        {Math.ceil(data.number / data.limit) !== 0 ? Math.ceil(data.number / data.limit) : 1}
      </p>
      <button type="button" onClick={nextPage}>
        Suivant
        {' >'}
      </button>
    </aside>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Pagination;
