#!/bin/bash

echo "json-type-check" &&\
cd ../json-type-check && rm -rf node_modules && npm install &&\

echo "redux-api-request" &&\
cd ../redux-api-request && rm -rf node_modules && npm install &&\

echo "redux-local-storage" &&\
cd ../redux-local-storage && rm -rf node_modules && npm install &&\

echo "redux-rubberstamp" &&\
cd ../redux-rubberstamp && rm -rf node_modules && npm install &&\

echo "backframe" &&\
cd ../backframe && rm -rf node_modules && npm install &&\

echo "reframe" &&\
cd ../reframe && rm -rf node_modules && npm install &&\

echo "imagecachejs" &&\
cd ../imagecachejs && rm -rf node_modules && npm install &&\

echo "maha" &&\
cd ../maha && rm -rf node_modules && npm install &&\

echo "maha-competencies" &&\
cd ../maha-competencies && rm -rf node_modules && npm install &&\

echo "maha-expenses" &&\
cd ../maha-expenses && rm -rf node_modules && npm install &&\

echo "maha-eatfresh" &&\
cd ../maha-eatfresh && rm -rf node_modules && npm install &&\

echo "mahaplatform.com" &&\
cd ../mahaplatform.com && rm -rf node_modules && npm install
