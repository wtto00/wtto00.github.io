---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: Linux 设置密码过期策略
postSlug: linux-password-expiration-policy
featured: false
draft: false
tags:
  - Linux
description: Linux 服务器登录提示`You must change your password now and login again!`
issue_number: 3
---

> Linux 服务器登录提示 `You must change your password now and login again!`

查看密码策略：

```shell
chage -l wtto
# 最近一次密码修改时间     ：1月 20, 2021
# 密码过期时间     ：4月 20, 2021
# 密码失效时间     ：从不
# 帐户过期时间      ：从不
# 两次改变密码之间相距的最小天数  ：0
# 两次改变密码之间相距的最大天数  ：90
# 在密码过期之前警告的天数 ：7
```

修改最后一次密码修改时间

```shell
chage -d -d wtto
# 第一个 -d 是 chage 的命令参数，表示修改最近一次密码修改时间
# 第二个 -d 表示当前日期，也可以用确定日期值，例如：2021-01-20
```

或者设置密码永不过期

```shell
chage -M -1 wtto
```

**附 chage 命令选项：**
语法：`chage [选项] 用户名`
|选项|说明|
|:---:|:---:|
|-m|密码可更改的最小天数。为零时代表任何时候都可以更改密码。 |
|-M|密码保持有效的最大天数。|
|-w|用户密码到期前，提前收到警告信息的天数。|
|-E|帐号到期的日期。过了这天，此帐号将不可用。|
|-d|上一次更改的日期。|
|-i|停滞时期。如果一个密码已过期这些天，那么此帐号将不可用。|
|-l|例出当前的设置。由非特权用户来确定他们的密码或帐号何时过期。|
