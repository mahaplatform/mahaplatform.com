#!/bin/bash -e

backupfile="hourly-"`date "+%l"`".sql.gz"
backuproot="/var/lib/pgsql/12/backups"
mkdir -p $backuproot
pg_dump -h localhost -U {{ db_user }} {{ db_name }} | gzip > $backuproot/backup.sql.gz
s3cmd put backup.sql.gz s3://data.mahaplatform.com/$backupfile
rm -rf $backuproot/backup.sql.gz
