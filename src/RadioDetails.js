import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getRadioQuery} from '../queries/queries';

class RadioDetails extends Component{
  displayRadioDetails(){
   const {radio} = this.props.data;
   if(radio){
     return(
       <div>
         <h2>{radio.alias}</h2>
         <p>{radio.location.name}</p>
         <p>All radios by this location:</p>
         <ul className="other-radios">
           {radio.location.radios.map(item=>{
             return<li key={item.id}>{item.alias}</li>
           })}
         </ul>
       </div>
     )
   }else{
     return(
       <div>No radio selected...</div>
     )
   }
 }
 render(){
 return (
      <div id="radio-details">
        {this.displayRadioDetails()}
     </div>
    );
  }
}
 

export default graphql(getRadioQuery,{
  options:(props)=>{
    return{
      variables:{
        id:props.radioId
      }
    }
  }
})(RadioDetails);
