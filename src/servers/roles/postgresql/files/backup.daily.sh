#!/bin/bash -e

backupfile="daily-"`date "+%w"`".sql.gz"
backuproot="/var/lib/pgsql/12/backups"
pg_dump -h 127.0.0.1 -U {{ db_user }} {{ db_name }} | gzip > $backuproot/$backupfile
aws s3 mv $backuproot/$backupfile s3://data.mahaplatform.com/maha/$backupfile
