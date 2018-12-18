#!/usr/bin/env bash
git pull
ng build --aot --base-href /AdminConsole/ --configuration=production
rm -rf /home/pi/Tomcat/apache-tomcat-8.5.35/webapps/AdminConsole/*
cp -rf dist/AdminConsole/* /home/pi/Tomcat/apache-tomcat-8.5.35/webapps/AdminConsole
sudo /etc/init.d/tomcat stop
sudo /etc/init.d/tomcat start