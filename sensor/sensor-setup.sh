#!/bin/bash
sudo apt-get update
sudo apt-get upgrade
sudo apt upgrade python3
sudo apt-get install python3-pip && sudo pip3 install --upgrade setuptools
pip3 install adafruit-circuitpython-dht
sudo apt-get install libgpiod2

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
apt-get autoremove