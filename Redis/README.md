### redis 安装
  ## shell 添加window服务
  redis-server.exe --service-install [配置文件] --loglevel verbose 
   # 添加
    redis-server.exe --service-install redis.windows.conf --loglevel verbose
   # 卸载
    redis-server.exe --service-uninstall
   # 启动
    redis-server.exe --service-start
   # 停止
    redis-server.exe --service-stop

### Redis提供两种持久化方式
  ## RDB（Redis Database）持久化
   # redis.windows.conf文件配置
    save  3600 1 // 3600秒内也就是一小时进行一次改动就会触发快照
   # dump.rdb
    这个文件就是redis的快照文件，保存了redis的键值对，
   # 适合做数据的备份
  ## AOF（Append Only File）持久化
   appendonly yes //默认为no
    
### redis主从复制
  ## 新建redis-6378.conf文件
    bind 127.0.0.1 #ip地址
    port 6378 #端口号
    daemonize yes #守护线程静默运行
    replicaof 127.0.0.1 6379 #指定主服务器
  ## 启动从服务器
    redis-server ./redis-6378.conf 指定配置文件
  ## 打开从服务器cli
    redis-cli -p 6378
  ## 注意从服务器是不允许写入的操作
  ## keys * 
    查看所有值

