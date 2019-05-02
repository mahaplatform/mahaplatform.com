import chalk from 'chalk'
import _ from 'lodash'

export const info = (entity, message) => log('i', 'blue', entity, message)

export const error = (entity, message) => log('e', 'red', entity, message)

export const success = (entity, message) => log('s', 'green', entity, message)

export const log = (prefix, color, entity, message) => write([
  { color, length: 2, content: prefix },
  { color: 'grey', content: `[${entity}]` },
  { color: 'white', content: `: ${message}` }
])

export const action = (action, target) => write([
  { color: 'green', length: 10, content: action },
  { color: 'white', content: target }
])


export const write = (items) => {

  if(_.isString(items)) return process.stdout.write(items)

  _.castArray(items).map(item => {

    const content = item.length ? _.padEnd(item.content, item.length) : item.content

    return process.stdout.write(chalk[item.color](content))

  })

  process.stdout.write('\n')

}
