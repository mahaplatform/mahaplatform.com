# base.image
# ami-081b06033f1134220

# INSTALL POSTGRESQL
yum -y install https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-6-x86_64/pgdg-centos96-9.6-3.noarch.rpm
yum -y install postgresql96 postgresql96-server
service postgresql-9.6 initdb
chkconfig postgresql-9.6 on
service postgresql-9.6 start
vi /var/lib/pgsql/9.6/data/pg_hba.conf
> host   all   all   0.0.0.0/0   md5
vi /var/lib/pgsql/9.6/data/postgresql.conf
> listen_address = '*'
su postgres
createuser --interactive
createdb maha
psql
> ALTER USER maha WITH PASSWORD '<PASSWORD>';
> GRANT ALL PRIVILEGES ON DATABASE maha TO maha;
exit
vi ~/.pgpass
chmod 600 ~/.pgpass
service postgresql-9.6 restart

# INSTALL REDIS
wget http://download.redis.io/releases/redis-4.0.0.tar.gz
tar -xzf redis-4.0.0.tar.gz
cd redis-4.0.0/deps
make hiredis jemalloc linenoise lua geohash-int
cd ..
make
make install
cd utils
vi redis-setup.sh
chmod 755 redis-setup.sh
./redis-setup.sh
vi /etc/redis/redis.conf
> bind 0.0.0.0
> requirepass
service redis restart

# BACKUP
cd /etc/yum.repos.d
wget http://s3tools.org/repo/RHEL_6/s3tools.repo
yum -y install s3cmd
s3cmd --configure
vi /etc/cron.hourly/backup.sh
chmod 755 /etc/cron.hourly/backup.sh
vi /etc/cron.daily/backup.sh
chmod 755 /etc/cron.daily/backup.sh
