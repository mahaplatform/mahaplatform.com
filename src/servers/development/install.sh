# INSTALL clamav
brew install clamav
ln -s /usr/local/Cellar/clamav/0.101.2/sbin/clamd /usr/local/sbin/clamd
cd /usr/local/etc/clamav/
cp freshclam.conf.sample freshclam.conf
sed -ie 's/^Example/#Example/g' freshclam.conf
freshclam -v
cp clamd.conf.sample clamd.conf
sed -ie 's/^TCPSocket/#TCPSocket/g' clamd.conf
sed -ie 's/^TCPAddr/#TCPAddr/g' clamd.conf
sudo vi /Library/LaunchDaemons/org.macports.clamd.plist
sudo vi /Library/LaunchDaemons/org.macports.freshclam.plist
launchctl load -w /Library/LaunchDaemons/org.macports.clamd.plist
launchctl load -w /Library/LaunchDaemons/org.macports.freshclam.plist
