import { useRef } from 'react';
import auth0 from '@/lib/auth0';

import Layout from '@/components/layouts/default';
import PropTypes from 'prop-types';
import axios from 'axios';

import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';

import Toast from '@/components/pages/utils/Toast';

import styles from '@/styles/modules/Form.module.scss';

export default function EditAttribute({ data, id }) {
  const newValue = useRef(null);
  const [input, handleInputChange, setInput] = useForm(data);
  const [message, setMessage, display, setDisplay] = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Attribut modifié !');
    setDisplay(true);

    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/declination?id=${id}`, input);

    setTimeout(() => {
      setDisplay(false);
    }, 3000);
  };

  const handleValueChange = (i, e) => {
    e.preventDefault();
    const newValues = [...input.values];
    newValues[i].value = e.target.value;
    setInput({
      ...input, values: newValues,
    });
  };

  const handleAddValue = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/declination/value?id=${id}`, { value: newValue.current.value })
      .then((res) => {
        const value = res.data.declination.values.slice(-1);
        setInput({
          ...input, values: [...input.values, value[0]],
        });
      })
      .then(() => {
        newValue.current.value = '';
      });
  };

  const handleDeleteValue = async (e, valueId) => {
    e.preventDefault();
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/declination/value?id=${id}`, { data: { valueId } })
      .then(() => {
        const index = input.values.findIndex((el) => el._id === valueId);
        const newValues = [...input.values];
        newValues.splice(index, 1);
        setInput({
          ...input, values: newValues,
        });
      });
  };

  return (
    <Layout title="Editer un attribut">
      <form className={styles.container_fluid} onSubmit={(e) => handleSubmit(e)}>

        <fieldset className={styles.row}>
          <label htmlFor="name" className={styles.label}>Nom</label>
          <input className={`${styles.field} ${styles.field_name}`} type="text" name="name" id="name" onChange={handleInputChange} value={input.name} placeholder="Nom de l'attribut..." />
        </fieldset>

        <fieldset className={styles.row}>
          <label className={styles.label}>Valeurs</label>
          {
            input.values
              .map((el, i) => (
                <div key={el._id} className={`${styles.field_multiple} ${styles.row_multiple}`}>
                  <input className={styles.field} type="text" onChange={(e) => handleValueChange(i, e)} value={input.values[i].value} placeholder="Nom de la valeur..." />
                  <svg onClick={(e) => handleDeleteValue(e, el._id)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                </div>
              ))
                  }

          <div className={`${styles.row_multiple} ${styles.field_multiple}`}>
            <input className={styles.field} type="text" ref={newValue} placeholder="Ajouter une valeur..." />
            <input className={`${styles.field} ${styles.field_submit}`} type="button" value="Ajouter" onClick={(e) => handleAddValue(e)} />
          </div>
        </fieldset>

        <fieldset className={`${styles.row_submit} ${styles.row}`}>
          <input className={`${styles.field_submit} ${styles.field}`} type="submit" value="Enregistrer" />
        </fieldset>

        <Toast message={message} display={display} setDisplay={setDisplay} />
      </form>
    </Layout>
  );
}

EditAttribute.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);

  if (!session) {
    return {
      redirect: {
        destination: '/api/login',
        permanent: false,
      },
    };
  }

  const { id } = context.query;
  // Fetch data from external API
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/declination?id=${id}`);

  // Pass data to the page via props
  return { props: { data: data.declination, id } };
}
