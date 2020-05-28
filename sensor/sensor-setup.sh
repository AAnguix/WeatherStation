#!/bin/bash
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install python3-pip && sudo python3 -m pip install --upgrade pip setuptools wheel
sudo pip3 install Adafruit_DHT

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs