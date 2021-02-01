/* eslint-disable react/button-has-type */
import { providers, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import styles from '@/styles/modules/Auth.module.scss';

export default function SignIn({ providers }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <a href={provider.signinUrl} onClick={(e) => e.preventDefault()}>
            <button onClick={() => signIn(provider.id, { callbackUrl: router.query.callbackUrl })}>
              Se connecter avec
              { ' ' }
              {provider.name}
            </button>
          </a>
        </div>
      ))}
    </div>
  );
}

SignIn.getInitialProps = async (context) => ({
  providers: await providers(context),
});
