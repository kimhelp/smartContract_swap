// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract EthSwap{
    string public name = "EthSwap Instant Excharge";
    ERC20 public token;
    uint public rate = 100;
  //타입 접근제한자 변수명

    //helpToken CA
    constructor(ERC20 _token){
        token = _token;
    }
    function getThisAddress() public view returns(address){
        return address(this); // this => EthSwap CA
    }
    function getMsgSender() public view returns(address){
        return msg.sender; // EthSwap 을 실행 시킨 사람
    }
    function getToken() public view returns(address){
        return address(token);
    }
    function getSwapBalance() public view returns(uint){
        return token.balanceOf(msg.sender);   
    }
    function getTokenOwner() public view returns(address){
        return token._owner();
    }
    //Eth -> TOken buy
    //1ETh 1token
    function buyToken() public payable {
        uint256 tokenAmount = msg.value * rate;
        require(token.balanceOf(address(this)) >= tokenAmount,'error [1]');
        token.transfer(msg.sender, tokenAmount);
    }

    //Token -> Eth sell
    function sellToken(uint256 _amount) public payable{
        //이 트랜스퍼를 실행하는 사람이 무조건 eth.swap 이기때문에 주소가 address.(this)일 수 밖에 없다.
        // token.transfer(address(this), _amount);
        require(token.balanceOf(msg.sender) >= _amount);
        uint256 etherAmount = _amount/rate; //50token > 0.5eth

        //require은 node랑 다르게 true/false 값을 내오는 코드를 쓰고 참일경우에만 밑 코드를 진행하는 것이다.

        require(address(this).balance >= etherAmount); //ethswap 가지고있는 이더가 0.5보다 많은가?
        token.transferFrom(msg.sender, address(this), _amount); //token account1 > ethswap 50개받고
        payable(msg.sender).transfer(etherAmount); //ethswap > account 0.5 ether
    }

}