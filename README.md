# 核心概念

> 可以使用 Electron 的 ipcMain 模块和 ipcRenderer 模块来进行进程间通信。为了从你的网页向主进程发送消息，你可以使用 ipcMain.handle 设置一个主进程处理程序（handler），然后在预处理脚本中暴露一个被称为 ipcRenderer.invoke 的函数来触发该处理程序（handler）。

> 预加载脚本包含在浏览器窗口加载网页之前运行的代码。 其可访问 DOM 接口和 Node.js 环境，并且经常在其中使用 contextBridge 接口将特权接口暴露给渲染器。
> Electron 应用通常使用预加载脚本来设置进程间通信 (IPC) 接口以在两种进程之间传输任意信息。

# 示例预览

> [官方示例预览](https://www.electronjs.org/zh/docs/latest/tutorial/examples)

> [键盘快捷键](https://www.electronjs.org/zh/docs/latest/tutorial/keyboard-shortcuts)
