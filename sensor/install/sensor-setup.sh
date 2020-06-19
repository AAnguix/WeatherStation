#!/bin/bash
#https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/python-setup

yes | sudo apt-get update
yes | sudo apt-get upgrade
yes | sudo pip3 install --upgrade setuptools

yes | pip3 install RPI.GPIO
yes | pip3 install adafruit-blinka
yes | pip3 install adafruit-circuitpython-dht
yes | sudo apt-get install libgpiod2

apt-get autoremove