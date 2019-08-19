FROM node:12.8.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
RUN npm install
RUN npm install firebase
RUN npm install eslint-plugin-prettier