import styles from '@/fetcher/Fetcher.module.scss';

export default function FetchLoad() {
  return (
    <section className={styles.container}>
      <img src="/loading.svg" alt="Something went wrong" />
      <p>Chargement...</p>
    </section>
  );
}
