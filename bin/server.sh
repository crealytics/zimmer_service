#!/usr/bin/env bash
until nc -z postgres $ZIMMER_SERVICE_POSTGRES_PORT; do echo Waiting for Posgres; sleep 1; done

# install dependencies and clean old ones at the same time

bundle exec rake db:create db:migrate db:seed

bundle exec rails s -b 0.0.0.0 -p 3000
