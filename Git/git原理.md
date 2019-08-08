聊一聊git
***
# Git基础
## 快照流 —— 直接记录快照，而非差异比较
Git 和其它版本控制系统（包括 Subversion 和近似工具）的主要差别在于 Git 对待数据的方法。

+ 其他系统 —— 存储每个文件与初始版本的差异
![avatar](https://git-scm.com/book/en/v2/images/deltas.png)
  
+ Git —— 存储项目随时间改变的快照
![avatar](https://git-scm.com/book/en/v2/images/snapshots.png)
> Git 更像是把数据看作是对小型文件系统的一组快照。 每次你提交更新，或在 Git 中保存项目状态时，它主要对当时的全部文件制作一个快照并保存这个快照的索引。

## 操作本地化
在 Git 中的绝大多数操作都只需要访问本地文件和资源，一般不需要来自网络上其它计算机的信息。因为本地磁盘上就有项目的完整历史。

## 保证完整性
Git 中所有数据在存储前都计算校验和，然后以校验和来引用。 这意味着不可能在 Git 不知情时更改任何文件内容或目录内容。
Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）。Git 数据库中保存的信息都是以文件内容的哈希值来索引，而不是文件名。

## Git 的三个工作区域
![avatar](https://git-scm.com/book/en/v2/images/areas.png)

+ Git 仓库目录是 Git 用来保存项目的元数据和对象数据库的地方
+ 工作目录是对项目的某个版本独立提取出来的内容。 这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。
+ 暂存区域是一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中。

## 文件的状态变化周期

>你工作目录下的每一个文件都不外乎这两种状态：**已跟踪** 或 **未跟踪**。   
已跟踪的文件是指那些被纳入了版本控制的文件，在上一次快照中有它们的记录，在工作一段时间后，它们的状态可能处于**未修改**，**已修改** 或 **已暂存**。 工作目录中除已跟踪文件以外的所有其它文件都属于未跟踪文件，它们既不存在于上次快照的记录中，也没有放入暂存区。

![avatar](https://git-scm.com/book/en/v2/images/lifecycle.png)

**状态变化周期**

![avatar](https://github.com/JackLiR8/StayHungry-StayFoolish/blob/master/assets/img/git-file-life-circle.png?raw=true)

# Git 原理
## .git/ 目录下都有什么？
当在一个新目录或已有目录执行 git init 时，Git 会创建一个 .git 目录。这个目录包含了几乎所有 Git 存储和操作的对象。 如若想备份或复制一个版本库，只需把这个目录拷贝至另一处即可。 
```    
    HEAD        ........................ 指示目前被检出的分支       
    config*     ....................... 文件包含项目特有的配置选项。
    description         ................ description 供 GitWeb 程序使用，无需关心
    hooks/          .................... hooks 目录包含客户端或服务端的钩子脚本（hook scripts）
    info/       ........................ info 目录包含一个全局性排除（global exclude）文件
    objects/        .................... objects 目录存储所有数据内容
    refs/       ........................ refs 目录存储指向数据（分支）的提交对象的指针 
    index       ........................ 保存暂存区信息
```
四个重要条目： *HEAD 文件、index 文件，和 objects 目录、refs 目录*。
+ **object/ 目录下有什么？**
```
    object/
        |___1b/
        |    |___02cf25a4572d4f35f6194bb0cdbd0c095c9d69(文件/打开显示乱码内容)
        |    |___f1c774c43da37b7c3bc55f6059f3f31e29e3c7
        |
        |___07/
        |___72/
        |___e2/
        |___f1/

```
1. `git add .`  

![avatar](https://github.com/JackLiR8/StayHungry-StayFoolish/blob/master/assets/img/git-01.png?raw=true)
  

2. `git commit -m 'git原理 object/ 目录'`

+ **HEAD 文件里有什么？**   
     `ref: refs/heads/master`  

+ **refs/ 目录下有什么？**
```
    refs/     
        |___ heads/                 ...................... 本地分支head指针
        |       |___ master           (533a2a8448d96e04fc5fcaa4c855d078ad448a3a)
        |       |___ branch1
        |       |___ branch2
        |___ remotes/               ...................... 远程仓库
        |       |___ origin/
        |                |___ HEAD          (ref: refs/remotes/origin/master)
        |                |___ master
        |___ tags/                  ...................... 标签
```

# Git 分支
