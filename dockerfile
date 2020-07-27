FROM node:12.18.2-buster
WORKDIR /app
COPY /cOutput/. ./cOutput/
COPY /node_modules/. ./node_modules/
WORKDIR /app/graphqlProxy
COPY /graphqlProxy/cfg.json ./
ENV CfgPath="/app/graphqlProxy/cfg.json"
EXPOSE 8888
ENTRYPOINT [ "node", "/app/cOutput/graphqlProxy/entrypoint.js"]