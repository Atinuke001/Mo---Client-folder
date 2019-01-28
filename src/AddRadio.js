import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {getLocationsQuery,addRadioMutation,getRadiosQuery} from '../queries/queries';



class AddRadio extends Component {
  constructor(props){
    super(props);
    this.state = {
      alias:'',
      locationId:''
    };
  }
  displayLocations(){
    var data=this.props.getLocationsQuery;
    if(data.loading){
      return(<option disabled>Loading Authors..</option>);
    }else{
      return data.locations.map(location=>{
        return(<option key={location.id} value={location.id}>{location.name}</option>);
      })
    }
  }
  submitForm(e){
    e.preventDefault();
    this.props.addRadioMutation({
      variables:{
        alias:this.state.alias,
        locationId:this.state.locationId
      },
      refetchQueries:[{query:getRadiosQuery}]
    });
 }

 render() {
    return (
      <form id="add-radio" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Radio Alais:</label>
          <input type="text" onChange={(e)=>this.setState({alias:e.target.value})}/>
        </div>

        <div className="field">
          <label>Allowed Location:</label>
          <select onChange={(e)=>this.setState({locationid:e.target.value})}>
            <option>Select location</option>
            {this.displayLocations()}
          </select>
        </div>
        <button>+</button>
      </form>

    );
  }
}

export default compose(
  graphql(getLocationsQuery,{name:"getLocationsQuery"}),
  graphql(addRadioMutation,{name:"addRadioMutation"})
)(AddRadio);
