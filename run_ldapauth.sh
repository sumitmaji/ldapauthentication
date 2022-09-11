#!/bin/bash

source configuration

: ${PATH_TO_CHART:=chart}

./build.sh
./tag_push.sh

helm uninstall $RELEASE_NAME
helm install $RELEASE_NAME $PATH_TO_CHART