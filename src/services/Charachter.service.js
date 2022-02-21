import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'
import _ from 'lodash';

import appConfig from "../config.json";
import * as utils from '../utils/utils';

export function  getCharachterList(charachterIds){
    var charachterIdsString = Array.isArray(charachterIds) ? charachterIds.join(',') : charachterIds;

    const observable$ = ajax.get(appConfig.API_URL + 'character/' + charachterIdsString)
        .pipe(
            map(data => data.response),
            catchError(error => of(error))
        );

    return observable$;
}

export function getCharacterById(characters, id) {
    return _.find(characters, (c) => {
        return c.id == id;
    });
}

export function getMissingCharacters(characters, ids) {
    var characterIds = characters.map(c => c.id);
    var missingIds = _.filter(ids, (id) => characterIds.indexOf(parseInt(id)) == -1);

    return getCharachterList(missingIds);
}

export function getCharactersByIds(characters, ids) {
    var idNumberArr = ids.map(id => parseInt(id));
    var result = _.filter(characters, (c) => idNumberArr.indexOf(c.id) != -1);

    return result;
}

export function getCharactersByQuery(characters, query) {
    return utils.getDataByQuery(characters, query)
}