module.exports = {
  apps: [
    {
      name: 'worker_'+process.env.NODE_ENV,
      script: './current/dist/worker.js',
      instances: 4,
      cwd: process.env.PWD,
      error_file: process.env.PWD + '/logs/worker.err.log',
      out_file: process.env.PWD + '/logs/worker.out.log',
      exec_mode: 'fork_mode'
    }, {
      name: 'cron_'+process.env.NODE_ENV,
      script: './current/dist/cron.js',
      instances: 1,
      cwd: process.env.PWD,
      error_file: process.env.PWD + '/logs/cron.err.log',
      out_file: process.env.PWD + '/logs/cron.out.log',
      exec_mode: 'fork_mode'
    }
  ]
}
