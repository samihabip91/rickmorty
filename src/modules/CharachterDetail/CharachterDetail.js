import {React} from 'react';
import {Link, useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import './CharachterDetail.scss';
import '../../content/sass/mixins/mixins.scss';

import * as CharachterService from '../../services/Charachter.service.js';
import * as EpisodeService from '../../services/Episode.service.js';
import Charachter from '../Charachter/Charachter';

function CharachterDetail(props) {
    const params = useParams();
    var character = CharachterService.getCharacterById(props.characters, params.id);
    var episodes = EpisodeService.getEpisodesByUrls(props.episodes, character.episode);

     return (
       <div className="charachter-detail" >
           <div className="character-img-container" >
                <img alt={character.name} src={character.image} /> 
            </div>
           <div className="info" >
               <h1 className="title" >{character.name}</h1>
               <div className="info-content">
               <div className="info-fields" >
                <label className={'dot sub-line ' + character.status} >{character.status} - {character.species}</label>
                <div className="field">
                        <label className="field-title">Gender:</label>
                        <label>{character.gender}</label>
                    </div>             
                <div className="field">
                        <label className="field-title">First seen in:</label>
                        <label>{character.origin.name}</label>
                    </div>
                <div className="field">
                    <label className="field-title">Last known location:</label>
                    <label >{character.location.name}</label>
                    </div>
               </div>
                <div className="charachter-episodes" >
                        <h2>Episodes</h2> 
                            <table>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Code</td>
                                        <td>Air Date</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        episodes.map((e, i) => 
                                            <tr>
                                                <td>
                                                    <Link key={'charEpisode' + i} to={'/episode/' + e.id} >
                                                        {e.name}
                                                    </Link>
                                                </td>
                                                <td>
                                                    <label>{e.episode}</label>
                                                </td>
                                                <td>
                                                    <label>{e.air_date}</label>
                                                </td>
                                            </tr>
                                        )
                                    }   
                                </tbody>
                            </table>
                    </div>
                </div>
           </div>
       </div>
    );
}

function mapStateToProps(state) {
    return { 
        characters: state.characters,
        episodes: state.episodes 
    };
}

export default connect(mapStateToProps)(CharachterDetail);


