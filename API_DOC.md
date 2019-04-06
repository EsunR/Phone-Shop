- [1. 基本](#1-%E5%9F%BA%E6%9C%AC)
  - [1.1 用户登录](#11-%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95)
  - [1.2 注册](#12-%E6%B3%A8%E5%86%8C)
  - [1.3 获取用户信息](#13-%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
- [返回：](#%E8%BF%94%E5%9B%9E)
- [# 求哥哥！把！所有的！商品！都按！时！间！倒！序！排！也就是！最新发布的商品！排在前面！谢谢您！](#%E6%B1%82%E5%93%A5%E5%93%A5%E6%8A%8A%E6%89%80%E6%9C%89%E7%9A%84%E5%95%86%E5%93%81%E9%83%BD%E6%8C%89%E6%97%B6%E9%97%B4%E5%80%92%E5%BA%8F%E6%8E%92%E4%B9%9F%E5%B0%B1%E6%98%AF%E6%9C%80%E6%96%B0%E5%8F%91%E5%B8%83%E7%9A%84%E5%95%86%E5%93%81%E6%8E%92%E5%9C%A8%E5%89%8D%E9%9D%A2%E8%B0%A2%E8%B0%A2%E6%82%A8)
- [1. 通用API](#1-%E9%80%9A%E7%94%A8api)
  - [1.1 获取商品列表](#11-%E8%8E%B7%E5%8F%96%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8)
  - [1.2 获取商品详情](#12-%E8%8E%B7%E5%8F%96%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85)
  - [1.3 获取订单列表](#13-%E8%8E%B7%E5%8F%96%E8%AE%A2%E5%8D%95%E5%88%97%E8%A1%A8)
  - [1.4 获取商品评论](#14-%E8%8E%B7%E5%8F%96%E5%95%86%E5%93%81%E8%AF%84%E8%AE%BA)
- [2. 用户界面](#2-%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)
  - [2.1 账户充值](#21-%E8%B4%A6%E6%88%B7%E5%85%85%E5%80%BC)
  - [2.2 生成订单（购买商品）](#22-%E7%94%9F%E6%88%90%E8%AE%A2%E5%8D%95%E8%B4%AD%E4%B9%B0%E5%95%86%E5%93%81)
  - [2.3 确认收货](#23-%E7%A1%AE%E8%AE%A4%E6%94%B6%E8%B4%A7)
  - [2.4 申请退货](#24-%E7%94%B3%E8%AF%B7%E9%80%80%E8%B4%A7)
  - [2.5 添加购物车](#25-%E6%B7%BB%E5%8A%A0%E8%B4%AD%E7%89%A9%E8%BD%A6)
  - [2.55 获取用户购物车列表](#255-%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E8%B4%AD%E7%89%A9%E8%BD%A6%E5%88%97%E8%A1%A8)
  - [2.6 修改购物车商品数量](#26-%E4%BF%AE%E6%94%B9%E8%B4%AD%E7%89%A9%E8%BD%A6%E5%95%86%E5%93%81%E6%95%B0%E9%87%8F)
  - [2.7 删除购物车商品](#27-%E5%88%A0%E9%99%A4%E8%B4%AD%E7%89%A9%E8%BD%A6%E5%95%86%E5%93%81)
  - [2.75 评论商品](#275-%E8%AF%84%E8%AE%BA%E5%95%86%E5%93%81)
  - [2.8 修改用户信息](#28-%E4%BF%AE%E6%94%B9%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
  - [2.9 修改密码](#29-%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81)
- [3. 管理员界面](#3-%E7%AE%A1%E7%90%86%E5%91%98%E7%95%8C%E9%9D%A2)
  - [3.1 发布商品](#31-%E5%8F%91%E5%B8%83%E5%95%86%E5%93%81)
  - [3.2 删除订单](#32-%E5%88%A0%E9%99%A4%E8%AE%A2%E5%8D%95)
  - [3.3 订单发货](#33-%E8%AE%A2%E5%8D%95%E5%8F%91%E8%B4%A7)
  - [3.4 处理退货](#34-%E5%A4%84%E7%90%86%E9%80%80%E8%B4%A7)
  - [3.5 修改商品信息](#35-%E4%BF%AE%E6%94%B9%E5%95%86%E5%93%81%E4%BF%A1%E6%81%AF)
  - [3.6 获取用户列表](#36-%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E5%88%97%E8%A1%A8)
  - [3.7 删除用户](#37-%E5%88%A0%E9%99%A4%E7%94%A8%E6%88%B7)

## 1. 基本
### 1.1 用户登录
url：/login POST

发送：
```js
{
    account: "001",
    password: "123456"
}
```

返回：
```js
// 正常
{
    code: 1,
    data: 'xxx.xxx.xxx'
}

// 异常
{
    code: 2,
    msg: '账号不在' // 或者“密码错误”
}
```

### 1.2 注册
url：register POST

发送：
```js
{
    account: "001",
    name: "张三",
    password: "123456"
}
```

返回：
```js
// 正常
{
    code: 1
}

// 异常
{
    code: 2,
    msg: "账号已存在"
}
```

### 1.3 获取用户信息
url：/getUserInfo GET （从此往后的API都需要验证Token）

返回：
```js
{
    identity: "user"
    uid: "",
    name: "",
    account: "",
    money: "", // 账户余额，不要返回空值，没钱就返回0
    receive: "河南省安阳市文峰区安阳工学院 李大帅 11111111111"
}
```
--- 
# 求哥哥！把！所有的！商品！都按！时！间！倒！序！排！也就是！最新发布的商品！排在前面！谢谢您！
---

## 1. 通用API

### 1.1 获取商品列表
url：/getItemList GET

发送：
```
/getItemList?page=1&keyWords=关键字

page: 页数（必传）
keyWords：搜索关键字（选择传递），如果不传则返回所有结果
```

返回：
```js
{
    code: 1,
    data: {
        count: 100,
        itemList: [
            {
                id: 1,
                title: "小米9 现货128G 辣鸡手机不要购买",
                price: 2999,
                cover: "https:// https://i8.mifile.cn/a1/pms_1550642240.48638886.jpg",
                saleNum: 100,
                status: 1
            },
            // ... ... 一页返回9条数据
        ]
    }
}
```

### 1.2 获取商品详情
url：/getItem GET

发送：
```
/getItem?id=1
```

返回：
```js
{
    code: 1,
    data: {
        id: 1,
        title: "小米9 现货128G 辣鸡手机不要购买",
        price: "1999",
        saleNum: 100,
        stock: 1000,
        introduction: "<p>商品介绍</p>",
        color: ['蓝色', '红色', '黑色'],
        sort: [
            {sort: "6G+128G",price: "1999"}, 
            {sort: "8G+128G",price:"2399"}
        ],
        status: 1,
        cover: "https:// https://i8.mifile.cn/a1/pms_1550642240.48638886.jpg"
    }
}
```

### 1.3 获取订单列表
url：getOrderList GET

发送：
```
/getOrderList?page=1&uid=1&status=1

page: 页数，必传
uid：可选参数，如果未传，即为没有uid检索限制
status: 可选参数，如果未传，即为没有status检索限制 (数据库需求文档的订单表中写有各状态说明)

示例：
/getOrderList?page=1&uid=1             获取用户id为1的订单列表

/getOrderList?page=1&uid=1&status=2    获取用户id为1的，订单状态为2的订单列表

/getOrderList?page=1&status=2          获取订单状态为2的订单列表

/getOrderList?page=1                   获取系统的所有订单

```

返回：
```js
{
    code: 1,
    data: [
        total: 100,
        orderList: [
            {
                id: 1,
                uid: 1,
                userName: "李大帅",
                itemId: 1,
                title: "小米9 全息幻彩全曲面玻璃机身 / 骁龙855旗舰处理器",
                cover: "https://i8.mifile.cn/a1/pms_1550642240.48638886.jpg",
                color: "少女粉",
                sort: "8G+128G",
                price: 2999,
                status: 2,
                delivery: 123456789,
                time: 1554449715000,
                receive: "河南省安阳市文峰区安阳工学院 李大帅 11111111111"
            }
            // ... ... 一页十条数据
        ]
    ]
}
```

### 1.4 获取商品评论
url：/getComment?id=1 GET

发送：
```
/getComment?id=1

id: 商品id
```

返回：
```js
{
    code: 1,
    data: [
        {
            name: "李大帅",
            star: "5",
            content: "这手机真棒!"
        }
        // ... ... 不分页
    ]
}
```



## 2. 用户界面

### 2.1 账户充值
url：/recharge GET

发送：
```
/recharge?money=1000
```


### 2.2 生成订单（购买商品）
url：/createOrder

注意：生成1个订单后，把该商品对应的saleNum（销售量）+1

发送：
```js
{
    itemId: "1",
    color: "少女粉",
    sort: "8G+128G",
    price: "2999", // 这里的价格已经根据订单的sort和count处理过，直接存入数据库
    time: "1554449715000",
    count: "1",
    receive: "河南省安阳市文峰区安阳工学院 李大帅 11111111111"
}
```

### 2.3 确认收货
备注：订单状态由2改为3

url：/receiveOrder GET

发送：
```
/receiveOrder?id=1

id: 订单id
```

### 2.4 申请退货
备注：商品状态由3改为4

url：/backOrder GET

发送：
```
/backOrder?id=1

id: 订单id
```

### 2.5 添加购物车
url：/addCart POST

发送：
```js
{
    itemId: "1",
    count: "1",
    color: "红色",
    sort: "8+128G",
    price: "1000", // 这里的price是商品单价
    time: "1111111111111"
}
```

注意：当用户把一件商品选择好了颜色和规格点击加入购物车时，后台需要检索用户添加的这件商品的所选规格和颜色，是否已存在在于该用户的购物车中，具体的对比方法为：

- 对比uid itemId color sort这三个字段是否与购物车表中的某条数据重复
- 如果有重复，就说明用户已经把这件商品加入过购物车（如用户购物车里已存在了一台“红色8G+128G小米9”，此时用户再向购物车添加一台红色8+128G的小米9），不新增数据，只增加已有数据的count字段（把原来的1台改为2台）；
- 如果没有重复，说明用户第一次把该商品加入购物车，直接想购物车表中添加一条新数据。

### 2.55 获取用户购物车列表
url：/getCartList

返回：
```js
{
    code: 1,
    data: [
        {
            id: "1", // 购物车id
            itemId: "1",
            title: "小米9",
            cover: "https://i8.mifile.cn/a1/pms_1550642240.48638886.jpg",
            count: "1",
            color: "红色",
            sort: "8+128G",
            price: "1000", // 这里的price是商品单价
        },
        // ... ... 不分页
    ]    
}
```

### 2.6 修改购物车商品数量
url: /modifyCart POST

发送：
```js
{
    id: '1', // 购物车id
    count： '10'
}
```

### 2.7 删除购物车商品
url: /deleteCart GET

发送：
```
/deleteCart?id=1

id: 购物车id
```

### 2.75 评论商品
url: /commentItem POST

发送：
```js
{
   itemId: "1",
   star: "5",
   content: "手机不错"
}
```

### 2.8 修改用户信息
url：/modifyUserInfo POST

发送：
```js
{
    name: "李大帅",
    receive: "河南省安阳市文峰区安阳工学院"
}
```

### 2.9 修改密码
url：/modifyPwd POST

发送：
```js
{
    oldPwd: "111222333",
    newPwd: "123456"
}
```

返回：
```js
// 修改成功
{
    code: 1
}

// 修改失败
{
    code: 0,
    msg: "原始密码不正确"
}
```




## 3. 管理员界面

### 3.1 发布商品
url：/publishItem POST

注意：插入一条新数据需要把saleNum初始化为0

发送：
```js
{
    title: "小米9 现货128G 辣鸡手机不要购买",
    price: "1999",
    stock: '1000',
    introduction: "<p>商品介绍</p>"
    color: ['蓝色', '红色', '黑色'],
    sort: [
        {sort: "6G+128G",price: "1999"}, 
        {sort: "8G+128G",price:"2399"}
    ],
    status: '1',
    cover: "https:// https://i8.mifile.cn/a1/pms_1550642240.48638886.jpg"
}
```

### 3.2 删除订单
url：/deleteOrder?id=1 GET

### 3.3 订单发货
url: /publishOrder POST

注意：将订单状态由1改为2

发送：
```js
{
    id: 1, // 订单id
    delivery: "123456789"
}
```

### 3.4 处理退货
url: /manageBackOrder POST

发送：
```js
// 确认退货发送的数据
{
   id: 1, // 订单id
   status: 5
}

// 确认退货发送的数据
{
   id: 1, 
   status: 6
}
```
 
### 3.5 修改商品信息
url: /modifyItem

发送：
```js
{
    id: '1', // 商品id
    title: "小米9 现货128G 辣鸡手机不要购买",
    price: "1999",
    stock: '1000',
    introduction: "<p>商品介绍</p>"
    color: ['蓝色', '红色', '黑色'],
    sort: [
        {sort: "6G+128G",price: "1999"}, 
        {sort: "8G+128G",price:"2399"}
    ],
    status: '1',
    cover: "https:// https://i8.mifile.cn/a1/pms_1550642240.48638886.jpg"
}
```

### 3.6 获取用户列表
url：/getUserList GET

注意：获取的用户身份为user

返回：
```js
{
    id: 1,
    account: 111111111,
    money: 1000
}
```

### 3.7 删除用户
url: /deleteUser GET

发送
```
/deleteUser?id=1

id：用户id
```



 
 