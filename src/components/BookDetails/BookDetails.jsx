import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../../queries";

// eslint-disable-next-line react/prop-types
export const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const book = data?.book ?? null;

  const {
    name,
    genre,
    author: { name: authorName, age, books },
  } = book;

  return (
    <div>
      <div>{name}</div>
      <div>{genre}</div>
      <div>{authorName}</div>
      <div>{age}</div>
      {books.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};
