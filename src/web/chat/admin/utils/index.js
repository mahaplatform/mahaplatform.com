export const toOxfordList = (array) => {
  return (array.length < 3) ? array.join(' and ') : array.slice(0, -1).join(', ') + ', and ' + array.slice(-1)
}
