FROM node:latest
COPY ["package.json", "package-lock.json", "/usr/src/backend/"]
COPY ["Crontab_Easyner_vROMA.txt", "/var/spool/cron/crontabs/root/"]

WORKDIR /usr/src/backend

RUN npm install

RUN npm install -D

COPY [".", "/usr/src/backend/"]

EXPOSE 3000

CMD npm start


