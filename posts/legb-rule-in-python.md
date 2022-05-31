---
title: legb-rule-in-python
date: 2022-03-19 21:31:25
tags:
---

## `L` 表示 `Local`

- `Local scope` (or `function scope`)代表 python 中函数或者 lambda 表达式中的 scope
- 这些 scope 在函数被调用时创建，而不是在定义时，多次调用同一个函数时每次都会创建一个新的 scope

## `E` 表示 `Enclosing`

- `Enclosing scope` (or `nonlocal scope`)代表 python 中的`inner function`的外部函数(enclosing function)的 scope
- 也就是说内部函数可以访问到外部函数的 scope，(好像`enclosing scope`就是外部函数的`local scope`?)
  ```python
  >>> def outer_func():
  ...     # This block is the Local scope of outer_func()
  ...     var = 100  # A nonlocal var
  ...     # It's also the enclosing scope of inner_func()
  ...     def inner_func():
  ...         # This block is the Local scope of inner_func()
  ...         print(f"Printing var from inner_func(): {var}")
  ...
  ...     inner_func()
  ...     print(f"Printing var from outer_func(): {var}")
  ...
  >>> outer_func()
  Printing var from inner_func(): 100
  Printing var from outer_func(): 100
  >>> inner_func()
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  NameError: name 'inner_func' is not defined
  ```
- 在`enclosing scope`里面的名字被称为`nonlocal name`，在`inner function`里面不能修改`enclosing scope`里面的变量，除非使用了`nonlocal`声明

## `G` 表示 `Global`

- `Global scope` (or `Module scope`)代表最顶层的 scope

## `B` 表示 `Built-in`

- `Built-in scope`在 python 代码被运行时自动创建，也可以在所有地方被访问到

## Notes

- LEGB 是 python 寻找变量时的顺序
- `Local scope`只有在函数内才存在， `Enclosing scope`只有在`inner function`内才存在，也就是说在 python 运行时最少存在 2 个 scope(`Global scope` 和 `Built-in scope`)，最多存在 4 个 scope
