export function str2unicode(input: string) {
  return input
    .split('')
    .map(function (value) {
      const temp = value.charCodeAt(0).toString(16).toUpperCase();
      if (temp.length > 2) {
        return '_u' + temp;
      }
      return value;
    })
    .join('');
}
