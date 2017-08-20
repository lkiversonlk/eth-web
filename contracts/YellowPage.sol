pragma solidity ^0.4.1;

contract YellowPage {

    struct Page {
        address contract_address;
        bytes32 url;
        bool    set;
    }

    mapping(bytes32 => Page) public pages;
    address public owner;

    function YellowPage(){
        owner = msg.sender;
    }

    function TransferTo(address newOwner){
        require(msg.sender == owner);
        owner = newOwner;
    }

    function SetPage(bytes32 name, address contract_addr, bytes32 contract_url) {
        if(pages[name].set){
            require(msg.sender == owner);
        }
        pages[name].url = contract_url;
        pages[name].set = true;
        pages[name].contract_address = contract_addr;
    }
}