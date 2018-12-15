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

>`git add` 是个多动能命令，可以用它开始跟踪新文件，或者把已修改的文件放到暂存区，还能用于合并时把有冲突的文件标记为及解决。可以将 `git add ` 理解为 *“添加内容到下一次提交的内容中”*  
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

