# base.image
# ami-081b06033f1134220

# INSTALL MYSQL
yum -y install mariadb-server mariadb
systemctl start mariadb
mysql_secure_installation

# INSTALL APACHE
yum -y install httpd php php-mysql mod_ssl
systemctl start httpd.service
systemctl enable httpd.service
