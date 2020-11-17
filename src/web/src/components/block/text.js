import RichText from '../../richtext'

function TextBlock({ config }) {
  return RichText(config.body, config.style)
}

export default TextBlock
