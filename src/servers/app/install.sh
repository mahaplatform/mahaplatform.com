# node.image
# ami-086df2a4e864634de

# SETUP APP
mkdir -p /var/www/app/releases
mkdir -m 777 -p /var/www/app/shared/tmp
mkdir -m 777 -p /var/www/app/shared/imagecache
mkdir -m 755 -p /var/www/app/shared/logs
chown -R nobody.nobody /var/www/app/shared/*

# INSTALL RUBY
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable --ruby
source /usr/local/rvm/scripts/rvm
rvm install 2.5.3
rvm use --default 2.5.3
gem update

# INSTALL PASSENGER / NGINX
yum install -y libcurl-devel
gem install passenger --no-ri --no-rdoc
passenger-install-nginx-module --auto --auto-download --languages nodejs
vi /etc/init.d/nginx
chmod 755 /etc/init.d/nginx
mv /opt/nginx/conf/nginx.conf /opt/nginx/conf/nginx.conf.bak
vi /opt/nginx/conf/nginx.conf
vi /etc/logrotate.d/nginx
systemctl daemon-reload
systemctl enable nginx
systemctl start nginx
