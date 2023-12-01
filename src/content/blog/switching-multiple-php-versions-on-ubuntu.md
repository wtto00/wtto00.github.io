---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: Ubuntu下切换多个PHP版本
postSlug: switching-multiple-php-versions-on-ubuntu
featured: false
draft: false
tags:
  - PHP
description: Ubuntu下切换多个PHP版本
issue_number: 16
---

安装 PHP 7和PHP 5

```bash
sudo apt search php7
sudo apt install php7.4

sudo apt search php5
sudo apt install php5.6
```

如果搜索不到所要安装版本，添加PPA之后，再搜索安装

```bash
sudo add-apt-repository -y ppa:ondrej/php
sudo apt update

```

从 PHP 7.4 切换到 PHP 5.6

- 首先使用命令禁用 PHP 7.2 模块：

  ```bash
  sudo a2dismod php7.4
  ```

- 启用 PHP 5.6 模块：

  ```bash
  sudo a2enmod php5.6
  ```

- 将 PHP 5.6 设置为默认版本：

  ```bash
  sudo update-alternatives --set php /usr/bin/php5.6
  ```

  或者，你可以运行以下命令来设置默认情况下要使用的全局 PHP 版本。

  ```bash
  sudo update-alternatives --config php
  # 输入选择的号码将其设置为默认版本，或者只需按回车键保持当前选择。
  ```

- 如果你已安装其他 PHP 扩展，请将它们设置为默认值。如果没有安装，可忽略此步骤。

  ```bash
  sudo update-alternatives --set phar /usr/bin/phar5.6
  ```

- 最后，重启 Apache Web 服务器：

  ```bash
  sudo service apache2 restart
  ```

从 PHP 5.6 切换到 PHP 7.4

```bash
sudo a2enmod php7.4
sudo a2dismod php5.6
sudo update-alternatives --set php /usr/bin/php7.4
sudo service apache2 restart
```

> 最终稳定版 PHP 5.6 于 2017 年 1 月 19 日达到活跃支持截止。但是，直到 2018 年 12 月 31 日，PHP 5.6 将继续获得对关键安全问题的支持。所以，建议尽快升级所有 PHP 程序并与 PHP 7.x 兼容。
