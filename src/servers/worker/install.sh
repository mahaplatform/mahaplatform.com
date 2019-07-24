# node.image
# ami-086df2a4e864634de

# INSTALL bzip2
yum install -y bzip2

# INSTALL pm2
npm install -g pm2

# INSTALL clamav
yum -y install epel-release
yum -y install clamav-server
sed -ie "s/^Example/#Example/" /etc/clamd.d/scan.conf
sed -ie 's/^#TCPSocket/TCPSocket/g' /etc/clamd.d/scan.conf
sed -ie 's/^#TCPAddr/TCPAddr/g' /etc/clamd.d/scan.conf
sed -i -e "s/^Example/#Example/" /etc/freshclam.conf
vi /usr/lib/systemd/system/freshclam.service
systemctl enable clamd@scan
systemctl enable freshclam
systemctl start clamd@scan
systemctl start freshclam
