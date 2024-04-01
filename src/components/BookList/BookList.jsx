import { Table } from "@radix-ui/themes";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS, DELETE_BOOK } from "../../queries";
import { BookDetails } from "../BookDetails/BookDetails";
import { useState } from "react";

export const BookList = () => {
  const [bookId, setBookId] = useState("");
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const getBookId = id => setBookId(id);

  const removeBook = async id => {
    console.log(id);
    try {
      const response = await deleteBook({
        variables: {
          id: id,
        },
        refetchQueries: [{ query: GET_BOOKS }],
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Book name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.books.map(({ name, id }) => (
            <Table.Row key={id}>
              <Table.RowHeaderCell onClick={() => getBookId(id)}>
                {name}
              </Table.RowHeaderCell>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>
                <button onClick={() => removeBook(id)}>x</button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <BookDetails bookId={bookId} />
    </>
  );
};
