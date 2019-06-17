module.exports = {
  apps: [{
    name: 'worker',
    script: './worker.js',
    instances: 4,
    cwd: process.env.PWD+'/current/web',
    error_file: './logs/worker.err.log',
    out_file: './logs/worker.out.log',
    exec_mode: 'fork_mode'
  },{
    name: 'cron',
    script: './cron.js',
    instances: 1,
    cwd: process.env.PWD+'/current/web',
    error_file: './logs/cron.err.log',
    out_file: './logs/cron.out.log',
    exec_mode: 'fork_mode'
  }]
}
