import PropTypes from 'prop-types';

import useDetails from '@/hooks/useDetails';

import styles from '@/styles/modules/Form.module.scss';

const HandleDetails = ({ input, setInput }) => {
  const { detailsData, isError, isLoading } = useDetails(0);

  const handleCreateDetail = (e) => {
    e.preventDefault();
    const details = input.details.slice();
    details.push({
      detailId: '',
      detailValue: '',
    });
    setInput({ ...input, details });
  };

  const handleAddDetailId = (e, i) => {
    e.preventDefault();
    const details = input.details.slice();
    details[i].detailId = e.target.value;
    setInput({ ...input, details });
  };

  const handleAddDetailValue = (e, i) => {
    e.preventDefault();
    const details = input.details.slice();
    details[i].detailValue = e.target.value;
    setInput({ ...input, details });
  };

  const handleDeleteDetail = (e, i) => {
    e.preventDefault();
    const details = input.details.slice();
    details.splice(i, 1);
    setInput({ ...input, details });
  };

  if (isError) return <p>Une erreur s&apos;est produite...</p>;
  if (isLoading) return <p>Chargement...</p>;

  return (
    <fieldset className={styles.row}>
      <label className={styles.label}>Détails</label>
      {
              input.details.map((detail, i) => (
                <div key={detail.detailId} className={`${styles.row_details} ${styles.field_multiple}`}>
                  <select className={styles.field} name="detailId" id="detailId" value={detail.detailId} onChange={(e) => handleAddDetailId(e, i)}>
                    <option value="">Choisir un détail...</option>
                    {
                      detailsData.details.map((el) => (
                        <option value={el._id} key={el._id}>{el.name}</option>
                      ))
                    }
                  </select>

                  <select className={styles.field} name="detailValue" id="detailValue" value={detail.detailValue} onChange={(e) => handleAddDetailValue(e, i)}>
                    <option value="">Choisir une valeur...</option>
                    {
                      detail.detailId !== ''
                        ? detailsData.details[detailsData.details
                          .findIndex((el) => el._id === detail.detailId)]
                          .values.map((el) => (
                            <option value={el._id} key={el._id}>{el.value}</option>
                          ))
                        : null
                    }
                  </select>

                  <svg onClick={(e) => handleDeleteDetail(e, i)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                </div>
              ))
            }

      <div className={styles.field_multiple}>
        <input className={`${styles.field} ${styles.field_submit}`} onClick={(e) => handleCreateDetail(e)} type="button" value="Ajouter un détail" />
      </div>
    </fieldset>
  );
};

HandleDetails.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  setInput: PropTypes.func.isRequired,
};

export default HandleDetails;
