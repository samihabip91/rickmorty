import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'
import _ from "lodash";

import appConfig from "../config.json";

import { getIdsByUrls } from '../utils/utils';

export function  getEpisodeList(){
    const observable$ = ajax.get(appConfig.API_URL + 'episode')
        .pipe(
            map(data => data.response.results),
            catchError(error => of(error))
        );

    return observable$;
}

export function getEpisodeById(episodes, id) {
    var episode = _.find(episodes, (e) => e.id == id);

    return episode;
}

export function getEpisodesByUrls(episodes, urls) {
    var ids = getIdsByUrls(urls);

    var result =  _.filter(episodes, (e) => {
        return ids.indexOf(e.id) != -1;
    });

    return result;
}
