## Git 基础
***
## 一. 第一阶段（建立本地仓库）
### 1. 在现有项目中初始化仓库**  
&emsp;&emsp;`$ git init`   

初始化之后需要跟踪项目内的文件并提交
```
$ git add *.c  
$ git add LICENSE
$ git commit -m 'initial project version'
```

### 2. 克隆现有仓库
在某一个目录下输入命令：  
&emsp;&emsp;`$ git clone [url]`   
>如果需要对本地仓库进行重命名 则输入  `$ git clone [url] name`  
***
## 二. 记录每次更新到仓库
+ 工作目录下的文件有两种状态：已跟踪（Tracked,已经被纳入版本控制的文件）、未跟踪 (Untracked)  
+ 已跟踪的文件有三种状态：未修改（Unmodified）、已修改(Modified)、已暂存(Staged)   

### 1. 检查当前文件状态
&emsp;&emsp;`$ git status`

### 2. 跟踪新文件
&emsp;&emsp;`$ git add [file]`

>`git add` 是个多动能命令，可以用它开始跟踪新文件，或者把已修改的文件放到暂存区，还能用于合并时把有冲突的文件标记为以解决。可以将 `git add ` 理解为 *“添加内容到下一次提交的内容中”*  
运作了 ` git add` 之后又修改的文件，需要重新运行 git add 把最新版本的文件重新暂存起来  

### 3. 状态简览
&emsp;&emsp;`git status -s`  &emsp;or &emsp;`git status --short`
```
$   git status -s
 M README
MM Rakefile
A  file3
M  file4
?? file5
```
>>?? : 新添加的未跟踪的文件  
A&ensp;：新添加到暂存区中的文件  
&ensp;M: 文件被修改但是没有放入到暂存区（靠右的M）  
M&ensp;: 文件被修改了并且已经放入暂存区 （靠左的M）

&emsp;该例子中，README文件修改且未暂存；Rakefile 是已经存在于暂存区，但是在暂存之后又修改了；file3是先添加到暂存区的文件；file4 已经修改并且已暂存；file5 是新添加的 Untracked 状态的文件

### 4. 忽略文件
&emsp;创建一个名为.gitignore 的文件，列出要忽略的文件的模式  
    
    $cat .gitignore
    *.[oa]
    *~
忽略所有以 .o 、 .a 或者 .~ 结束的文件；

### 5. 查看已暂存和未暂存的修改
+ 查看尚未暂存的文件更新了哪些部分：`$ git diff`   
>>该命令查看的是工作目录中当前文件和暂存区域快照之间的差异,即修改后还没有暂存（add）起来的变化内容

+ 查看已暂存的将要添加到下次添加的内容： `git diff --cached` 或者 `git diff --staged` (Git 1.6版本以上)
>>该命令查看的是已将暂存起来，但是还没有提交的变化

### 6. 提交更新
&emsp;&emsp;每次提交之前，用`git status`检查目录下的文件是否都已暂存起来了  
提交：  
&emsp;&emsp;`git commit -m "some information"`  
>提交时记录的是放在暂存区域的快照。每一次提交操作，都是对你的项目作一次快照，以后可以回到这个状态，或者进行比较。

### 7. 跳过使用暂存区域
如果想跳过使用暂存区域，则使用命令： `git commit -a -m "some information"`  Git 会自动把所有 *已经跟踪过的文件* 暂存起来一并提交

### 8. 移除文件
要从Git中移除文件，必须在 *已经跟踪的文件清单*（暂存区）中移除，然后提交。如果只是简单地从工作目录中手动删除某个文件，运行 `git status` 后会看到未暂存清单中有 deleted: somefile 这个记录，也就是说此时该文件依旧被纳入在版本管理中

