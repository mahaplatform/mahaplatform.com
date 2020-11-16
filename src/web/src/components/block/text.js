import RichText from '../richtext'

function TextBlock({ children, config }) {
  return RichText(config.body, config)
}

export default TextBlock
