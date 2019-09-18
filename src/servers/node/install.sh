# base.image
# ami-081b06033f1134220

# INSTALL NODEJS
wget https://nodejs.org/dist/v8.14.0/node-v8.14.0.tar.gz
tar -xzf node-v8.14.0.tar.gz
cd node-v8.14.0
./configure
make
make install

# SETUP DEPLOYMENT
yum -y install git
vi ~/.ssh/deploy
chmod 600 ~/.ssh/deploy
vi ~/.ssh/config
chmod 600 ~/.ssh/config

# SETUP APP
mkdir -p /var/www/app

# INSTALL JDK
yum -y install java-1.8.0-openjdk

# INSTALL LIBREOFFICE
wget https://mirror.clarkson.edu/tdf/libreoffice/stable/6.3.1/rpm/x86_64/LibreOffice_6.3.1_Linux_x86-64_rpm.tar.gz
tar -xzf LibreOffice_6.3.1_Linux_x86-64_rpm.tar.gz
cd LibreOffice_6.3.1.2_Linux_x86-64_rpm/RPMS
yum -y localinstall *.rpm
ln -s /opt/libreoffice6.2/program/soffice /usr/bin/soffice

# SETUP APP
mkdir -p /var/www/app/releases
mkdir -m 777 -p /var/www/app/shared/tmp
mkdir -m 777 -p /var/www/app/shared/imagecache
mkdir -m 755 -p /var/www/app/shared/logs
chown -R centos.centos /var/www/app/shared/*
