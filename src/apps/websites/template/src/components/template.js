import ejs from 'ejs/ejs.min.js'

const template = (content, data) => {
  return ejs.render(content, { data })
}

export default template
