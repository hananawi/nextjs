---
title: resolving-module-path
date: 2022-02-15 15:35:17
tags:
  - python
---

## Python

1. 首先查找 `sys.modules` ，这是之前已导入的模块的缓存

2. 若未找到，则查找 python 的内置标准模块(built-in)

3. 若未找到，则查找 `sys.path` 列表里的路径，这个列表里的路径由以下来源组成：

   - 当前运行的 python 程序的所在目录，如果是以交互方式运行 python 解释器的话则首先查找当前目录
   - 环境变量 PYTHONPATH 所包含的目录，PYTHONPATH 的格式和 PATH 一样
   - 安装 Python 时预设的依赖路径

   查看 `sys.path` :

   ```
   import sys
   print(sys.path)
   ['', '/Library/Frameworks/Python.framework/Versions/3.7/lib/python37.zip',
   '/Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7',
   '/Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/lib-dynload',
   '/Users/jie_shen/Myprograms/pytorch-flask/venv/lib/python3.7/site-packages']
   ```

   因此，可以通过在运行时修改 `sys.path` 来 import 其他目录下的模块，并且，导入的模块的 `__file__` 属性显示了该模块是在哪个目录下找到的

#### `Absolute import` and `Relative import`

- `Absolute import` 的根目录是运行该 python 文件时所在的目录，如：

  ```
  current-directory $ python xxx.py
  ```

  则该 python 代码里面的 `Absolute import` 的根目录是 `current-directory`

  **应该注意的是** ，这个根目录和 `path.sys` 变量里面的第一个路径不一样， `path.sys` 变量里面的第一个路径是该 python 源文件所在的目录，例如：

  ```
  current-directory $ python /path/to/xxx.py
  ```

  则 `Absolute import` 的根目录仍然是 `current-directory`，而 `path.sys` 变量里面的第一个路径则是 `/path/to/xxx.py`

- `Relative import` 相当于把路径中的 `/` 换成 `.`，并且点的数量表示向上多少个路径，如：
  `.module` 表示当前目录下的 `module`，`..module` 表示父目录的 `module`，`...module` 表示父目录的父目录的 `module`，以此类推

#### Notes

- 当通过 `from <module-name> import *` 导入模块时模块时，该模块中的所有变量名都会引入到当前的符号表(symbol table)，除了以下划线(\_)开头的变量

- `__all__` 变量是一个列表，决定了当通过 `from <module-name> import *` 导入时导入到当前符号表的对象(可通过 dir()查看)。并且，package 和 module 的默认行为不同。(package 是一个路径，而 module 是一个.py 文件)

  - package 的默认行为是什么都不导入，相当于 `__all__ = []`，在 package 中的 `__init__.py` 中设置
  - module 的默认行为是全部导入

- 导入 package 基本上相当于把该 package 下的 `__init__.py` 作为一个 module 导入

#### Reference

- [https://realpython.com/python-modules-packages/](https://realpython.com/python-modules-packages/)
- [https://realpython.com/absolute-vs-relative-python-imports/](https://realpython.com/absolute-vs-relative-python-imports/)
- [https://docs.python.org/3/using/cmdline.html#envvar-PYTHONPATH](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONPATH)
- [https://www.pythonforthelab.com/blog/complete-guide-to-imports-in-python-absolute-relative-and-more/](https://www.pythonforthelab.com/blog/complete-guide-to-imports-in-python-absolute-relative-and-more/)
