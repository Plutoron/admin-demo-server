mkdir node 
cp -r server node/
cp package* node/
cp pm2.config.js node/
cp -r node_modules node/
cp -r logs node/

tar -czvf node.tar.gz node
scp ./company.tar.gz root@47.104.11.142:/home
# Lyz@web123