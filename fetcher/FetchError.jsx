import styles from '@/fetcher/Fetcher.module.scss';

export default function FetchError() {
  return (
    <section className={styles.container}>
      <img src="/error.svg" alt="Something went wrong" />
      <p>Whoops une erreur est survenue !</p>
    </section>
  );
}
