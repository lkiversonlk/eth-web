---
title: Eth-YellowPage parser   智能合约黄页解析
date: 2017-08-21
---

Eth-YellowPage is a contract YellowPage in Ethereum.
智能合约黄页用来登记大家的智能合约名称和对应的合约地址以及合约Abi文件，方便别人查找和使用。

The current address is in [0x203706ade0fea007a21b46441449fe4104dccdeb](https://etherchain.org/account/0x203706ade0fea007a21b46441449fe4104dccdeb)。
目前的智能合约黄页地址在[0x203706ade0fea007a21b46441449fe4104dccdeb](https://etherchain.org/account/0x203706ade0fea007a21b46441449fe4104dccdeb)。

The sol file is in [Github](https://github.com/lkiversonlk/eth-yellowpage/blob/master/contracts/YellowPage.sol)
sol文件在[Github](https://github.com/lkiversonlk/eth-yellowpage/blob/master/contracts/YellowPage.sol)。

Anyone could use this [ABI file](https://github.com/lkiversonlk/eth-yellowpage/blob/master/build/contracts/YellowPage.json) to call **SetPage()**, provding info below:
任何人都可以通过这个[ABI文件](https://github.com/lkiversonlk/eth-yellowpage/blob/master/build/contracts/YellowPage.json)来调用黄页的**SetPage()**接口写入你的智能合约信息，提供参数如下

| Name(bytes32) | Contract Address(address) | url(bytes32) | abi_url(bytes32) |
|-|------|-|-|
| name of your contract  |  contract address | url to get info about the contract  | abi file url | 
| 智能合约名称 | 合约地址 | 合约信息 url | abi文件url |

it stores info by name, I personally have a website www.ethheyue.com which will display the infos in the contract.

You may use this npm package to read from the contract.
你可以使用这个npm包来解析黄页上的信息。

#### Register your contract in the YellowPage
#### 在黄页上注册你的智能合约

1. if the name is not registered yet, you may register as you want, not charge.
如果该名称还未注册，你可以注册。
2. if the name is registered, but you are the one who registered it, you may alter it.
如果该名称已经注册，但是注册者就是你，你可以修改它。
3. if none of the above is True, then only the owner of the YellowPage could alter it.
如果以上条件都不成立，请联系黄页拥有者。

#### Installation 安装
       npm install eth-yellowpage
#### initial 初始化
1. Connect to the ethereum using web3.js
2. Init the YellowPage with the web3 instance
        
        var YellowPage = require("eth-yellowpage").EthYellowPage;        
        var yellowPage = new YellowPage(web3);
that's all!
#### get specified contract's info by name 根据名称取合约信息

        console.log(yellowPage.ReadByName("ab"));

#### get the total count of contract registered 获取注册合约总数

        console.log(yellowPage.TotalCount());

#### get the name of the contract by index 获取指定序号合约的名称

        console.log(yellowPage.GetName(0));

#### please contact me city.of.beijing@gmail.com 邮件地址

---------------------------------