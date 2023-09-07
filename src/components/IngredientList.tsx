import { Recipe } from "@/types";

const combineSimilarObjectKeys = (obj: Recipe, startsWith: string) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (key.startsWith(startsWith)) {
        return value;
      }
    })
    .filter((value): value is string => Boolean(value));
};

type Props = {
  recipe: Recipe;
};

const IngredientList = async ({ recipe }: Props) => {
  const ingredients = combineSimilarObjectKeys(recipe, "strIngredient");
  const measures = combineSimilarObjectKeys(recipe, "strMeasure");

  return (
    <ul className="m-auto w-fit p-4">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="text-blue-200">
          {measures[index]} {ingredient}
        </li>
      ))}
    </ul>
  );
};

export default IngredientList;
