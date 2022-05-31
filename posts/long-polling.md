---
title: long polling
date: 2022-02-11 16:01:56
tags:
---

轮询(polling)是指客户端定期地去向服务端发送请求，检查是否有新的数据或更新。例如，在聊天程序中，一种简单的实现方法就是客户端定期向服务端查询有无用户发送新的信息。

### 常规轮询 (regular polling)

在常规轮询中，假设客户端定期向服务端发送查询请求并且间隔为10s，在这种情况下有如下缺点:

1. 在服务端出现新信息和客户端获取到新信息之间通常会有延迟，因为客户端是每隔10s查询一次，所以最坏情况延迟是10s。

2. 如果服务器在很长一段时间里都没有信息的话，客户端仍然每隔10s发送一次请求，会造成不必要的浪费。在聊天app的情况下，在深夜睡觉时，用户发送新消息的数量会明显减少。

### 长轮询 (long polling)

长轮询可以实现无延迟地转递消息。其流程为：

1. 首先客户端向服务端发送查询请求。

2. 若服务端中有新的消息，则返回新消息给客户端。

3. 若服务端中无新消息，则服务端不会发送Response给客户端而是会挂起该请求，直到出现新消息再发送新消息至客户端。(在常规轮询中服务端会返回请求并告诉客户端没有新消息)

4. 客户端在收到响应之后会立即再发送一个查询请求。

### 注意事项

长轮询适合新消息的出现频率比较小的情况下，因为每次查询都是一个完整的(http)请求，在比较频繁的情况下建议使用 `Websocket` 或 `Server Sent Events`。

### Reference

* [https://javascript.info/long-polling](https://javascript.info/long-polling)

* [https://stackoverflow.com/questions/18099798/polling-vs-long-polling](https://stackoverflow.com/questions/18099798/polling-vs-long-polling)
