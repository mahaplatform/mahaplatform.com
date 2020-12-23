import RichText from '../../richtext'

function TextBlock({ block }) {
  return RichText(block.content.text)
}

export default TextBlock
