# node.image
# ami-086df2a4e864634de

# INSTALL JDK
yum -y install java-1.8.0-openjdk

# INSTALL LIBREOFFICE
wget https://download.documentfoundation.org/libreoffice/stable/6.2.3/rpm/x86_64/LibreOffice_6.2.3_Linux_x86-64_rpm.tar.gz
tar -xzf LibreOffice_6.2.3_Linux_x86-64_rpm.tar.gz
cd  LibreOffice_6.2.3.2_Linux_x86-64_rpm/RPMS
yum -y localinstall *.rpm
ln -s /opt/libreoffice6.2/program/soffice /usr/bin/soffice
