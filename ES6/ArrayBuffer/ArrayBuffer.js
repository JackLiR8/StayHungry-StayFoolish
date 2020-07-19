/**
 * @file ArrayBuffer
 */

/* ===========================================================
  ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，
  只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用
  是以指定格式解读二进制数据
 =========================================================== */

// ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域
// 下面代码生成了一段 32 字节的内存区域，每个字节的值默认都是 0。
// ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。

const buf = new ArrayBuffer(32)

// 2. 读写

// DataView视图
const dataView = new DataView(buf)
dataView.getUint8(0)  // 0

/* TypedArray
与DataView视图的一个区别是，TypedArray不是一个构造函数，
而是一组构造函数，代表不同的数据格式

上面代码对同一段内存，分别建立两种视图：
32 位带符号整数（Int32Array构造函数）和 8 位不带符号整数（Uint8Array构造函数）。
由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图 */

const buffer = new ArrayBuffer(12)

const x1 = new Int32Array(buffer)
x1[0] = 1

const x2 = new Uint8Array(buffer)
x2[0] = 2

console.log(x1[0])    // 2

