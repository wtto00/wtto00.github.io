---
issue_number: 43
title: Windows下使用Git-Bash日常开发
labels:
  - Linux
  - Git
---

参考 [知乎:Windows 下的 Git Bash 配置，提升你的终端操作体验](https://zhuanlan.zhihu.com/p/418321777)

### 配置文件

`Git-Bash` 加载的配置文件是 `~/.bash_profile`，不会加载 `~/.bashrc`。

如果想要加载 `~/.bashrc`，可以在 `~/.bash_profile` 文件中加上一行 `source ~/.bashrc`

### Windows Terminal 和 VSCode 打开 Git Bash，发现不会加载配置

`bash.exe -l -i`

加上参数 `-l` 和 `-i`

### Git-Bash 修改前缀 (隐藏用户 @ 主机)

把下边这段逻辑添加到配置文件中 `~/.bash_profile`

```shell
# Git Bash终端前面的字符去掉
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
# 显示 用户 @ 主机
# export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
# 隐藏用户 @ 主机，显示当前文件夹
#export PS1="\W\[\033[32m\]\$(parse_git_branch)\[\033[00m\]"

# 只显示当前文件夹
#export PS1="\[\e[32;1m\]\W $\[\e[0m\]\[\033[32m\]\$(parse_git_branch)\[\033[00m\] "
# 显示全路径
export PS1="\[\e[32;1m\]\w $\[\e[0m\]\[\033[32m\]\$(parse_git_branch)\[\033[00m\] "
```

上述命令中特殊符号所代表的意义：

- `\u` ：当前用户的账号名称
- `\w` ：完整的工作目录名称。家目录会以 ~代替
- `\W` ：利用 basename 取得工作目录名称，所以只会列出最后一个目录
- `\H` ：完整的主机名称。例如：我的机器名称为：fc4.linux，则这个名称就是 fc4.linux
- `\h` ：仅取主机的第一个名字，如上例，则为 fc4，.linux 则被省略
- `\d` ：代表日期，格式为 weekday month date，例如："Mon Aug1"
- `\t` ：显示时间为 24 小时格式，如：HH：MM：SS
- `\T` ：显示时间为 12 小时格式
- `\A` ：显示时间为 24 小时格式：HH：MM
- `\v` ：BASH 的版本信息
- `#` ：下达的第几个命令
- `$` ：提示字符，如果是 root 时，提示符为：# ，普通用户则为：$

### Git-Bash 中文乱码

- 终端不能显示中文：打开 `Git bash`，右键打开选项， `Options->Text->Locale` 改为 `zh_CN`，`Character set` 改为 `UTF-8`
- 解决 `git status` 不能显示中文：终端输入 `git config --global core.quotepath false`

### Git-Bash 不识别 bat 脚本，必须手动加上`.bat`后缀

把下边这段逻辑添加到配置文件中 `~/.bash_profile`

```shell
function command_not_found_handle {
  local cmd="${1##*/}" # 解析出命令名
  if [[ $cmd != *.* ]]; then
    shift # 将第一个参数弹出
    "${cmd}.bat" "$@"
  else
    printf "%s: command not found\n" "$1" >&2
    return 127
  fi
}
export -f command_not_found_handle
```

上面代码的逻辑就是拦截`command_not_found_handle`，当命令不存在时，执行自定义的`command_not_found_handle`函数，函数中判断：如果所执行的命令没有`.`，则尝试执行添加`.bat`后缀的命令。

### 添加的环境变量不生效

把下边的命令添加到 `~/.bash_profile` 中，`source` 后不生效

```shell
export PATH="$PATH:D:\Program Files\Python310"
```

上面的路径是 Windows 下的路径，Linux 下不是这样的，改成下边这样

```shell
export PATH="$PATH:/d/Program Files/Python310"
```

### 把 code 添加到 PATH 中，执行 code 不能打开 vscode

```shell
export PATH="$PATH:/d/software/Microsoft VS Code/bin"
```

上面设置的环境变量不能打开 vscode，是因为目录`/d/software/Microsoft VS Code/bin`中有两个同名的 code 文件：`code` 和 `code.cmd`。`code`是`wsl`中执行的，`code.cmd`才是我们需要执行的。

改成下方的环境设置即可：

```shell
# export PATH="$PATH:/d/software/Microsoft VS Code/bin"
alias code="/d/software/Microsoft\ VS\ Code/bin/code.cmd"
```
