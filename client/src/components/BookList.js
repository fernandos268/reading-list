import React, { Component } from "react";
import {
  List,
  Card,
  Grid,
  Segment,
  Container,
  Button,
  Icon,
  Popup,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected : null
    }
  }
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return (
        <div>
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        </div>
      );
    } else {
      return data.books.map(book => {
        return (
          <Card link key={book.id} onClick={(e) => {this.setState({selected:book.id})}}>
            <Card.Content>
              <Card.Header>{book.name}</Card.Header>
              <Card.Meta>{book.genre}</Card.Meta>
              <Card.Description>{book.author.name}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic>
                  <Popup
                    inverted
                    trigger={<Icon name="edit" size="large" />}
                    content="Edit"
                    on="hover"
                  />
                </Button>
                <Button basic>
                  <Popup
                    inverted
                    trigger={
                      <Icon name="trash alternate outline" size="large" />
                    }
                    content="Delete"
                    on="hover"
                  />
                </Button>
              </div>
            </Card.Content>
          </Card>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <Card.Group>{this.displayBooks()}</Card.Group>
        <div className="ui segment">
          <BookDetails bookid={this.state.selected}/>
        </div>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
