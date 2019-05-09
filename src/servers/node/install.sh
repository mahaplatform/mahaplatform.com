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
