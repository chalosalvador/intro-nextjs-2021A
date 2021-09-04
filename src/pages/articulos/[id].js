import { useRouter } from "next/router";
import api from "../../api";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url) =>
  api
    .get(url, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9uYW1lbGVzcy1mb3J0cmVzcy04NTE1OS5oZXJva3VhcHAuY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjI5MjQ0OTc5LCJleHAiOjE2MjkyNDg1NzksIm5iZiI6MTYyOTI0NDk3OSwianRpIjoiQUViWkw4ZTdEbzRDRU1WdiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.M6wgCGxIDtmfpulYqj98kvL5i0YjUOCG8GCDQth54xs",
      },
    })
    .then((res) => res.data);

const IngredientDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR("/ingredients/" + id, fetcher);

  if (error) {
    return "Ocurrió un error";
  }

  if (!data) {
    return "Cargando datos...";
  }

  return (
    <div>
      <Image src={data.image} width={400} height={300} />
      <p>Nombre: {data.name}</p>
      <button onClick={() => router.push("/ingredientes")}>
        Regresar a la lista de ingredientes
      </button>
    </div>
  );
};

export default IngredientDetailPage;

// export async function getStaticProps({ params }) {
//   let ingredient = null;
//   try {
//     console.log("params.id", params.id);
//     const response = await api.get(`/ingredients/${params.id}`);
//     // console.log("response", response);
//     ingredient = response.data;
//   } catch (e) {
//     console.log("error", e);
//   }
//
//   return {
//     props: {
//       ingredient,
//     }, // will be passed to the page component as props
//     revalidate: 1,
//   };
// }
//
// export async function getStaticPaths() {
//   const response = await api.get(`/ingredients`);
//   const ingredients = response.data.data;
//
//   // Get the paths we want to pre-render based on posts
//   const paths = ingredients.map((ingredient) => ({
//     params: { id: "" + ingredient.id },
//   }));
//
//   /*
//   [
//   {
//     params: {
//       id: 1
//     },
//   },
//    {
//    params: {
//    id: 2
//    },
//    }
//    {
//    params: {
//    id: 3
//    },
//    }
//    {
//    params: {
//    id: 4
//    },
//    },
//    {
//    params: {
//    id: 5
//    },
//    }
//   ]
//    */
//
//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: "blocking" };
// }
