import {useReducer, useState, useEffect, React} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Textbox from '../../components/textbox/textbox.js';
import Dropdownlist from '../../components/dropdownlist/dropdownlist.js';
import Charachter from '../Charachter/Charachter.js';
// import LocationContext from '../LocationContext/LocationContext.js';

import * as characterActions from '../../store/actions/character.action';
import * as filterReducer from '../../store/reducers/filter.reducer';
import {charachterStatuses, sortOptions} from '../../utils/models.js';
import * as utils from '../../utils/utils';
import * as constants from '../../utils/constants';

import './CharachterList.scss';

function CharachterList(props) {
    const [filteredCharacters, setFilteredCharacters] = useState();
    const [query, dispatch] = useReducer(filterReducer.createReducer, filterReducer.initialState);   

    useEffect(() => {
        setFilteredCharacters(props.model);
    }, [props.model])
    
    const onCharacterNameChange = (value) => {
        dispatch({
            type: constants.ADDFIELD,
            field: constants.NAME,
            value: value
        });
    }

    const onLocationChange = (value) => {
        dispatch({
            type: constants.ADDFIELD,
            field: constants.LOCATIONNAME,
            value: value
        });        
    }

    const onStatusChange = (value) => {
        dispatch({
            type: constants.ADDFIELD,
            field: constants.STATUS,
            value: value
        });    
    }

    const onSort = (value) => {
        //Burası aslında filterReducer'la birlikte 1 reducer olmalı idi
        var data = utils.sort(props.model, "name", value);
        setFilteredCharacters(data);
    }


    const setLocationOptions = (locations) => {
        return _.map(locations, (l) => {return {value: l.id, text: l.name}});
    }


    const onFilter = () => {
        setFilteredCharacters(utils.getDataByQuery(props.model, query));
    }

    // return (
    //     <LocationContext.Consumer>
    //         { 
    //             (ctx) => {
                    return (
                        <div className="charachert-list">
                            <div className="charachter-list-filter" >
                                <Textbox placeholder="Charachter Name" onModelChange={onCharacterNameChange} />
                                <Dropdownlist id="ddlLocation" modelType="text" placeholder="Please Choose Location" options={setLocationOptions(props.locations)} onModelChange={onLocationChange} />
                                <Dropdownlist id="ddlStatus" modelType="text" placeholder="Please Choose Status" options={charachterStatuses} onModelChange={onStatusChange} />
                                <button onClick={onFilter} >Filter</button>
                                <Dropdownlist id="ddlSort" options={sortOptions} placeholder="Sort" onModelChange={onSort} />
                            </div>
                            <div className="charachters" >
                                {
                                    filteredCharacters && filteredCharacters.map(c => 
                                        <Charachter key={'character' + c.id} model={c} />
                                    )
                                }
                            </div>
                        </div>
                    )
                // }
            // }
       // { </LocationContext.Consumer> }
    //);
}

function mapStateToProps(state) {
    return { 
        locations: state.locations
    };
}

function mapStateToDispatch(dispatch) {
    return { 
        getCharactersByQuery: (query) => dispatch(characterActions.createQuery(query))
    };
}

export default connect(mapStateToProps, mapStateToDispatch)(CharachterList);


