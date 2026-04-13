---
title: Rust执行Shell命令继承输出的情况下怎么获取输出内容
postSlug: rust-shell-command-inherit-output
featured: false
draft: false
tags:
  - rust
  - shell
description: Rust执行Shell命令，stdout为inherit的情况下，是获取不到输出内容的，因为输出内容直接到终端了，没有经过你的程序。
pubDatetime: 2026-04-13T16:24:22.581Z
updateTime: 2026-04-13T16:24:22.581Z
---

Rust 执行 Shell 命令，`stdout` 为 `inherit` 的情况下，是获取不到输出内容的，因为输出内容直接到终端了，没有经过你的程序。

所以我们要使用 `piped` 的方式来获取输出内容，然后再经过我们的程序转发到终端来打印。注意这里有个问题就是，如果原来 Shell 命令的输出有颜色格式以及 loading 状态，progress 进度，那么普通的 `println` 打印到终端会丢失到这些信息。

所以我们要使用 `io::stdout().write_all` 来转发输出流，从而保留原 Shell 输出的任意格式。

```rust
use anyhow::{Error, anyhow};
use std::io::{self, Read, Write};
use std::process::{Command, Stdio};

async fn exec_command() -> Result<(), Error> {
  let mut child = Command::new("ffmpeg.exe")
    .arg("https://example.com/demo.mp4") // 假设一个远程的MP4地址
    .args(["-o", "output.%(ext)s"])
    .stdout(Stdio::piped())
    .stderr(Stdio::inherit())
    .stdin(Stdio::inherit())
    .spawn()?;

  let mut stdout = child
    .stdout
    .take()
    .ok_or(anyhow!("下载视频 output 输出为空"))?;

  let mut line_buffer = Vec::new();
  let mut chunk = [0u8; 1024];

  loop {
    let len = stdout.read(&mut chunk)?;
    if len == 0 {
      break;
    }

    let data = &chunk[..len];

    let mut out = io::stdout();
    out.write_all(data)?;
    out.flush()?;

    for &byte in data {
      if byte == b'\n' || byte == b'\r' {
        if !line_buffer.is_empty() {
          let raw_line = String::from_utf8_lossy(&line_buffer);
          // A line of log, processed using your own logic
          line_buffer.clear();
        }
      } else {
        line_buffer.push(byte);
      }
    }
  }

  let status = child.wait()?;
  if !status.success() {
    return Err(anyhow!("下载视频失败: {status:?}"));
  }

  Ok(())
}
```
