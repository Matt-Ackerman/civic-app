import React, { Component } from 'react'
import axios from 'axios'
//import * as handleForm from './HandleForm.js'
//import logo from './logo.svg';
//import './App.css';

// the class that includes reactjs logic as well as renders the html page
class PostForm extends Component {

  // constructor. these variable will be able to be accessed in html
  constructor(props) {
    super(props)
    this.listOfOfficials = []
    this.address = ''
  }

  // this is needed to display what the user is typing in the search box
  handleAddressChange = event => {
    this.address = event.target.value
  }

  // on submit of the address search, we use axios to post the http request to spring
  handleSubmit = event => {
    var instance = axios.create({
      baseURL: 'http://localhost:8080',
    });

    event.preventDefault()
    instance.post('/address?address=' + this.address)
    .then(response => {
      this.listOfOfficials = response.data
      this.forceUpdate();
    })
    .catch(error => {
      console.log(error)
    })
  }

  // displays the html
  render() {
    const address = this.state
    const firstResult = this.listOfOfficials[0]

    // html notes: (object || [].value) checks if it exists before accessing value
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
				    <label>Address </label>
				    <input type="text" value={address} onChange={this.handleAddressChange}/>
            <button type="submit">Submit</button>
          </form>
          <p>{(firstResult || []).name}</p> <p>{(firstResult || []).officeName}</p>
        </div>
    );
  }
}

export default PostForm;
