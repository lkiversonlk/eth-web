---
title: 深入浅出Ethereum 2 教你发行ICO
date: 2017-08-20
---
ICO最近火的一塌糊涂，一般的套路是这样的，我到ICO网站上说：
>“我有一个XXX项目，以后肯定有前景，但现在缺乏资金。于是我计划发行2000W个ABC币，以后我的项目发财了会给持有人回报。大家有意向投资的，请在XXX日XX时向XXXXXXXX地址中发送ETH币，每个账户限发一次，发送后按XX比例自动兑换ABC币。“

奇怪，为啥是发送ETH币到XXXX地址？怎么做到每个账户限发一次，其实这背后都是用到了Ethereum的智能合约功能。
这次我们也来发行一把ICO
***本文不会涉及太多技术，主要是原理***
#### 智能账户伪码
在上一篇文章里已经讲了什么是智能合约，就是一个接收到消息时会自动执行一些代码的Ethereum智能账户。那现在我要做ICO，怎么用智能合约实现呢？
ICO用的是这样一个智能账户：
1. 它有两个状态，一个ETH地址，存放了创建这个合约的人的地址，另一个是一个字典，表示ETH地址到一个整数值的映射，这个用来保存当前各个持有人的份额。
2. 主要有两个函数：
  * 接收函数
每当收到ETH转账时，它根据转账量和比例系数算出要给发送ETH的账户多少ABC币，然后在它自己的字典存，为该账户添加同样数量的ABC币。
  * 销毁函数
当智能合约结束时，该账户会自动把自己所有的ETH币发送到创建者的账户里。

**就这么简单！**丧心病狂的简单！抛去区块链的外衣，其实就是发行方有一个账本，你给他多少ETH，他就按比例给你记一下你有多少ABC币。他想发行多少就多少，想给谁增加就给谁增加。

#### ICO为啥这么火？
。。。这还用说，这么明显的旁氏骗局，买入的人图它之后会暴涨呗。我身边就有暴涨十几倍的例子，即使大家都知道是泡沫，但是只要歌曲还在继续，舞蹈就不能停歇，只要不砸在最后一棒，大家都是赢家。