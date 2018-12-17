## Git 基础
***
## 一. 建立本地仓库
### 1. 在现有项目中初始化仓库**  
&emsp;&emsp;`$ git init`   

初始化之后需要跟踪项目内的文件并提交
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
如果想跳过使用暂存区域，则使用命令： `git commit -a -m "some information"`  Git 会自动把所有 *已经跟踪过的文件* 暂存起来一并提交

### 8. 移除文件
+ 要从Git中移除文件，必须在 *已跟踪的文件清单*（暂存区）中移除，然后提交。如果只是简单地从工作目录中手动删除 somefile，运行 `git status` 后会看到未暂存清单中有 deleted: somefile 这个记录，也就是说此时该文件依旧被纳入在版本管理中。然后再运行 `git rm somefile` 记录此次移除文件的操作，这样下一次提交时，该文件就不再纳入版本管理。
>简单来说，如果想删除某个文件，你需要将其在工作目录中删除，并且使用 `git rm` 命令将其从暂存区中删除

+ 如果删除修改过并且已经放到暂存区域的文件，则必须强制删除 `git commit -f` （-f意指 force）这是一种安全特性，防止误删还没有添加到快照的数据，这样的数据不能被Git恢复
+ 如果想让文件继续保留在工作目录中，但是停止Git对其追踪，使用 `git rm --cached`（假设你没有添加.gitignore文件，且不小心把一堆文件添加到暂存区，可以使用这种方法）
+ `git rm` 后面可以列出文件或者目录的名字，也可用glob模式，比如：`git rm log/\*.log ` 
>注意星号*之前的反斜杠 \ ,因为Git有它自己的文件模式扩展匹配方式，所以不能用shell来帮忙展开。此命令删除 log/ 目录下扩展名为.log的所有文件。再如 `git rm \*~` ,该命令删除所有以~结尾的文件

### 9. 移动文件
在Git中对文件改名，可以如下操作：
&emsp;&emsp;`git mv file_from file_to`
>运行 `git mv`就相当于运行了下面三条命令：
```
    $ mv file_from file_to
    $ git rm file_from
    $ git add file_to
```
***
## 三. 查看提交历史
### 1. 回顾提交历史： 
`git log` ,不加参数时，git log 会按提交时间列出所有更新。  

<font color='skyblue'>git log 常用选项:</font>  
| 选项 | 说明 | 
|:---:| :--- |
|-p | 按补丁格式显示每个更新之间的差异|
|--stat | 显示每次更新的文件修改统计信息|
|--shortstat|只显示--stat中的行数司改添加移除统计|
|--name-status|显示新增、修改、删除的文件信息|
|--graph|用 ASCII 图形显示分支合并历史|
|--pretty|使用其他格式显示历史提交信息|

```bash
$ git log -p -2     -p 用来显示每次提交的内容差异，
                    -2用来显示最近两次提交

$ git log --stat    查看每次提交的简略统计信息

$ git log --pretty=[oneline,short,full,fuller]
                    --pretty可以指定使用不同的默认格式展示提交历史

$ git log --pretty=format:"%h - %an, %ar"   定制要显示的记录格式
```
<font color='skyblue'>git log --pretty=format 常用选项:</font>  

| 选项 | 说明 | 
|:---:| :--- |
|%H(h) | commit 的完整(简短)哈希值|
|%P(p) | commit 父对象的完整（简短）哈希值|
|%an|作者|
|%ae|作者email|
|%ad|作者修订日期（可以用--date=选项定制格式）|
|%ar|作者修订日期，按多久以前的方式显示|
|%cn|提交者的名字committer|
|%ce|提交者的email|
|%cd|提交日期|
|%cr|提交日期，按多久以前显示|
|%s|提交说明|

当oneline 或者 format 与 --graph 结合使用时，会添加 ASCII 字符串形象展示你的分支、合并历史 

### 2. 限制输出

<font color='skyblue'>限制 git log 输出选项:</font>  

| 选项 | 说明 | instance|
|:---:| :--- |---|
|-n | 仅显示最近 n 次提交|
|--since,--after | 显示指定时间之后的提交|--since=2.weeks|
|--until,--before|指定时间之前的提交|
|--author|指定作者的提交|
|--committer|指定提交者的提交|
|--grep|仅显示含指定关键字的提交|
|-S|仅显示添加或者移除了某个关键字的提交|git log -Sfunction_name
   

***
## 四. 撤销操作
### 1. 修改提交信息
在提交之后发现有漏掉的文件，或者提交信息写错了，可以使用--amend：  
&emsp;`git commit --amend`  
>该命令会将暂存区中的文件提交，如果自从上次提交后你未作出任何修改，那么快照会保持不变，而你修改的只是提交信息,文本编辑器启动后，可以看到之前的提交信息。编辑后保存会覆盖原来的提交信息。  

    $ git commit -m 'initial commit'
    $ git add forgetten_file
    $ git commit --amend
执行上面的指令，最终只会有一次提交，第二次提交会代替第一次提交  

### 2.取消暂存的文件
&emsp;`git reset HEAD <file>`  

### 3. 撤销对文件的修改
将文件还原成本次修改(modified)之前的样子   

&emsp;`$ git checkout --<file>`
><font color='red'>git checkout --[file]是一个非常危险的指令，他会删除你对那个文件做出的所有修改，所以只有当你确切的不想不想要那个文件时才能使用</font> 

***
## 五. 远程仓库的使用
