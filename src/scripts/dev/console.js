import wrapAnsi from 'wrap-ansi'
import chalk from 'chalk'
import _ from 'lodash'

const red = '#db2828'
const green = '#21ba45'
const blue = '#2185d0'
const white = '#FFFFFF'

export const write = (message) => process.stdout.write(message+'\n')

export const info = (entity, message) => log(blue, entity, message)

export const error = (entity, message) => log(red, entity, message)

export const success = (entity, message) => log(green, entity, message)

export const log = (color, entity, message) => _.castArray(message).map(message => output([
  { color, content: `[${entity}]` },
  { color: white, content: `: ${message}` }
]))

export const action = (action, target) => output([
  { color: green, length: 10, content: action },
  { color: white, content: target }
])


export const output = (items) => {

  if(_.isString(items)) return process.stdout.write(items)

  _.castArray(items).map(item => {

    const content = item.length ? _.padEnd(item.content, item.length) : item.content

    return process.stdout.write(chalk.hex(item.color)(content))

  })

  process.stdout.write('\n')

}

export const writePaddedLine = (label, text = '') => {

  const width = process.stdout.columns

  const labelWidth = (label) ? stripAnsi(label).length : 0

  const contentWidth = width - labelWidth - 6

  const padded = wrapAnsi(text, contentWidth, { hard: true }).split('\n').map((chunkLine, index)=> {

    const intro = label ? (index === 0 ? `${label} ` : Array(labelWidth + 2).join(' ')) : ''

    const line = intro + chunkLine

    const stripped = stripAnsi(line)

    const extraWidth = width - stripped.length - 4

    const extra = extraWidth > 0 ? Array(extraWidth).join(' ') : ''

    return chalk.grey('  ' +  line + extra + '\n')


  }).join('')

  process.stdout.write(padded)

}

const stripAnsi = (text) => text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
