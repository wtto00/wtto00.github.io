---
issue_number: 40
title: Winsock module breaks WSL2
---

[issues #4177](https://github.com/microsoft/WSL/issues/4177#issuecomment-1429113508)

## 如果应用商店安装了`Windows Subsystem for Linux`

1. 首先找到安装位置，最简单的方法是，打开应用商店，找到应用`Windows Subsystem for Linux`，点击应用详细介绍页面的`打开`按钮，会新打开一个 terminal 窗口，窗口的标题上面有所安装的`wsl.exe`的全路径。

   > 或者也可以手动搜索，由于目录`C:\Program Files\WindowsApps`是保护文件夹，没法直接在资源管理器中搜索，可以管理员打开`powershell`
   >
   > ```shell
   > cd "C:\Program Files\WindowsApps"
   > ls
   > ```
   >
   > 找到对应版本的 wsl 目录，例如`MicrosoftCorporationII.WindowsSubsystemForLinux_1.1.2.0_x64__8wekyb3d8bbwe`

2. 下载[nolsp.exe](https://wtto00.github.io/cdn/windows/nolsp.exe)
3. 管理员打开`powershell`，执行以下命令：

   ```shell
   # 打开nolsp.exe所在目录
   cd E:\Downloads\Other\nolsp.exe

   # 该步骤就相当于添加注册表
   .\nolsp.exe "C:\Program Files\WindowsApps\MicrosoftCorporationII.WindowsSubsystemForLinux_1.1.2.0_x64__8wekyb3d8bbwe\wsl.exe"
   .\nolsp.exe "C:\Program Files\WindowsApps\MicrosoftCorporationII.WindowsSubsystemForLinux_1.1.2.0_x64__8wekyb3d8bbwe\wslservice.exe"
   # 注意：这里的wsl.exe以及wslservice.exe，必须是全路径，不能是相对路径。
   ```

   打开注册表`regedit`，找到`\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WinSock2\Parameters\AppId_Catalog`，依次点击此目录的各项，可以找到两项：

   ```
   [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WinSock2\Parameters\AppId_Catalog\2BB0D7FB]
   "AppFullPath"="C:\Program Files\WindowsApps\MicrosoftCorporationII.WindowsSubsystemForLinux_1.1.2.0_x64__8wekyb3d8bbwe\wsl.exe"
   "PermittedLspCategories"=dword:80000000

   [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WinSock2\Parameters\AppId_Catalog\2FB92E99]
   "AppFullPath"="C:\Program Files\WindowsApps\MicrosoftCorporationII.WindowsSubsystemForLinux_1.1.2.0_x64__8wekyb3d8bbwe\wslservice.exe"
   "PermittedLspCategories"=dword:80000000
   ```

至此，就可以打开 wsl 了。  
**如果商店更新了`Windows Subsystem for Linux`，需要重新执行一遍此流程**

---

## 如果应用商店没有安装`Windows Subsystem for Linux`

直接在注册表`regedit`添加项即可：

```
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WinSock2\Parameters\AppId_Catalog\0408F7A3]
"AppFullPath"="C:\Windows\System32\wsl.exe"
"PermittedLspCategories"=dword:80000000
```

---

#### 临时解决办法：

管理员打开 powershell，运行`netsh winsock reset`，不用重启，就可以打开 wsl 了。  
但是每次重新启动电脑时，都要重新运行一次此流程。
