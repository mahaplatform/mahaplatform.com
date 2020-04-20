# ami-02eac2c0129f6376b

# ALLOW ROOT ACCESS
sudo sed -i 's/#PermitRootLogin/PermitRootLogin/' /etc/ssh/sshd_config
sudo sed -i 's/.*ssh-rsa/ssh-rsa/' /root/.ssh/authorized_keys
sudo sed -i 's/#Port 22/Port 2244/' /etc/ssh/sshd_config
sudo semanage port -a -t ssh_port_t -p tcp 2244
sudo systemctl restart sshd

# ADD SSH KEYS
sudo vi /root/.ssh/authorized_keys

# UPDATE SERVER
yum -y update
yum -y install wget

# INSTALL NTP
yum -y install ntp
ntpdate -s time.nist.gov
systemctl daemon-reload
systemctl enable ntpd
systemctl start ntpd
rm -rf /etc/localtime
ln -s /usr/share/zoneinfo/US/Eastern /etc/localtime

# INSTALL DEVTOOLSET-7
yum -y install centos-release-scl-rh
yum-config-manager --enable rhel-server-rhscl-7-rpms
yum -y install devtoolset-7
scl enable devtoolset-7 bash
echo > ~/.bashrc
vi ~/.bashrc
echo > ~/.bash_profile
vi ~/.bash_profile
