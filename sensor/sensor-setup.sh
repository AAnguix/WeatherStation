#!/bin/bash
yes | sudo apt-get update
yes | sudo apt-get upgrade
yes | sudo apt upgrade python3
yes | sudo apt-get install python3-pip && yes | sudo pip3 install --upgrade setuptools
yes | pip3 install adafruit-circuitpython-dht
yes | sudo apt-get install libgpiod2

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
apt-get autoremove