二进制数组由三类对象组成。

1. ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
2. TypedArray视图：共包括 9 种类型的视图，比如Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。
3. DataView视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。

**简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。**

TypedArray视图支持的数据类型一共有 9 种（DataView视图支持除Uint8C以外的其他 8 种）。  

数据类型 | 字节长度 |	含义 | 对应的 C 语言类型
-- | -- | -- | --
Int8	| 1	| 8 位带符号整数	| signed char
Uint8	| 1	| 8 位不带符号整数	| unsigned char
Uint8C	| 1	8 位不带符号整数（自动过滤溢出）| 	unsigned char
Int16	| 2	| 16 位带符号整数	| short
Uint16	| 2	| 16 位不带符号整数	| unsigned short
Int32	| 4	| 32 位带符号整数	| int
Uint32	| 4	| 32 位不带符号的整数	| unsigned int
Float32	| 4	| 32 位浮点数	| float
Float64	| 8	| 64 位浮点数	| double

**注意，二进制数组并不是真正的数组，而是类似数组的对象。**