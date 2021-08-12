import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../api";
import Image from "next/image";

const IngredientDetailPage = ({ ingredient }) => {
  // const [ingredient, setIngredient] = useState(null);
  const router = useRouter();
  //
  // const { id } = router.query;
  // console.log("id", id);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`/ingredients/${id}`, {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9uYW1lbGVzcy1mb3J0cmVzcy04NTE1OS5oZXJva3VhcHAuY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjI4NzI4ODMwLCJleHAiOjE2Mjg3MzI0MzAsIm5iZiI6MTYyODcyODgzMCwianRpIjoiMURNVU9YcUFPcU1tUTNWSiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.HW8H1Qb2lEsAmECn7G01d1lWvmhH-ZU90utmWUcYglw",
  //         },
  //       });
  //       console.log("response", response);
  //       setIngredient(response.data);
  //     } catch (e) {}
  //   };
  //
  //   getData();
  // });

  if (!ingredient) {
    return "Cargando datos...";
  }

  return (
    <div>
      <Image src={ingredient.image} width={400} height={300} />
      <p>Nombre: {ingredient.name}</p>
      <button onClick={() => router.push("/ingredientes")}>
        Regresar a la lista de ingredientes
      </button>
    </div>
  );
};

export default IngredientDetailPage;

export async function getStaticProps({ params }) {
  let ingredient = null;
  try {
    console.log("params.id", params.id);
    const response = await api.get(`/ingredients/${params.id}`, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9uYW1lbGVzcy1mb3J0cmVzcy04NTE1OS5oZXJva3VhcHAuY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjI4NzMwNjUxLCJleHAiOjE2Mjg3MzQyNTEsIm5iZiI6MTYyODczMDY1MSwianRpIjoiRjlUSUt5NkNjMDh1amZEWiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.pdsy1qs6Ya4kVzrXB68cJCpvZEEYhfVIT20cvGK1SzI",
      },
    });
    console.log("response", response);
    ingredient = response.data;
  } catch (e) {}

  return {
    props: {
      ingredient,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const response = await api.get(`/ingredients`);
  const ingredients = response.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = ingredients.map((ingredient) => ({
    params: { id: "" + ingredient.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
