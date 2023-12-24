export function str2unicode(input: string) {
  return input
    .split('')
    .map(function (value) {
      const temp = value.charCodeAt(0).toString(16).toUpperCase();
      if (temp.length > 2) {
        return `u_${temp}`;
      }
      return value;
    })
    .join('');
}
