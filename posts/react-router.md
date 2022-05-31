---
title: react-router
date: 2022-02-09 12:16:54
tags:
  - react
---

## Nested Routers

例子：

```
function App() {
  return (
    <Routes>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
      </Route>
    </Routes>
  );
}
```

子 Route 的 path 会拼接到父 Route 的尾部（会用/隔开）
子 Route 的 element 会成为父 Route 的 element 的子元素
如在上面的 App 中，路由  `/invoices/sent`  会被渲染成如下的组件 🌲：

```
<App>
  <Invoices>
    <SentInvoices />
  </Invoices>
</App>
```
