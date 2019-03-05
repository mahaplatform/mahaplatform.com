import emojiUnicode from 'emoji-unicode'
import emoticons from './emoticons'

const EMOJI_REGEX = /((?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*)/g

const emojify = (text) => {

  const transforms = emoticons.map(emoticon => ({
    regex: emoticon.regex,
    replacement: emoticon.unicode.split('-').map(codepoint => String.fromCodePoint(`0x${codepoint}`)).join('')
  }))

  const transformed = transforms.reduce((html, transform) => {
    return html.replace(transform.regex, transform.replacement)
  }, text)

  const matches = transformed.match(EMOJI_REGEX)

  if(!matches) return transformed

  const data = matches.reduce((data, emoji, index) => {

    const destructured = [...emoji]

    const unicode = destructured ? destructured.map(code => emojiUnicode(code)).join('-') : emojiUnicode(emoji)

    const codePoint = unicode.split('-').map(code => String.fromCodePoint(`0x${code}`)).join('')

    return {
      text: data.text.replace(emoji, `<span class="emoji emoji-${unicode}">$${index}</span>`),
      substitutions: [
        ...data.substitutions,
        codePoint
      ]
    }

  }, { text: transformed, substitutions: [] })

  return data.substitutions.reduce((text, substitution, index) => {

    return text.replace(`$${index}`, substitution)

  }, data.text)

}

export default emojify
