#!/bin/bash
PROJECT_DIR = '/var/www/html'
echo 'start'
cd $PROJECT_DIR
echo 'pull code'
git reset --hard origin/master && git clean -f
git pull && git checkout master
echo 'run npm install'
npm install
echo 'finished'
