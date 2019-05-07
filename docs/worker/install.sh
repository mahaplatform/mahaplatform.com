# node.image
# ami-086df2a4e864634de

# SETUP APP
mkdir -p /var/www/app/releases
mkdir -m 777 -p /var/www/app/shared/tmp
mkdir -m 777 -p /var/www/app/shared/imagecache
chown -R nobody.nobody /var/www/app/shared/*

# INSTALL JDK
yum -y install java-1.8.0-openjdk

# INSTALL LIBREOFFICE
wget https://download.documentfoundation.org/libreoffice/stable/6.2.3/rpm/x86_64/LibreOffice_6.2.3_Linux_x86-64_rpm.tar.gz
tar -xzf LibreOffice_6.2.3_Linux_x86-64_rpm.tar.gz
cd  LibreOffice_6.2.3.2_Linux_x86-64_rpm/RPMS
yum -y localinstall *.rpm
ln -s /opt/libreoffice6.2/program/soffice /usr/bin/soffice

# INSTALL pm2
npm install -g pm2
