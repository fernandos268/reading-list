import React, { Component } from "react";
import {
  List,
  Button,
  Checkbox,
  Form,
  Dropdown,
  Select,
  Dimmer,
  Loader
} from "semantic-ui-react";

import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorid: ""
    };
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (
        // <div>
        //   <Dimmer active inverted>
        //     <Loader inverted content="Loading" />
        //   </Dimmer>
        // </div>
        <div>Loading Authors....</div>
      );
    } else {
      return data.authors.map(author => {
        // return <List.Item key={book.id}>{book.name}</List.Item>;
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({ 
      variables:{ 
        name: this.state.name,
        genre: this.state.genre,
        authorid: this.state.authorid
      },
      refetchQueries:[{query:getBooksQuery}] // call the get books query to retrieve the books list
    });
  }
  render() {
    return (
      <Form id="frm-add-book" onSubmit={this.submitForm.bind(this)}>
        <Form.Field>
          <label>Book Name</label>
          <input
            placeholder="Name"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Genre</label>
          <input
            placeholder="Genre"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <select
            className="ui dropdown"
            placeholder="Select Author"
            onChange={e => this.setState({ authorid: e.target.value })}
          >
            {this.displayAuthors()}
          </select>
        </Form.Field>
        <button className="ui primary button" type="submit">
          Submit
        </button>
      </Form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
