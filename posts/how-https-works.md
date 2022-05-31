---
title: how-https-works
date: 2022-02-17 10:33:14
tags:
  - https
categories:
  - skill
---

1. **Client Hello**: 首先客户端向服务端发送自己支持的 SSL/TLS 版本和支持的加密算法。

2. **Server Hello**: 接着服务端检查客户端发来的 SSL/TLS 版本和加密算法，并从中根据自己的偏好选一个，然后服务端向客户端发送自己的证书和公钥。
<!-- more -->
3. **Client Key Exchange**: 客户端检查服务端发送的证书，若证书合法，则客户端生成一个 `pre-master key`，并且用之前从服务端获得的公钥去加密，加密后发送给服务端。

4. **Change Cipher Spec**: 服务端收到加密后的 `pre-master key` 后可以用自己的私钥解密，接着客户端和服务端都根据这个 `pre-master key` 去生成 `shared secret`，用作后续对称加密的密钥。然后客服端再向服务端发送一个测试用的消息，服务端回应并也向客户端发送一个消息，检查加密是否正常。

5. **Everything is now secured**: 最后，客户端和服务端之间的消息就可以安全的被加密和解密了，不用担心用户输入的信用卡，密码等敏感信息泄漏。

### Certificate

**Certificate Authority(CA)**: 是一种专门发行证书的第三方机构，操作系统一般都自带 **root store** ，一个专门储存受信任的 CA 的数据库。

当一个 CA 发行证书时，
