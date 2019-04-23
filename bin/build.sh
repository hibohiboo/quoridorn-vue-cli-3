#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..
docker_dir=$parent_dir/docker
container_name=${1:-quoridorn}

# $container_nameの有無をgrepで調べる
docker ps | grep $container_name

# grepの戻り値$?の評価。 grep戻り値 0:一致した 1:一致しなかった
if [ $? -eq 0 ]; then
  # 一致したときの処理
  cd $docker_dir && docker-compose exec $container_name yarn run build
else
  # 一致しなかった時の処理
  # コンテナを立ち上げて接続
  cd $docker_dir && docker-compose run $container_name yarn run build
fi

# distフォルダに出力されたビルド内容をquoridornの名前に変更してapp/publicの下に移動

mv -T $parent_dir/dist/dist $parent_dir/app/public/quoridorn
