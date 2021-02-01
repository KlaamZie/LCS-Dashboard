import Layout from '@/components/layouts/default';
import PropTypes from 'prop-types';
import { getSession } from 'next-auth/client';

import axios from 'axios';

import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';

import useCategories from '@/hooks/useCategories';

import FetchError from '@/fetcher/FetchError';
import FetchLoad from '@/fetcher/FetchLoad';

import HandleDetails from '@/components/pages/product/HandleDetails';

import HandleDeclinations from '@/components/pages/product/HandleDeclinations';

import InputImages from '@/components/pages/product/InputImages';
import DisplayImages from '@/components/pages/product/DisplayImages';

import HandleDocs from '@/components/pages/product/HandleDocs';

import Toast from '@/components/pages/utils/Toast';

import styles from '@/styles/modules/Form.module.scss';

export default function EditProduct({ data, id }) {
  const { categoriesData, isError, isLoading } = useCategories(0);
  const [input, handleInputChange, setInput] = useForm(data);
  const [message, setMessage, display, setDisplay] = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Produit modifié !');
    setDisplay(true);

    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/product?id=${id}`, input);

    setTimeout(() => {
      setDisplay(false);
    }, 3000);
  };

  if (isError) return <FetchError />;
  if (isLoading) return <FetchLoad />;

  return (
    <Layout title="Editer un produit">
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>

        <div className={styles.col}>
          <fieldset className={styles.row}>
            <label htmlFor="name" className={styles.label}>Nom</label>
            <input className={`${styles.field} ${styles.field_name}`} type="text" name="name" id="name" onChange={handleInputChange} value={input.name} placeholder="Nom du produit..." />
          </fieldset>

          <fieldset className={styles.row}>
            <label htmlFor="shortDesc" className={styles.label}>Récapitulatif</label>
            <textarea className={styles.field} name="shortDesc" id="shortDesc" rows="1" onChange={handleInputChange} value={input.shortDesc} placeholder="Courte description du produit..." />
          </fieldset>

          <fieldset className={styles.row}>
            <label htmlFor="longDesc" className={styles.label}>Description</label>
            <textarea className={styles.field} name="longDesc" id="longDesc" rows="10" onChange={handleInputChange} value={input.longDesc} placeholder="Description du produit..." />
          </fieldset>

          <fieldset className={`${styles.row} ${styles.row_image}`}>
            <label className={`${styles.label} ${styles.label_image}`}>Images (5 maximum)</label>
            <DisplayImages input={input} setInput={setInput} />
            <InputImages input={input} setInput={setInput} />
          </fieldset>

          <HandleDetails input={input} setInput={setInput} />

          <HandleDeclinations input={input} setInput={setInput} />
        </div>

        <div className={styles.col}>
          <fieldset className={styles.row}>
            <label htmlFor="state" className={styles.label}>
              État :
              {' '}
              {input.state ? 'En ligne' : 'Hors ligne'}
            </label>
            {
                input.state
                  ? <input className={`${styles.field_submit} ${styles.field}`} onClick={() => setInput({ ...input, state: false })} type="button" value="Mettre hors ligne" />
                  : <input className={`${styles.field_submit} ${styles.field}`} onClick={() => setInput({ ...input, state: true })} type="button" value="Mettre en ligne" />
            }
          </fieldset>

          <fieldset className={styles.row}>
            <label htmlFor="price" className={styles.label}>Prix (€)</label>
            <input className={styles.field} type="number" name="price" id="price" min="0" step=".01" onChange={handleInputChange} value={input.price} />
          </fieldset>

          <fieldset className={styles.row}>
            <label htmlFor="mainCategory" className={styles.label}>Catégorie principale</label>
            <select className={styles.field} name="mainCategory" id="mainCategory" onChange={handleInputChange} value={input.mainCategory ? input.mainCategory : ''}>
              <option value="">Aucune</option>
              {
                categoriesData.categories
                  .filter((el) => !el.parent)
                  .map((el) => <option value={el._id} key={el._id}>{el.name}</option>)
              }
            </select>
          </fieldset>

          {
            input.mainCategory
              ? (
                <fieldset className={styles.row}>
                  <label htmlFor="category" className={styles.label}>Catégorie</label>
                  <select className={styles.field} name="category" id="category" onChange={handleInputChange} value={input.category ? input.category : ''}>
                    <option value="">Aucune</option>
                    {
                      categoriesData.categories
                        .filter((el) => el.parent === input.mainCategory)
                        .map((el) => <option value={el._id} key={el._id}>{el.name}</option>)
                    }
                  </select>
                </fieldset>
              )
              : null
          }

          <fieldset className={`${styles.row}`}>
            <label className={`${styles.label}`}>Documents (5 max)</label>
            <HandleDocs input={input} setInput={setInput} />
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

EditProduct.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?callbackUrl=${process.env.NEXTAUTH_URL}`,
        permanent: false,
      },
    };
  }

  const { id } = context.query;
  // Fetch data from external API
  const { data } = await axios.get(`http://localhost:4000/product?id=${id}`);

  // Pass data to the page via props
  return { props: { data: data.product, id } };
}
