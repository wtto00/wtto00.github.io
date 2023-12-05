---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: 记录一次svn迁移至git的过程
postSlug: svn-to-git
featured: false
draft: false
tags:
  - Git
  - SVN
description: 由于之前的svn仓库是非标准的，没有任何分支trunk，也没有任何tag，目录中直接就是项目的文件系统了。对于这种非标准的svn仓库，应该怎么保留完整commit迁移至git？
issue_number: 17
---

由于之前的 svn 仓库是非标准的，没有任何分支 trunk，也没有任何 tag，目录中直接就是项目的文件系统了。

查找了一些资料，现总结一下对于这种非标准的 svn 仓库，应该怎么保留完整 commit 迁移至 git。

1. **查找 svn 提交的用户**
   在项目根目录执行下边命令，获得 svn 提交的所有用户名

   ```bash
   svn log --xml --quiet | grep author | sort -u | perl -pe 's/.*>(.*?)<.*/$1 = /'
   ```

1. **建立 svn 用户与 git 用户的映射文件**
   在另一个目录中，不和 `svn checkout` 所下载的项目文件在同一个目录，建立文件 `users.txt`

   ```bash
   nano users.txt
   svn@user.name = gitUserName <git@user.email>
   ```

   > 前面是上一步执行命令得到的 svn 用户名称，后面是所要映射的 git 用户名以及用户邮箱。
   > git 用户名及邮箱不用提前创建，这只是保留 commit 的提交记录。

1. **拉取提交记录以及代码**
   在与上一步 `user.txt` 相同目录下，执行命令

   ```bash
   git svn clone svn://ip/project.name --authors-file=users.txt --no-metadata --trunk=/ target.location
   ```

   > 由于我们之前的项目是没有任何分支 trunk 的，所以这里的参数 `--trunk=/`，是指项目根目录

1. **将转换过来的远程分支转为本地分支**

   ```bash
   cp -Rf .git/refs/remotes/* .git/refs/heads/
   rm -Rf .git/refs/remotes
   ```

1. **将提交记录以及代码提交至远程 git 仓库**

   ```bash
   git remote add origin git@git.example.com/remote-project.git
   git branch -r
   git push origin --all
   ```

- 参考资料 <https://www.yisu.com/zixun/70745.html>
- 参考资料 <https://git-scm.com/book/zh/v2/Git-与其他系统-迁移到-Git>
