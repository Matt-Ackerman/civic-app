import React, { Component } from 'react'
import axios from 'axios'
//import * as handleForm from './HandleForm.js'
//import logo from './logo.svg';
//import './App.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// the class that includes reactjs logic as well as renders the html page
class PostForm extends Component {

  // constructor. these variable will be able to be accessed in html
  constructor(props) {
    super(props)
    this.listOfOfficials = []
    this.state = {
      streetName: '',
      cityName: '',
      stateName: ''
    }
  }

  // this is needed to display what the user is typing in the search box
  handleStreetChange = event => {
    event.preventDefault()
    this.setState({streetName: event.target.value});
  }

  handleCityChange = event => {
    event.preventDefault()
    this.setState({cityName: event.target.value});
  }

  handleStateChange = event => {
    event.preventDefault()
    this.setState({stateName: event.target.value});
  }

  // on submit of the address search, we use axios to post the http request to spring
  handleSubmit = event => {
    var instance = axios.create({
      baseURL: 'http://localhost:8080',
    });

    event.preventDefault()
    instance.post('/address?street=' + this.state.streetName +
      '&city=' + this.state.cityName +
      '&state=' + this.state.stateName)
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
    const { streetName, cityName, stateName } = this.state
    const firstResult = this.listOfOfficials[0]

    // html notes: (object || [].value) checks if it exists before accessing value
    /*<p>{(firstResult || []).name}</p> <p>{(firstResult || []).officeName}</p>*/
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
				    <label>Street </label>
				    <input type="text" value={streetName} onChange={this.handleStreetChange}/>
            <label>City </label>
            <input type="text" value={cityName} onChange={this.handleCityChange}/>
            <label>State </label>
            <input type="text" value={stateName} onChange={this.handleStateChange}/>
            <button type="submit">Submit</button>
          </form>

          <BootstrapTable data={this.listOfOfficials}>
            <TableHeaderColumn isKey headerAlign='center' dataField='name'>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn headerAlign='right' dataField='officeName'>
              OfficeName
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
    );
  }
}

export default PostForm;
