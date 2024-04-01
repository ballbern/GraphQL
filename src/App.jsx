// https://www.radix-ui.com/themes/docs/overview/getting-started

import "./App.css";
import { BookList, AddBook } from "./components";
import styled from "styled-components";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Tabs, Container, Box } from "@radix-ui/themes";

const Header = styled.main`
  height: 3rem;
  padding: 1rem;
  background-color: lightgrey;
  margin-bottom: 1rem;
`;

const Footer = styled.main`
  height: 3rem;
  padding: 1rem;
  background-color: lightgrey;
  margin-top: 1rem;
`;

function App() {
  // apollo client setup
  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <>
        <Header>header</Header>

        <Container size='4'>
          <Tabs.Root defaultValue='add-book'>
            <Tabs.List>
              <Tabs.Trigger value='books'>Books</Tabs.Trigger>
              <Tabs.Trigger value='add-book'>Add Book</Tabs.Trigger>
            </Tabs.List>

            <Box px='4' pt='3' pb='2'>
              <Tabs.Content value='books'>
                <BookList />
              </Tabs.Content>

              <Tabs.Content value='add-book'>
                <AddBook />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Container>
        <Footer>footer</Footer>
      </>
    </ApolloProvider>
  );
}

export default App;
