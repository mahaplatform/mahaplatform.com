import { spawn } from 'child_process'

const exec = (command, cwd) => new Promise((resolve, reject) => {

  const parts = command.split(' ')

  const child = spawn(parts[0], parts.slice(1), { cwd, stdio: 'inherit' })

  child.on('error', (err) => reject(err.toString()))

  child.on('exit', (data) => resolve())

})

export default exec
