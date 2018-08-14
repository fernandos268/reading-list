import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "semantic-ui-css/semantic.min.css";

import { Container, Header, Segment, Divider } from "semantic-ui-react";

//components
import Booklist from "./components/BookList";
import AddBook from "./components/AddBook";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphiql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <Segment>
            <h1>Reading List</h1>
            <Booklist />
          </Segment>
          <Container>
            <Segment raised>
              <Header as="h2">Book Form</Header>
              <Divider />
              <AddBook />
            </Segment>
          </Container>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
