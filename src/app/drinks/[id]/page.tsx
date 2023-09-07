import { notFound } from "next/navigation";
import { Recipe } from "@/types";
import IngredientList from "@/components/IngredientList";
import Image from "next/image";
import CommentForm from "@/components/CommentForm";
import prisma from "@/db";

type RecipeResponse = {
  drinks: Recipe[];
};

type Props = {
  params: {
    id: string;
  };
};

const DrinkPage = async ({ params }: Props) => {
  const { id } = params;
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch data");

  const data: RecipeResponse = await response.json();
  if (!data.drinks || data.drinks.length === 0) {
    return notFound();
  }

  const recipe = data.drinks[0];

  const comments = await prisma.comment.findMany({
    where: { drinkId: Number(id) },
  });

  return (
    <div className="m-auto p-10 text-center">
      <h1 className="text-2xl text-center m-4">{recipe.strDrink}</h1>
      <Image
        className="m-auto w-auto"
        priority={true}
        alt={recipe.strDrink}
        src={recipe.strDrinkThumb}
        height={300}
        width={400}
      />

      <IngredientList recipe={recipe} />

      <p className="max-w-[500px] m-auto text-center">
        {recipe.strInstructions}
      </p>

      <h1 className="text-xl m-4">Comments</h1>
      <ul className="list-disc text-left m-auto w-fit">
        {comments.map(({ id, comment }) => (
          <li key={id}>{comment}</li>
        ))}
      </ul>
      <CommentForm drinkId={Number(id)} />
    </div>
  );
};

export default DrinkPage;
