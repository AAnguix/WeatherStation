#!/bin/bash
yes | sudo apt-get update
yes | sudo apt-get upgrade
yes | sudo apt-get install python3-pip && yes | sudo pip3 install --upgrade setuptools

yes | pip3 install RPI.GPIO
yes | pip3 install adafruit-blinka
yes | pip3 install adafruit-circuitpython-dht
yes | sudo apt-get install libgpiod2

apt-get autoremove