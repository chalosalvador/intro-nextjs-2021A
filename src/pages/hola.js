import Head from 'next/head';
import Link from 'next/link';


const HolaPage = () => {
  return (
    <>
    <Head>
      <title>Hola Mundo!</title>
    </Head>

    <div>
      <p>Hola mundo!</p>

      <p><a href='/'>Regresar al index</a></p>
      <p><Link href='/'>Regresar al index con Link</Link></p>
    </div>
    </>
  );
};

export default HolaPage;
