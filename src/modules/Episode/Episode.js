import {useEffect, useState, React} from 'react';
import {Link} from 'react-router-dom';

import './Episode.scss';

function Episode(props) {
    return (
        <div className="episode" >
            <Link to={'/episode/' + props.model.id}>
                <h2 className="episode-name">{props.model.name}</h2>
            </Link>
            <div className="sub-line" >
                <label>{props.model.episode}</label>
                <label>{props.model.air_date}</label>
            </div>
        </div>
    );
}

export default Episode;


