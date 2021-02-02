import Layout from '@/components/layouts/default';
import PropTypes from 'prop-types';
import auth0 from '@/lib/auth0';

import axios from 'axios';

import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';

import useCategories from '@/hooks/useCategories';
import FetchError from '@/fetcher/FetchError';
import FetchLoad from '@/fetcher/FetchLoad';

import FindCategory from '@/components/pages/utils/FindCategory';

import InputImage from '@/components/pages/category/InputImage';
import DisplayImage from '@/components/pages/category/DisplayImage';

import Toast from '@/components/pages/utils/Toast';

import styles from '@/styles/modules/Form.module.scss';

export default function EditCategory({ data, id }) {
  const { categoriesData, isError, isLoading } = useCategories(0);
  const [input, handleInputChange, setInput] = useForm(data);
  const [message, setMessage, display, setDisplay] = useToast();

  if (isError) return <FetchError />;
  if (isLoading) return <FetchLoad />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Catégorie modifiée !');
    setDisplay(true);

    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/category?id=${id}`, input);

    setTimeout(() => {
      setDisplay(false);
    }, 3000);
  };

  return (
    <Layout title="Editer une catégorie">
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>

        <div className={styles.col}>
          <fieldset className={styles.row}>
            <label htmlFor="name" className={styles.label}>Nom</label>
            <input className={`${styles.field} ${styles.field_name}`} type="text" name="name" id="name" onChange={handleInputChange} value={input.name} placeholder="Nom de la catégorie..." />
          </fieldset>

          <fieldset className={styles.row}>
            <label htmlFor="desc" className={styles.label}>Description</label>
            <textarea className={styles.field} name="desc" id="desc" cols="30" rows="10" onChange={handleInputChange} value={input.desc} placeholder="Description de la catégorie..." />
          </fieldset>

          <fieldset className={`${styles.row} ${styles.row_image}`}>
            <label className={`${styles.label} ${styles.label_image}`}>Image</label>
            <DisplayImage input={input} />
            <InputImage input={input} setInput={setInput} />
          </fieldset>
        </div>

        <div className={styles.col}>
          <fieldset className={styles.row}>
            <label htmlFor="parent" className={styles.label}>Catégorie parente</label>
            <select className={styles.field} name="parent" id="parent" onChange={handleInputChange} value={input.parent ? input.parent : ''}>
              <option value="">Aucune</option>
              {
                categoriesData.categories
                  .filter((el) => !el.parent && el._id !== data._id)
                  .map((el) => <option value={el._id} key={el._id}>{el.name}</option>)
              }
            </select>
          </fieldset>

          <fieldset className={styles.row}>
            <h3 className={styles.label}>Catégories enfants</h3>
            <ul className={styles.list}>
              {
                !data.childs.length
                  ? <li>Aucune</li>
                  : data.childs
                    .map((el) => <li key={el.childId}><FindCategory category={el.childId} /></li>)
              }
            </ul>
          </fieldset>
        </div>

        <fieldset className={`${styles.row_submit} ${styles.row}`}>
          <input className={`${styles.field_submit} ${styles.field}`} type="submit" value="Enregistrer" />
        </fieldset>

        <Toast message={message} display={display} setDisplay={setDisplay} />
      </form>
    </Layout>
  );
}

EditCategory.propTypes = {
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
  const { data } = await axios.get(`http://localhost:4000/category?id=${id}`);

  // Pass data to the page via props
  return { props: { data: data.category, id } };
}
