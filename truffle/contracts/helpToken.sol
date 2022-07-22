// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// import [변수명] from "../helloworld.sol"
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract helpToken is ERC20{
    string public _name = "helpToken";
    string public _symbol = "HTK";
    uint256 public _totalSupply = 100000 * (10**decimals());
    constructor() ERC20(_name,_symbol){
        _mint(msg.sender, _totalSupply);
    }
    // swap 이라는 컨트렉트를 만들어서 토큰끼리 서로 상호작용을 해서 사용자에게 제공하는
    
}