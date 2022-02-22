import {useEffect, React} from 'react';
import {connect} from 'react-redux';

import CharachterList from '../CharachterList/CharachterList.js';

import * as CharachterService from '../../services/Charachter.service';
import * as characterActions from '../../store/actions/character.action';
import * as utils from '../../utils/utils';

import './EpisodeDetail.scss';

import moment from 'moment';

function EpisodeDetail(props) {
    useEffect(() => {    
        var subscription = CharachterService
            .getMissingCharacters(props.characters, props.model.characters)
            .subscribe((data) => {
                if(data != undefined && data.length > 0) {
                    props.addCharacters(data);
                }
            });

        return () => subscription.unsubscribe();
    }, [props.characters]);

    return (
        <div className="episode-detail">
            <div className="episode-detail-header" >
                <h1 className="episode-name">{props.model.name}</h1>
                <div className="sub-line" >
                    <label className="left code" >{props.model.code}</label>
                    <label className="left" >{props.model.air_date}</label>
                    <label className="right" >{moment(props.model.created).format('DD/MM/YYYY hh:mm')}</label>
                </div>
            </div>
            <CharachterList model={props.episodeCharacters} />
        </div>
    );
}

function mapStateToProps(state, props) {
    var { characters } = state;
    var episodeCharacters = CharachterService.getCharactersByIds(characters, props.model.characters);
    
    return { 
        characters,
        episodeCharacters
    };
}

function mapDispatchToProps(dispatch) {
    return { 
        addCharacters: (characters) => dispatch(characterActions.addCharacters(characters))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeDetail);
