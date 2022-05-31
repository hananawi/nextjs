---
title: git-tutorial
date: 2022-03-07 18:57:55
tags:
  - git
categories:
  - skill
---

## `git log [...commits]`

- 查看 git 仓库的历史记录，显示可以顺着后面的`...commits`（可以是 hash 值或者 branch 的名字）到达的 commits，若后面什么都不加则默认为 HEAD，可以配合 `--graph` 和 `--reflog` 选项使用

#### 一些参数

- --graph
  在控制台以图形的方式显示

- --reflog
  显示出所有 commits，可以用这个来看 detached 的 commit 节点

## `git clone`

- 在默认情况下 clone 所有的远程分支到本地，并且假设远程有一个叫 `master` 的分支，即本地会存在两个相对应的分支，一个是`master`，可以自己移动，用于本地开发，另一个是`origin/master`(控制台上显示`remotes/origin/master`)，是 remote-tracking 分支，用于追踪远程的对应分支，不能自己修改，并且只会在使用`git fetch`或`git pull`等与远程仓库进行通信的命令后才会更新（就是同步到远程的状态）

## `git branch`

```bash
# 仅列出所有本地分支(无参数情况下)
$ git branch
```

#### 一些参数

- -r, --remote
  仅列出所有远程分支
- -a, --all
  列出所有本地和远程分支

<br>

## `git checkout`

#### 一些参数

- -b
  新建一个分支并切换到该分支上，如果该分支已存在则会失败，用 -B 选项则即使存在也不会失败

## `git commit`

#### 一些参数

- --amend
  对上一次的的 commit 进行微调，相当于直接用这次的 commit 覆盖上次的 commit，上次的 commit 不存在，只有这次的 commit，并且会保留上次的 commit 注释，但默认还是会弹出编辑器，可以加上 `--no-edit` 选项阻止弹出编辑器

## `git merge`

- 如果当前所在的分支和要合并的分支都在一条路径上（就是没有 diverge 的情况），则这种 merge 操作称为`fast-forward`，在这种情况下 git 所做的事情很少，只是简单地把指针向前移动
- 一般在`fast-forward`的情况下，合并完成后会手动删除其中一个分支（使用`git branch -d <branch-name>`删除），因为此时两个分支都指向一个 commit，只需保留一个即可
- 在把两条不同路径上的 commits 合并时（就是有 diverge 的情况），git 会根据三个 commit 的信息创建一个新的 commit，也就是合并后的 commit，三个 commit 分别是两个要合并的 commit 和他们最近的共同祖先 commit
- 在出现冲突时，merge 过程会暂停，在用户解决完冲突时，需要用`git add`命令添加冲突的文件后再`git commit`，以此来完成合并（可以用`git status`查看操作提示）

## `git rebase`

- rebase 操作相当于把当前所在的 commit 上的相对于其祖先 commit 的修改重新在要 rebase 的 commit 上倒带一次
- 具体来说就是 rebase 时 git 首先找到要合并的两个 commit 的最近共同祖先 commit，然后找到要合并的两个 commit 相对于其最近祖先的 diff，并将这些 diff 保存为临时文件，这里先假设执行的命令是`git rebase main`，且当前所处分支是 experiment，则 git 下一步会把 experiment 重设为 main，然后把之前找到的 diff 全部按顺序重新倒带一次，最终结果就是 experiment 的父亲 commit 是 main 并且两者在一条路径上
- rebase 的最终结果和使用`git merge`的结果是一样的，区别就是 rebase 的历史记录会显示成线状，而 merge 的历史记录会显示成有分叉

## `git push`

- 一般情况下一次只能 push 一个分支到远程服务器上，完整格式为 `git push <remote> <local-branch>:<remote-branch>`
- 在只使用 `git push` 这种格式时，会把当前所在的分支 push 到其对应的 upstream 分支上，如果没有则需要使用参数设置远程的 upstream 分支(-u, --set-upstream)

#### 一些参数

- -u, --set-upstream
  设置要 push 的分支的远程的 upstream 分支

## tracking branch

- 和下面的`remote-tracking branch`都是本地分支，但是这个可以移动
- 在远程仓库中会有一个远程分支与其相对应（远程分支是其 upstream 分支），就是说`git pull`或`git push`等命令会自动知道应该操作那些分支
- 如果 checkout 了一个远程分支，则会在本地自动创建一个 tracking branch，相关 checkout 的 option 可以参见 checkout 命令

## remote-tracking branch

- remote-tracking 分支是远程分支的引用，是一种无法移动的本地分支，并且只在使用 `git pull（或 fetch）` 等命令时才会更新
- 其命名方式为 `<remote>/<branch>`
- 当使用 `git clone` 克隆库的时候，git 自动在本地创建一个 remote-tracking 分支和 main 分支，两者都指向远程的 main 分支(或 master)
