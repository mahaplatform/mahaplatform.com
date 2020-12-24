import RichText from '../../richtext'

function TextBlock({ block, data }) {
  return RichText(block.content.text, data)
}

export default TextBlock
