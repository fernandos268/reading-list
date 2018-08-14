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
import {getBookQuery} from '../queries/queries';

class BookDetails extends Component {
    render() {

      return (
        <div id="book-details">
 
        </div>
      );
    }
  }
  
  export default graphql(getBookQuery,{
      options:(props) => {
          return{
              variables:{
                  id:props.bookid
              }
          }
      }
  })(BookDetails);