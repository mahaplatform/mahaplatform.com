module.exports = {
  apps: [{
    name: 'worker_'+process.env.NODE_ENV,
    script: './dist/worker.js',
    instances: 4,
    cwd: process.env.PWD+'/current',
    error_file: './logs/worker.err.log',
    out_file: './logs/worker.out.log',
    exec_mode: 'fork_mode'
  },{
    name: 'cron_'+process.env.NODE_ENV,
    script: './dist/cron.js',
    instances: 1,
    cwd: process.env.PWD+'/current',
    error_file: './logs/cron.err.log',
    out_file: './logs/cron.out.log',
    exec_mode: 'fork_mode'
  }]
}
