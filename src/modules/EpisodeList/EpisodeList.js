import {useState, useEffect, React, Fragment} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import Episode from '../Episode/Episode.js';
import EpisodeDetail from '../EpisodeDetail/EpisodeDetail.js';

import * as EpisodeService from '../../services/Episode.service.js';
import useDeviceDetect from '../../utils/useDeviceDetect.js';
import * as episodeActions from '../../store/actions/episode.action.js';

import './EpisodeList.scss';

function EpisodeList(props) {
    const [episode, setEpisode] = useState();
    const [isEpisodesVisible, setIsEpisodesVisible] = useState(true);
    const params = useParams();
    const { isMobile } = useDeviceDetect(); 

    useEffect(() => {   
        var subscription = EpisodeService.getEpisodeList().subscribe((data) => {
            props.addEpisodes(data);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if(params && params.id) {
            setEpisode(EpisodeService.getEpisodeById(props.episodes, params.id));  
            setIsEpisodesVisible(false); 
        }
    }, [params]); 

    const onEpisodesToggle = () => {
        setIsEpisodesVisible(!isEpisodesVisible);
    }

    return (
        <div className="episode-container" >
            <div className="episodes" >
                <div className="episode-header" >
                    <h2>Episodes</h2>
                    <FontAwesomeIcon icon={isEpisodesVisible ? faAngleUp : faAngleDown} onClick={onEpisodesToggle}  />
                </div>
                {
                    (!isMobile ? true : isEpisodesVisible) && props.episodes.map((e, i) => <Episode key={'episode' + i} model={e} />)
                }
            </div>
            {episode ? <EpisodeDetail key={'episode' + episode.id} model={episode} /> : ''}
        </div>
    );
}

function mapStateToProps(state) {
    return {
      episodes: state.episodes
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        addEpisodes: (episodes) => dispatch(episodeActions.addEpisodes(episodes))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EpisodeList);
