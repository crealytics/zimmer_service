FROM ruby:2.4.0

WORKDIR /home/app/zimmer_service

RUN useradd -u 1000 app
RUN chown app.app /home/app
ADD Gemfile* /home/app/zimmer_service/

RUN apt-get update && apt-get install -y netcat nodejs-legacy npm
RUN bundle install --clean

USER app
