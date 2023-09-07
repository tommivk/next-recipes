import Link from "next/link";

const LinkToDrinkList = () => {
  return (
    <Link href="/drinks" className="p-11">
      {"<"} Back to drink list
    </Link>
  );
};

type Props = {
  children: React.ReactNode;
};

const DrinksLayout = ({ children }: Props) => {
  return (
    <>
      <LinkToDrinkList />
      {children}
    </>
  );
};

export default DrinksLayout;
