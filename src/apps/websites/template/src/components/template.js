import ejs from 'ejs'

const template = (content, data) => {
  return ejs.render(content, { data })
}

export default template
