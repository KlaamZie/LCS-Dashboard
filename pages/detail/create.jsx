import Layout from '@/components/layouts/default';
import axios from 'axios';
import { useRouter } from 'next/router';
import auth0 from '@/lib/auth0';

import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';

import Toast from '@/components/pages/utils/Toast';

import styles from '@/styles/modules/Form.module.scss';

export default function CreateDetail() {
  const router = useRouter();
  const [input, handleInputChange] = useForm({ name: '' });
  const [message, setMessage, display, setDisplay] = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Détail créer !');
    setDisplay(true);

    let id;

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/detail`, input)
      .then((res) => {
        id = res.data.newDetail._id;
      });

    setTimeout(() => {
      setDisplay(false);
      router.push(`/detail/edit/${id}`);
    }, 3000);
  };

  return (
    <Layout title="Créer un détail">
      <form className={styles.container_fluid} onSubmit={(e) => handleSubmit(e)}>

        <fieldset className={styles.row}>
          <label htmlFor="name" className={styles.label}>Nom</label>
          <input className={`${styles.field} ${styles.field_name}`} type="text" name="name" id="name" onChange={handleInputChange} value={input.name} placeholder="Nom du détail..." />
        </fieldset>

        <fieldset className={`${styles.row_submit} ${styles.row}`}>
          <input className={`${styles.field_submit} ${styles.field}`} type="submit" value="Créer" />
        </fieldset>

        <Toast message={message} display={display} setDisplay={setDisplay} />
      </form>
    </Layout>
  );
}

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

  return {
    props: {},
  };
}
