import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import lemon from "../../public/images/lemon.jpg";
import { Subtitle, Title } from "@/styles/home";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>Blog de Chalo</Title>
        <Subtitle>Es es el subtítulo de mi blog</Subtitle>
        <p>Esta es la nueva funcionalidad.</p>
        <p>Este es mi index.</p>

        <p>
          Ir a <a href="/hola">hola</a>
        </p>

        <p>
          Ir a <Link href="/hola">hola con Link</Link>
        </p>

        <Image
          src={lemon} // Route of the image file
          height={144} // Desired size with correct aspect ratio
          width={144} // Desired size with correct aspect ratio
          placeholder="blur"
          alt="Limón"
        />
      </main>
    </div>
  );
}
