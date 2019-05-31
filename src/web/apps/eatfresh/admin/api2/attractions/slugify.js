const specialChars = {'à':'a','ä':'a','á':'a','â':'a','æ':'a','å':'a','ë':'e','è':'e','é':'e', 'ê':'e','î':'i','ï':'i','ì':'i','í':'i','ò':'o','ó':'o','ö':'o','ô':'o','ø':'o','ù':'o','ú':'u','ü':'u','û':'u','ñ':'n','ç':'c','ß':'s','ÿ':'y','œ':'o','ŕ':'r','ś':'s','ń':'n','ṕ':'p','ẃ':'w','ǵ':'g','ǹ':'n','ḿ':'m','ǘ':'u','ẍ':'x','ź':'z','ḧ':'h','·':'-','/':'-','_':'-',',':'-',':':'-',';':'-'}

export const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/./g,(target, index, str) => specialChars[target] || target)
  .replace(/&/g, '-and-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '')
