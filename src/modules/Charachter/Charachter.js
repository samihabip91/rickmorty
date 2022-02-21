import {React} from 'react';
import {Link} from 'react-router-dom';

import './Charachter.scss';

function Charachter(props) {

    return (
       <div className="charachter" >
           <img alt="charachter ..." src={props.model.image} /> 
           <div className="info" >
               <Link to={'/character/' + props.model.id} >
                    <h3 className="title" >{props.model.name}</h3>
                </Link>
               <label className={'dot sub-line ' + props.model.status} >{props.model.status} - {props.model.species}</label>
               <div className="field">
                   <label className="field-title">Last known location:</label>
                   <label >{props.model.location.name}</label>
               </div>
               <div className="field">
                   <label className="field-title">First seen in</label>
                   <label>{props.model.origin.name}</label>
               </div>
           </div>
       </div>
    );
}

export default Charachter;


