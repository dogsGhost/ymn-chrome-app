// sort an array of date strings from newest to oldest
export const sortDatesDesc = (arr) => {
  return [].concat(arr).sort((a, b) => new Date(b) - new Date(a));
};

// convert milliseconds to days
export const convertMsToDays = (val) => Math.round(val / 1000 / 60 / 60 / 24);

// get the sum of two values
export const sum = (a, b) => a + b;

// returns an array of num of ms between two neighboring values in passed array
export const diffDates = (arr) => {
  return arr.map((cur, i, arr) => {
    let next = arr[i + 1];
    return next ? new Date(cur) - new Date(next) : 0;
  });
};

// sets the time for a date object to midnight
export const zeroHourDate = (dateString) => {
  dateString = dateString || null;
  return new Date(new Date().toDateString(dateString));
};

// get date object of current date with time at midnight
export const getCurDate = () => zeroHourDate();

// convert a date to a normalized date string 'YYYY-MM-DD'
export const normalizeDateString = (dateObj) => {
  let date = dateObj.toLocaleDateString();
  // toLocaleDateString is implementation-dependent, so we have to check
  // the format and change it accordingly.
  if (/\//.test(date)) {
    date = date.split('/');
    let month = date[0].length < 2 ? `0${date[0]}` : date[0];
    let day = date[1].length < 2 ? `0${date[1]}` : date[1];
    date = `${date[2]}-${month}-${day}`;
  } else {
    const monthKey = {
      'January': '01',
      'February': '02',
      'March': '03',
      'April': '04',
      'May': '05',
      'June': '06',
      'July': '07',
      'August': '08',
      'September': '09',
      'October': '10',
      'November': '11',
      'December': '12'
    };
    date = date.split(' ');
    // see if day is one or two digits, remove comma
    day = date[1].length < 3 ? `0${date[1].charAt(0)}` : date[1].slice(0, -1);
    date = `${date[2]}-${monthKey[date[0]]}-${day}`;
  }

  return date;
};
