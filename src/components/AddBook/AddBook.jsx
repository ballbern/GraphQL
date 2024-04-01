import { useQuery, useMutation } from "@apollo/client";
import * as Form from "@radix-ui/react-form";
import { TextField, Select, Button } from "@radix-ui/themes";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../../queries";
import { useState } from "react";

export const AddBook = () => {
  const [books, setBooks] = useState({});

  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleSubmit = async e => {
    e.preventDefault();

    console.log(books);

    try {
      const response = await addBook({
        variables: {
          name: books.name,
          genre: books.genre,
          authorId: books.authorId,
        },
        refetchQueries: [{ query: GET_BOOKS }],
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form.Root className='FormRoot' onSubmit={e => handleSubmit(e)}>
      <Form.Field name='book-name'>
        <Form.Control asChild>
          <TextField.Input
            type='text'
            required
            size='3'
            onChange={e => setBooks({ ...books, name: e.target.value })}
            placeholder='Book name...'
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name='genre'>
        <Form.Control asChild>
          <TextField.Input
            type='text'
            required
            onChange={e => setBooks({ ...books, genre: e.target.value })}
            placeholder='Genre...'
            size='3'
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name='author'>
        <Form.Control asChild>
          <Select.Root
            size='3'
            onValueChange={selectValue =>
              setBooks({ ...books, authorId: selectValue })
            }
          >
            <Select.Trigger placeholder='Chose Author...' />
            <Select.Content>
              {data.authors.map(({ name, id }) => (
                <Select.Item key={id} value={id}>
                  {name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <Button type='submit' size='3' variant='soft'>
          Add Book
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};
