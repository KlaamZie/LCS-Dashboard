import Layout from '@/components/layouts/default';
import axios from 'axios';
import { useRouter } from 'next/router';

import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';

import Toast from '@/components/pages/utils/Toast';

import styles from '@/styles/modules/Form.module.scss';

export default function CreateAttribute() {
  const router = useRouter();
  const [input, handleInputChange] = useForm({ name: '' });
  const [message, setMessage, display, setDisplay] = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Attribut créer !');
    setDisplay(true);

    let id;

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/declination`, input)
      .then((res) => {
        id = res.data.newDeclination._id;
      });

    setTimeout(() => {
      setDisplay(false);
      router.push(`/attribute/edit/${id}`);
    }, 3000);
  };

  return (
    <Layout title="Créer un attribut">
      <form className={styles.container_fluid} onSubmit={(e) => handleSubmit(e)}>

        <fieldset className={styles.row}>
          <label htmlFor="name" className={styles.label}>Nom</label>
          <input className={`${styles.field} ${styles.field_name}`} type="text" name="name" id="name" onChange={handleInputChange} value={input.name} placeholder="Nom de l'attribut..." />
        </fieldset>

        <fieldset className={`${styles.row_submit} ${styles.row}`}>
          <input className={`${styles.field_submit} ${styles.field}`} type="submit" value="Créer" />
        </fieldset>

        <Toast message={message} display={display} setDisplay={setDisplay} />
      </form>
    </Layout>
  );
}
