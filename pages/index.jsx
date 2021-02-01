import PropTypes from 'prop-types';
import DefaultLayout from '@/components/layouts/default';

import auth0 from '@/lib/auth0';

export default function Home({ user }) {
  return (
    <DefaultLayout title="Home" name={user.name}>
      <h1>
        Salut !
      </h1>
    </DefaultLayout>
  );
}

Home.propTypes = { user: PropTypes.objectOf(PropTypes.any).isRequired };

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
    props: {
      user: session.user,
    },
  };
}
