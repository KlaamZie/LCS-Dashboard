import Layout from '@/components/layouts/default';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';

import useCategories from '@/hooks/useCategories';
import FetchError from '@/fetcher/FetchError';
import FetchLoad from '@/fetcher/FetchLoad';

import InputImage from '@/components/pages/category/InputImage';
import DisplayImage from '@/components/pages/category/DisplayImage';

import Toast from '@/components/pages/utils/Toast';

import styles from '@/styles/modules/Form.module.scss';

export default function CreateCategory() {
  const router = useRouter();
  const { categoriesData, isError, isLoading } = useCategories(0);
  const [input, handleInputChange, setInput] = useForm({
    name: '',
    desc: '',
    parent: '',
    image: '',
  });
  const [message, setMessage, display, setDisplay] = useToast();

  if (isError) return <FetchError />;
  if (isLoading) return <FetchLoad />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Catégorie créée !');
    setDisplay(true);

    let id;

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category`, input)
      .then((res) => {
        id = res.data.newCategory._id;
      });

    setTimeout(() => {
      setDisplay(false);
      router.push(`/category/edit/${id}`);
    }, 3000);
  };

  return (
    <Layout title="Créer une catégorie">
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
                  .filter((el) => !el.parent)
                  .map((el) => <option value={el._id} key={el._id}>{el.name}</option>)
              }
            </select>
          </fieldset>
        </div>

        <fieldset className={`${styles.row_submit} ${styles.row}`}>
          <input className={`${styles.field_submit} ${styles.field}`} type="submit" value="Créer" />
        </fieldset>

        <Toast message={message} display={display} setDisplay={setDisplay} />
      </form>
    </Layout>
  );
}

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

  return {
    props: {},
  };
}
