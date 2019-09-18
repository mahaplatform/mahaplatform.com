FROM centos/systemd

RUN yum -y update \
    && yum -y install wget

RUN yum -y install centos-release-scl-rh \
    && yum-config-manager --enable rhel-server-rhscl-7-rpms \
    && yum -y install devtoolset-7

RUN wget https://nodejs.org/dist/v8.14.0/node-v8.14.0.tar.gz \
    && tar -xzf node-v8.14.0.tar.gz \
    && cd node-v8.14.0 \
    && source scl_source enable devtoolset-7 \
    && ./configure \
    && make \
    && make install \
    && cd .. \
    && rm -rf node-v8.14.0

RUN yum -y install java-1.8.0-openjdk

RUN wget https://mirror.clarkson.edu/tdf/libreoffice/stable/6.3.1/rpm/x86_64/LibreOffice_6.3.1_Linux_x86-64_rpm.tar.gz \
    && tar -xzf LibreOffice_6.3.1_Linux_x86-64_rpm.tar.gz \
    && cd LibreOffice_6.3.1.2_Linux_x86-64_rpm/RPMS \
    && yum -y localinstall *.rpm \
    && ln -s /opt/libreoffice6.2/program/soffice /usr/bin/soffice\
    && cd ../.. \
    && rm -rf LibreOffice_6.3.1.2_Linux_x86-64_rpm

RUN yum -y install bzip2 epel-release

RUN yum -y install clamav-server \
    && sed -ie "s/^Example/#Example/" /etc/clamd.d/scan.conf \
    && sed -ie 's/^#TCPSocket/TCPSocket/g' /etc/clamd.d/scan.conf \
    && sed -ie 's/^#TCPAddr/TCPAddr/g' /etc/clamd.d/scan.conf \
    && sed -i -e "s/^Example/#Example/" /etc/freshclam.conf

ADD ../worker/freshclam.service /usr/lib/systemd/system/

RUN systemctl enable clamd@scan \
    && systemctl enable freshclam
