# pm2 start pm2.config.js --env development --watch --ignore-watch="node_modules"
# pm2 logs

./node_modules/.bin/pm2 start pm2.config.js --env development --watch --ignore-watch="node_modules"
./node_modules/.bin/pm2 logs

# scp ./xxx.tgz root@xx:xx:xx:xx@:/home