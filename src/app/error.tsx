"use client";

type Props = {
  error: Error;
};

const ErrorPage = ({ error }: Props) => {
  return (
    <div className="text-center text-2xl mt-20">
      Error happened: {error.message}
    </div>
  );
};

export default ErrorPage;
