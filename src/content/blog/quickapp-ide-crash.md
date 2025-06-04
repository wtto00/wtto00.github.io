---
title: 快应用IDE打不开一直闪退
postSlug: quickapp-ide-crash
featured: false
draft: false
tags:
  - quickapp
description: 快应用IDE打不开一直闪退，端口占用，权限拒绝，端口冲突
pubDatetime: 2025-06-04T09:33:46.206Z
updateTime: 2025-06-04T09:33:46.206Z
---

下载[快应用 IDE](https://www.quickapp.cn/document?menu=4%252C55%252C74)，安装后一直闪退打不开，网上搜了好久，说是要管理员运行，结果依然不行。

1. 查看日志

   查看最新日志文件 `C:\Users\{user}\AppData\Roaming\快应用开发工具\logs`，发现有报错如下：

   ```plaintext
   [2025-06-04 16:59:43.879] [main] [error] [uncaught exception in main]: Error: listen EACCES: permission denied 0.0.0.0:57890
   [2025-06-04 16:59:43.879] [main] [error] Error: listen EACCES: permission denied 0.0.0.0:57890
       at Server.setupListenHandle [as _listen2] (node:net:1317:21)
       at listenInCluster (node:net:1382:12)
       at Server.listen (node:net:1469:7)
       at C.createServer (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:71:30523)
       at new C (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:71:30430)
       at P._createInstance (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:29:1332)
       at P._createServiceInstance (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:29:3729)
       at P._createServiceInstanceWithOwner (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:29:3245)
       at P._createAndCacheServiceInstance (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:29:2920)
       at P._safeCreateAndCacheServiceInstance (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:29:2122)
       at P._getOrCreateServiceInstance (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:29:1843)
       at Object.get (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:29:449)
       at Dt.initChannels (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:91:77889)
       at D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:91:70778
       at P.invokeFunction (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:29:319)
       at Dt.startup (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:91:70754)
       at async ue.startup (D:\Documents\Quick App IDE\resources\app\out\vs\code\electron-main\main.js:93:2174)
   [2025-06-04 16:59:43.892] [main] [info] ExtensionHostStarterWorker created
   ```

1. 看起来是端口占用，无法监听端口 57890 的问题

   执行 `netstat -ano | findstr :57890`，发现并没有程序占用此端口。

1. 可能是 `Hyper-V` 或 `Docker` 保留端口范围导致冲突

   执行 `netsh int ipv4 show excludedportrange protocol=tcp` 查看保留端口范围，得到结果如下：

   ```plaintext
   协议 tcp 端口排除范围

   ----------    --------
       49675       49774
       49775       49874
       49875       49974
       50000       50059     *
       50060       50159
       50162       50261
       50262       50361
       51061       51160
       57633       57732
       57833       57932
       57933       58032
       58033       58132
       58133       58232

   * - 管理的端口排除。
   ```

   端口 `57890` 在 `57833~57932` 之间，那么确实是这个问题了。

1. 释放冲突端口 `57890`

   使用管理员打开终端 `Poswer Shell`，执行以下命令：

   ```shell
   net stop winnat
   netsh int ipv4 add excludedportrange protocol=tcp startport=57890 numberofports=1
   net start winnat
   ```

1. 现在可以成功打开 `快应用开发工具` 了。
