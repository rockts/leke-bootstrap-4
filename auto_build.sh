#! /bin/bash

SITE_PATH='/var/www/html'
USER='leke'
USERGROUP='leke'

cd $SITE_PATH
git reset --hard origin/master
git clean -f
git pull
git checkout master
chown -R $USER:$USERGROUP $SITE_PATH


