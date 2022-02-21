import _ from 'lodash';

export function getIdsByUrls(urls) {
    var ids = urls.map(u => {
        var parts = u.split('/');

        return parseInt(parts[parts.length - 1]);
    });

    return ids;
}

export function getIdsStringByUrls(urls) {
    return getIdsByUrls(urls).join(',');
}

export function getDataByQuery(data, query) {
    const filteredData = _.filter(data, (item) => {
        for(let key in query) {
            var value = getNestedValue(item, key);

            if(value === undefined ? true : !value.includes(query[key]))
                return false;
        }

        return true;
    });

    return filteredData;
}

export function getNestedValue(item, key) {
    var fields = key.split('.');
    var value = item[fields[0]];

    if(fields.length > 1) {
        for(var i = 1; i < fields.length; i++) {
            value = getNestedValue(value, fields[i]); 
        }
    }

    return value;
}

export function sort(data, field, type) {
    var sortedData = _.sortBy(data, field);

    if(type == 2)
        sortedData = sortedData.reverse();

    return sortedData;
}