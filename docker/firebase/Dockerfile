FROM node:10.15.3-alpine 

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# firebase
RUN yarn global add firebase-tools
RUN yarn add --dev firebase-tools

