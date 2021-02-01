import PropTypes from 'prop-types';

import useAttributes from '@/hooks/useAttributes';

import styles from '@/styles/modules/Form.module.scss';

const HandleDeclinations = ({ input, setInput }) => {
  const { attributesData, isError, isLoading } = useAttributes(0);

  const handleCreateDeclination = (e) => {
    e.preventDefault();
    const declinations = input.declinations.slice();
    declinations.push({
      declinationId: '',
      values: [],
    });
    setInput({ ...input, declinations });
  };

  const handleDeleteDeclination = (e, i) => {
    e.preventDefault();
    const declinations = input.declinations.slice();
    declinations.splice(i, 1);
    setInput({ ...input, declinations });
  };

  const handleAddDeclinationId = (e, i) => {
    e.preventDefault();
    const declinations = input.declinations.slice();
    declinations[i].declinationId = e.target.value;
    setInput({ ...input, declinations });
  };

  const handleCreateDeclinationValue = (e, i) => {
    e.preventDefault();
    const declinations = input.declinations.slice();
    declinations[i].values.push({
      value: '',
      price: 0,
      weight: 0,
    });

    setInput({ ...input, declinations });
  };

  const handleAddDeclinationValue = (e, i, n) => {
    e.preventDefault();
    const declinations = input.declinations.slice();
    declinations[i].values[n].value = e.target.value;

    setInput({ ...input, declinations });
  };

  const handleAddDeclinationPrice = (e, i, n) => {
    e.preventDefault();
    const declinations = input.declinations.slice();
    declinations[i].values[n].price = e.target.value;

    setInput({ ...input, declinations });
  };

  const handleAddDeclinationWeight = (e, i, n) => {
    e.preventDefault();
    const declinations = input.declinations.slice();
    declinations[i].values[n].weight = e.target.value;

    setInput({ ...input, declinations });
  };

  const handleDeleteDeclinationValue = (e, i, n) => {
    e.preventDefault();
    const declinations = input.declinations.slice();
    declinations[i].values.splice(n, 1);
    setInput({ ...input, declinations });
  };

  if (isError) return <p>Une erreur s&apos;est produite...</p>;
  if (isLoading) return <p>Chargement...</p>;

  return (
    <fieldset className={styles.row}>
      <label className={styles.label}>Déclinaisons</label>
      {
              input.declinations.map((declination, i) => (
                <div key={declination.declinationId} className={`${styles.row_multiple} ${styles.field_multiple}`}>
                  <select className={styles.field} name="declinationId" id="declinationId" value={declination.declinationId} onChange={(e) => handleAddDeclinationId(e, i)}>
                    <option value="">Choisir une déclinaison...</option>
                    {
                      attributesData.attributes.map((el) => (
                        <option value={el._id} key={el._id}>{el.name}</option>
                      ))
                    }
                  </select>

                  <svg onClick={(e) => handleDeleteDeclination(e, i)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                  {
                    declination.declinationId !== ''
                      ? (
                        <div className={styles.row_declinations_values}>
                          <label className={`${styles.label_sub} ${styles.label_declinations_values}`}>Valeurs</label>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <th>Valeur</th>
                                <th>Prix (€)</th>
                                <th>Poid (g)</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                              declination.values.map((value, n) => (
                                <tr key={value.value}>
                                  <td>
                                    <select className={styles.field} name="" id="" value={value.value} onChange={(e) => handleAddDeclinationValue(e, i, n)}>
                                      <option value="">Choisir une valeur...</option>
                                      {
                                        attributesData.attributes[attributesData.attributes
                                          .findIndex((el) => el._id === declination.declinationId)]
                                          .values.map((el) => (
                                            <option value={el._id} key={el._id}>{el.value}</option>
                                          ))
                                      }
                                    </select>
                                  </td>
                                  <td>
                                    <input className={styles.field} type="number" name="" id="" min="0" step=".01" value={value.price} onChange={(e) => handleAddDeclinationPrice(e, i, n)} placeholder="Impact sur le prix..." />
                                  </td>
                                  <td>
                                    <input className={styles.field} type="number" name="" id="" min="0" value={value.weight} onChange={(e) => handleAddDeclinationWeight(e, i, n)} placeholder="Impact sur le poid..." />
                                  </td>
                                  <td>
                                    <svg onClick={(e) => handleDeleteDeclinationValue(e, i, n)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                                  </td>
                                </tr>
                              ))
                            }
                            </tbody>
                          </table>
                          <input className={styles.declination_add_value} onClick={(e) => handleCreateDeclinationValue(e, i)} type="button" value="Ajouter une valeur" />
                        </div>
                      )
                      : null
                  }
                </div>
              ))
            }

      <div className={styles.field_multiple}>
        <input className={`${styles.field} ${styles.field_submit}`} onClick={(e) => handleCreateDeclination(e)} type="button" value="Ajouter une déclinaison" />
      </div>
    </fieldset>
  );
};

HandleDeclinations.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  setInput: PropTypes.func.isRequired,
};

export default HandleDeclinations;
