module.exports = {
  apps: [
    {
      name: 'worker_'+process.env.NODE_ENV,
      script: './dist/worker.js',
      cwd: process.env.PWD,
      error_file: process.env.PWD + '/logs/worker.err.log',
      out_file: process.env.PWD + '/logs/worker.out.log',
      exec_mode: 'fork_mode'
    }, {
      name: 'cron_'+process.env.NODE_ENV,
      script: './dist/cron.js',
      cwd: process.env.PWD,
      error_file: process.env.PWD + '/logs/cron.err.log',
      out_file: process.env.PWD + '/logs/cron.out.log',
      exec_mode: 'fork_mode'
    }
  ]
}
