import moment from 'moment';

export function sortObjectByStringAscending(array = [], sortAccessor) {
  return array.sort((a, b) => {
    const stringA = a[sortAccessor].toLowerCase();
    const stringB = b[sortAccessor].toLowerCase();

    let comparison = 0;
    if (stringA > stringB) {
      comparison = 1;
    } else if (stringA < stringB) {
      comparison = -1;
    }
    return comparison;
  });
}

export function sortObjectByStringDescending(array = [], sortAccessor) {
  return array.sort((a, b) => {
    const stringA = a[sortAccessor].toLowerCase();
    const stringB = b[sortAccessor].toLowerCase();

    let comparison = 0;
    if (stringB > stringA) {
      comparison = 1;
    } else if (stringB < stringA) {
      comparison = -1;
    }
    return comparison;
  });
}

export function sortObjectByDateAscending(array = [], sortAccessor) {
  return array.sort((a, b) => {
    const dateStringA = a[sortAccessor];
    const timeStringA = a.time;
    const dateA = moment(`${dateStringA} ${timeStringA}`).toDate();

    const dateStringB = b[sortAccessor];
    const timeStringB = b.time;
    const dateB = moment(`${dateStringB} ${timeStringB}`).toDate();

    return dateA - dateB;
  });
}

export function sortObjectByDateDescending(array = [], sortAccessor) {
  return array.sort((a, b) => {
    const dateStringA = a[sortAccessor];
    const timeStringA = a.time;
    const dateA = moment(`${dateStringA} ${timeStringA}`).toDate();

    const dateStringB = b[sortAccessor];
    const timeStringB = b.time;
    const dateB = moment(`${dateStringB} ${timeStringB}`).toDate();

    return dateB - dateA;
  });
}
