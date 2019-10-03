import chalk from 'chalk'

const log = (...options) => {
  const style = options[0] === 'error' ? chalk.red('e') : chalk.blue('i')
  const service = chalk.grey(`[${options[1]}]`)
  const message = chalk.white(`: ${options[2]}`)
  process.stdout.write(`${style} ${service} ${message}\n`)
}

export default log
