import Image from "next/image";
import Link from "next/link";

type DrinkResponse = {
  drinks: DrinkDetails[];
};

type DrinkDetails = {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
};

export default async function Drinks() {
  // By default data fetching is static, the result is cached forever
  // const response = await fetch(
  //   "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
  // );

  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic",
    { cache: "no-store" } // Always get fresh data, no caching
  );

  // const response = await fetch(
  //   "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic",
  //   {
  //     next: {
  //       revalidate: 60, // Use Incremental static regeneration, data is cached for 60 seconds
  //     },
  //   }
  // );

  if (!response.ok) throw new Error("Failed to fetch data");

  const data: DrinkResponse = await response.json();

  return (
    <div>
      <h1 className="text-center text-2xl m-10">Drinks</h1>
      <div className="flex flex-wrap gap-6 px-28 pb-28 cursor-pointer">
        {data.drinks.map(({ idDrink: id, strDrink, strDrinkThumb }) => (
          <Link
            key={id}
            href={`/drinks/${id}`}
            className="text-center bg-zinc-800  rounded-md w-[200px] hover:scale-105 duration-300"
          >
            <Image
              className="rounded-t-md"
              priority
              alt={strDrink}
              src={strDrinkThumb}
              width={200}
              height={200}
            />
            <h2 className="text-lg mt-3 p-4">{strDrink}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
