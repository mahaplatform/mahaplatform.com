#!/bin/bash -e

backupfile="hourly-"`date "+%I"`".sql.gz"
backuproot="/var/lib/pgsql/9.6/backups"
mkdir -p $backuproot
pg_dump -h localhost -U maha maha | gzip > $backuproot/backup.sql.gz
s3cmd put backup.sql.gz s3://data.mahaplatform.com/$backupfile
rm -f $backupfile
