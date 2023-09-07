"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  drinkId: number;
};

const CommentForm = ({ drinkId }: Props) => {
  const [input, setInput] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const data = { comment: input, drinkId };

      const res = await fetch(`/api/drinks/comments`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error("error");
      }

      setInput("");

      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Add comment..."
        className="text-zinc-800 px-1 py-2 mt-5 rounded-md"
        type="text"
        value={input}
        onChange={({ target }) => setInput(target.value)}
      />
      <button className="bg-zinc-600 px-4 py-2 ml-2 rounded-md" type="submit">
        Send
      </button>
    </form>
  );
};

export default CommentForm;
