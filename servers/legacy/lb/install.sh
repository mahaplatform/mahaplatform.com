# base.image
# ami-081b06033f1134220

# INSTALL NGINX
yum -y install pcre-static pcre-devel openssl-devel epel-release
yum -y install nginx
echo > /etc/nginx/nginx.conf
vi /etc/nginx/nginx.conf
echo > /usr/share/nginx/html/index.html
vi /usr/share/nginx/html/index.html
systemctl daemon-reload
systemctl enable nginx
systemctl restart nginx

# INSTALL HAPROXY
wget http://www.haproxy.org/download/1.9/src/haproxy-1.9.7.tar.gz
tar -xzf haproxy-1.9.7.tar.gz
cd haproxy-1.9.7
make TARGET=linux2628 USE_OPENSSL=1
make install
mkdir -p /etc/haproxy
mkdir -p /var/lib/haproxy

touch /var/lib/haproxy/stats
ln -s /usr/local/sbin/haproxy /usr/sbin/haproxy
cp examples/haproxy.init /etc/init.d/haproxy
chmod 755 /etc/init.d/haproxy
useradd -r haproxy
vi /etc/haproxy/haproxy.cfg
vi /etc/pki/tls/private/mahaplatform.com.pem
systemctl daemon-reload
systemctl enable haproxy
systemctl start haproxy
