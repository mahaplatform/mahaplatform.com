import '../core/services/environment'
import { CLIEngine } from 'eslint'
import chalk from 'chalk'
import glob from 'glob'
import path from 'path'

const lint = async () => {

  const args = process.argv.slice(2)

  const root = args[0] || 'src/web'

  var cli = new CLIEngine({
    useEslintrc: true
  })

  const files = glob.sync(`${root}/**/*.js`).filter(file => {
    if(file.match(/_test/)) return false
    return true
  })

  const { results } = cli.executeOnFiles(files)

  results.filter(result => {
    return result.errorCount > 0
  }).map(result => {
    process.stdout.write(`${chalk.green(result.filePath.replace(`${path.resolve()}/`, ''))}\n`)
    result.messages.map(message => {
      process.stdout.write(`${chalk.red(`[${message.line}:${message.column}]`)} ${chalk.white(message.message)}\n`)
    })
    process.stdout.write('\n')
  })

}

lint().then(process.exit)
