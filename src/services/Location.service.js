import appConfig from "../config.json";
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { tap, map, catchError } from 'rxjs/operators'

export function  getLocationList(){
    const observable$ = ajax.get(appConfig.API_URL + 'location')
        .pipe(
            tap(data => console.log('tap', data)),
            map(data => data.response.results),
            catchError(error => of(error))
        );

    return observable$;
}
