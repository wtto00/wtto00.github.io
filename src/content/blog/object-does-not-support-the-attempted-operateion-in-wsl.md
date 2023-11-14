---
author: wtto00
pubDatetime: 2021-11-18T03:09:48.000Z
title: WSL 提示 “参考的对象类型不支持尝试的操作。”
postSlug: object-does-not-support-the-attempted-operateion-in-wsl
featured: false
draft: false
tags:
  - WSL
description: "打开注册表，\\HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\WinSock2\\Parameters\\AppId_Catalog\\343305C9 新建 AppFullPath=C:\\Windows\\System32\\lsass.exe"
issue_number: 22
---

参考 <https://github.com/microsoft/WSL/issues/4177#issuecomment-829196951>

- 打开注册表
  `win+r` 输入 `regedit`
- 找到注册表 `计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WinSock2\Parameters\AppId_Catalog\`
- 在 `AppId_Catalog` 下新建项 `343305C9`
- 在 `343305C9` 下新建 `字符串值`
  `AppFullPath=C:\Windows\System32\lsass.exe`
- 在 `343305C9` 下新建 `DWORD(32位)值`
  `PermittedLspCategories=80000000`
