# swap

이더에서 토큰
ETH -> ERC20

토큰에서 이더
ERC20 -> ETH

allowance
approve
transferFrom

Token 만들때 쉽게 만드는 방법을 배운다.

```sh
mkdir truffle
cd truffle
truffle init
npm init -y

npm i openzeppelin-solidity
```

openzeppelin-solidity > contracts > token > ERC20

# swap contract를 쓰는 이유

컨트렉트 끼리 통신을 시킬것이다.

CA[1] CA[2]
contract A contract B

         ->>호출
         <->사용

smart contract : this
msg.sender = tx를 일으킨사람

allowance
approve
transferFrom
