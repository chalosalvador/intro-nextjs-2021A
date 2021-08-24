import PropTypes from "prop-types";
import api from "../../api";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Ingredients.module.css";

const IngredientsPage = ({ ingredients }) => {
  // const [ingredients, setIngredients] = useState([]);
  //
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get("/ingredients");
  //       console.log("response", response);
  //       setIngredients(response.data.data);
  //     } catch (e) {}
  //   };
  //
  //   getData();
  // }, []);

  return (
    <div className={styles.ingredients}>
      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className={styles.ingredient}>
          <Image src={ingredient.image} width={400} height={300} />
          <div className={styles.ingredientInfo}>
            <span>
              <Link href={`/ingredientes/${ingredient.id}`}>
                {ingredient.name}
              </Link>
            </span>
            <span>{ingredient.cost}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

IngredientsPage.propTypes = {
  ingredients: PropTypes.array,
};

export default IngredientsPage;

export async function getStaticProps() {
  let ingredients = [];
  try {
    const response = await api.get("/ingredients");
    console.log("response", response);
    ingredients = response.data.data;
  } catch (e) {
    console.log("e", e);
  }

  return {
    props: {
      ingredients,
    }, // will be passed to the page component as props
  };
}
