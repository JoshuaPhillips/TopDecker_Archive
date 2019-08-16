const uppercaseAlphaNumString = text => {
  let letterRegex = /^[A-Za-z]+$/;

  let result = text
    .split('')
    .map(char => {
      return char.match(letterRegex) ? chart.toUpperCase() : char;
    })
    .join('');

  return result;
};

module.exports = uppercaseAlphaNumString;
