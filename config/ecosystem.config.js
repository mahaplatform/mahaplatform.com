module.exports = {
  apps: [
    {
      name: 'worker_'+process.env.NODE_ENV,
      script: './dist/worker.js',
      cwd: process.env.PWD + '/current',
      error_file: process.env.PWD + '/current/logs/worker.err.log',
      out_file: process.env.PWD + '/current/logs/worker.out.log',
      exec_mode: 'fork_mode'
    }
  ]
}
