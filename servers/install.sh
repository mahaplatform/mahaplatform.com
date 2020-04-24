# ami-02eac2c0129f6376b

# on mac laptop
sudo easy_install pip
sudo -H pip install boto boto3 ansible

# reinstall xcode
sudo rm -rf $(xcode-select -print-path)
xcode-select --install

# test ansible
ansible -i ./hosts all -m ping
ansible -i ./hosts all -a "/bin/echo hello"
