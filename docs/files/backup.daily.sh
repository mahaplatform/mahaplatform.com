#!/bin/bash -e

backupfile="daily-"`date "+%w"`".sql.gz"
backuproot="/var/lib/pgsql/9.6/backups"
mkdir -p $backuproot
pg_dump -h localhost -U maha maha | gzip > $backuproot/backup.sql.gz
s3cmd put backup.sql.gz s3://data.mahaplatform.com/$backupfile
rm -f $backupfile
