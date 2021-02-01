import { useState } from 'react';
import auth0 from '@/lib/auth0';

import useAttributes from '@/hooks/useAttributes';
import FetchError from '@/fetcher/FetchError';
import FetchLoad from '@/fetcher/FetchLoad';

import Layout from '@/components/layouts/default';

import AttributesList from '@/components/pages/attributes/AttributesList';
import Pagination from '@/components/pages/utils/Pagination';

import { mutate, trigger } from 'swr';

import axios from 'axios';

import Link from 'next/link';

import styles from '@/styles/modules/ItemsTable.module.scss';

export default function Attributes() {
  const [page, setPage] = useState(1);
  const { attributesData, isLoading, isError } = useAttributes(page);

  const handleCopy = async (el) => {
    const newAttributes = attributesData.attributes.slice();
    newAttributes.push({
      ...el, _id: `${el._id}1`, name: `${el.name} (copy)`,
    });

    mutate(`/api/attributes?page=${page}`, (data) => ({ ...data, attributes: newAttributes }), false);

    await axios.post('http://localhost:4000/declination', {
      ...el, name: `${el.name} (copy)`,
    });

    trigger(`/api/attributes?page=${page}`);
  };

  const handleDelete = async (id) => {
    const newAttributes = attributesData.attributes.slice();
    newAttributes.splice(newAttributes.findIndex((c) => c._id === id), 1);

    mutate(`/api/attributes?page=${page}`, (data) => ({ ...data, attributes: newAttributes }), false);

    await axios.delete(`http://localhost:4000/declination?id=${id}`);

    trigger(`/api/attributes?page=${page}`);
  };

  if (isError) return <FetchError />;
  if (isLoading) return <FetchLoad />;

  return (
    <Layout title="Attributs">
      <section>
        <div className={styles.toolbar}>
          <p className={styles.toolbar_numberOfItems}>
            Nombre d&apos;attributs :
            {' '}
            {attributesData.number}
          </p>
          <Link href="/attribute/create">
            <a className={styles.toolbar_createButton}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
              Nouvel attribut
            </a>
          </Link>
        </div>
        <AttributesList
          page={page}
          handleCopy={handleCopy}
          handleDelete={handleDelete}
        />
        <Pagination page={page} setPage={setPage} data={attributesData} />
      </section>
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
