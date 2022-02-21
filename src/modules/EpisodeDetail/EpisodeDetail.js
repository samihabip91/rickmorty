import {useState, useEffect, React} from 'react';
import {connect} from 'react-redux';

import CharachterList from '../CharachterList/CharachterList.js';

import * as CharachterService from '../../services/Charachter.service';
import * as characterActions from '../../store/actions/character.action';
import * as utils from '../../utils/utils';

import './EpisodeDetail.scss';

import moment from 'moment';

function EpisodeDetail(props) {
    const [episodeCharacters, setEpisodeCharacters] = useState([]);

    useEffect(() => {
        var characterIds = utils.getIdsByUrls(props.model.characters);
        var subscription = CharachterService.getMissingCharacters(props.characters, characterIds).subscribe((data) => {
            if(data && data.length > 0)
                props.addCharacters(data);

            setEpisodeCharacters(CharachterService.getCharactersByIds(props.characters, characterIds));
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="episode-detail" >
            <div className="episode-detail-header" >
                <h1 className="episode-name">{props.model.name}</h1>
                <div className="sub-line" >
                    <label className="left code" >{props.model.code}</label>
                    <label className="left" >{props.model.air_date}</label>
                    <label className="right" >{moment(props.model.created).format('DD/MM/YYYY hh:mm')}</label>
                </div>
            </div>
            <CharachterList model={episodeCharacters} />
        </div>
    );
}

function mapStateToProps(state) {
    return { 
        characters: state.characters
    };
}

function mapDispatchToProps(dispatch) {
    return { 
        addCharacters: (characters) => dispatch(characterActions.addCharacters(characters))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EpisodeDetail);


