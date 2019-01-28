import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getRadiosQuery} from '../queries/queries';


//components
import RadioDetails from './RadioDetails';


class RadioList extends Component {
  constructor(props){
    super(props);
    this.state={
      selected:null
    }
  }
  displayRadios(){
    var data= this.props.data;
    if(data.loading){
      return( <div> Loading Radio..</div>);
    }else{
      return data.radios.map(radio=>{
        return (
          <li key={radio.id} onClick={(e)=>{this.setState({selected:radio.id})}}>{radio.alias}</li>
        );
      })
    }
  }
  render() {

    return (
      <div>
        <ul id="radio-list">
          {this.displayRadios()}
        </ul>
        <RadioDetails radioid={this.state.selected}/>

      </div>
    );
  }
}

export default graphql(getRadiosQuery)(RadioList);
