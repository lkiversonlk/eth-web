---
title: 深入浅出Ethereum 3 我们来写一个智能合约
date: 2017-08-20
---
更多信息可以前往 [www.94eth.com](http://www.94eth.com)

今天要讲的就是干货了！
#### 预备条件
1. 你要有nodejs开发环境
2. 阅读我的前几篇文章，了解基本的概念
#### 一个超级简单的智能合约
我们先写一个超级简单的智能合约--加法计算器。

* IDE
目前写智能合约比较通用的语言是solidity，我们的教学也从solidity开始。
 既然写code，第一个需要的就是一个顺手的IDE,这里推荐[Remix](https://remix.ethereum.org/#version=soljson-v0.4.15+commit.bbb8e64f.js)，一个online的IDE。
打开Remix后，其它的也不用看了，开始写我们的第一个contract.

* Coding

      pragma solidity ^0.4.1;  //编译器要求

      contract Add {  
            address public owner;    //合约创建者

            function Add(){
                owner = msg.sender;
            }
    
            function Go(uint x, uint y) returns (uint){
                return x + y;            //加法
            }
      }

Code的解释如下：
1. 第一行是编译器需求，照样填写就行。
1. contract XX {} 就是合约定义的语法，这里我们定义了一个叫做Add的合约。
1. 合约里有一个owner字段，类型是address，我们的eth账号的地址就是这种类型，设置为public，这样其它用户可读。
1. function Add为合约的初始化函数，创建合约其实就是用户往一个空地址发送了一条消息，然后就会执行这个初始化函数。
1. 在Add里，将owner设置为msg.sender，msg.sender为一个预置变量，表示这个消息的发送者，在这里就是该智能合约的创建者的地址。
1. function Go就是我们之后暴露给外部调用者的函数，接收两个uint，返回加和之后的值。

code写完后，我们可以复制到add.sol文件中.

* 编译
编译solidity程序需要对应的编译器，我们可以安装solc编译器。

        npm install -g solc

  然后编译我们刚刚写好的文件。
 
       solcjs --abi --bin add.sol     //add.sol就是刚刚写的程序
  这里--abi表示生成合约的abi文件，--bin表示生成代码文件, 编译成功后会在当前目录下生成一个abi文件和一个bin文件，两个文件的意思我之后会讲。

#### 准备部署环境
 * testrpc
讲道理，部署到真实线上我们是需要连接公共的区块链的，但这里我们只是做实验，所以部署一个仿真的单机区块链就行了。
下载testrpc，它会替我们准备一个单机的区块链环境:
        
        npm install -g ethereumjs-testrpc

    然后单独启动一个命令行，输入:

        testrpc
    它会显示出一堆内容，最后一行应该是：

        Listening on localhost:8545
    ok，testrpc就在你本机启动了一个区块链，在8545端口上等待rpc请求。

* 连接到testrpc
首先，连接testrpc需要web3.js，继续在刚才那个sol源程序文件的路径，安装web3.js

        npm install web3.js@0.20.1    //我的机器安装最新版本有问题，所以安装的0.20.1版本

    然后，启动node，连接上我们单机的区块链:

        node
        >var Web3 = require("web3");
        >var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        >eth = web3.eth
        >eth.accounts    //显示当前的账号

    现在web3对象就是我们的区块链连接了，我们就是要通过这个web3将我们刚写的合约部署到本机上的区块链里。
* abi文件和bin文件
现在该回头了解下我们刚编译生成的abi和bin文件了。
abi文件是我们的合约对外的接口描述，以后其它人要调用我们部署的智能合约的话，就需要知道我们的合约有哪些方法可以调用，这个就靠abi文件。
bin文件是我们的智能合约的源码，这个是要部署到区块链里，以后让挖矿程序帮你执行的。
所以我们需要做的事，是首先根据abi文件创建一个contract的类，然后将这个类结合源码一起部署到区块链上，最后会得到部署的区块链实例的地址。
当其它人需要调用我们部署的合约的时候，首先需要根据abi文件创建一个类，然后将这个类指到我们刚部署的地址上，这样他们就有了一个指向智能合约的代理，通过这个代理，他们就可以调用智能合约的函数了。

#### 部署

* 读取abi文件和bin文件
        
       >abi = JSON.parse(fs.readFileSync("xxxx.abi").toString())
       >code = fs.readFileSync("xxxx.bin").toString()
    abi文件是json格式的，读出来后用JSON解析下，bin文件就是编译源码，直接保留

       >contract = eth.contract(abi)
       >deployed = contract.new({from: eth.accounts[0], data: code, gas: 470000})

     deployed就是部署的实例了，contract.new就是部署，接收的参数里from表示用哪个账号去创建，这个账号的地址就会是contractg构造函数里的那个msg.sender，也就是这个合约以后的owner了

        >eth.accounts[0]
        >deployed.owner()

    发现没有，我们创建合约时填入的eth.accounts[0]就是deployed.owner()，这就是我们的合约Add的构造函数执行的结果。
  
        >deployed.address
    这样可以获取部署的实例的地址，请复制下这个地址值，每个人运行之后的地址值应该都不一样，我这里是0xd0248b7c71bce1400f595ee818a7a619db58b4b2。

     我们现在可以把自己当做另外一个使用者，获取了abi文件和合约地址，现在我们要调用该合约。

        >c = eth.contract(abi)
        >instance = c.at("0xd0248b7c71bce1400f595ee818a7a619db58b4b2")

     首先根据abi文件构造合约接口，然后指向合约部署的地址

      >instance.owner()
      >instance.Go.call(1, 2)
      >instance.Go(1, 2, {from:eth.accounts[0]})

    看，我们可以调用部署的合约了，这里我们就调用了合约的Go函数，注意这里使用了两种调用方法Go.call()和Go()，这两种有什么区别呢？

    Go.call()只是在本地运行环境里调用了Go方法，并不会实际对区块链产生影响。这里我们只是做一个加法运算，所以本地调用就可以得到Go.call(1, 2) = 3了。
    直接调用Go()是会真实发出消息，最后加到区块链上的，因此必须指明发送者账号。而且返回值是一个长长的地址，这个地址是刚发出的消息最后在区块链上的编码位置。有些接口的调用是会改变智能合约的状态的，这个时候就必须直接调用Go方法。
 
    只要之前运行的testrpc不退出，当前这个区块链上就一直有我们刚刚部署的智能合约在。

     发送到真实的区块链网络上和发送到测试区块链上有稍许不同，这个我们之后再谈，小伙伴们，快来写下自己的第一个智能合约吧！

-------------------------------------
我的个人网站上线啦，[www.94eth.com](http://www.94eth.com/)，现在内容还很少，只是把文章录过去了，之后我会在上面放一些智能合约的应用和Dapp~寻求志同道合的小伙伴一起努力呀。
欢迎加入以太合约技术交流，群号码：654894791