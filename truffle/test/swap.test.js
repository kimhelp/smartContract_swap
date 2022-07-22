const helpToken = artifacts.require("helpToken");
const EthSwap = artifacts.require("ethSwap");
function toEther(n) {
  return web3.utils.toWei(n, "ether");
}

contract("eth swap", ([deployer, account1, account2]) => {
  let token, ethSwap;

  describe("EthSwap deployment", async () => {
    // console.log(deployer, account1, account2);
    it("deployed", async () => {
      token = await helpToken.deployed();
      ethSwap = await EthSwap.deployed(token.address);

      console.log(token.address, ethSwap.address);
      //token.transfer(보내는사람주소,10000)
      await token.transfer(ethSwap.address, toEther("1000")); //ether보내기 하면 기본초기값이 적어져서 밑에가 에러남
    });
    it("토큰 배포자의 기본 초기값 확인", async () => {
      const balance = await token.balanceOf(deployer);
      console.log(balance.toString());
      //   assert.equal(balance.toString(), "100000000000000000000000");
    });
    it("ethSwap-getToken", async () => {
      const address = await ethSwap.getToken();
      //   console.log(address);
      assert.equal(address, token.address);
    });
    it("ethSwap-getMsgSender,getThisAddress", async () => {
      const msgSender = await ethSwap.getMsgSender(); //msg.sender
      const thisAddress = await ethSwap.getThisAddress();
      assert.equal(msgSender, deployer);
      //   console.log(msgSender, thisAddress);
      assert.equal(thisAddress, ethSwap.address);
    });
    it("token-owner 확인", async () => {
      const owner = await token._owner();
      //   console.log(owner);
      assert.equal(owner, deployer);
    });
    it("ethSwap-getTokenOwner", async () => {
      const owner = await ethSwap.getTokenOwner();
      assert.equal(owner, deployer);
    });
    //ERC20 배포한 사람의 EOA 계정을 알고싶음
    it("token-balanceOf", async () => {
      const balance = await token.balanceOf(ethSwap.address);
      console.log(balance.toString());
    });
    it("ethSwap-buyToken", async () => {
      let balance = await token.balanceOf(account1); //balance확인
      assert.equal(balance.toString(), "0"); //0이랑 같은지 확인
      await ethSwap.buyToken({
        from: account1,
        value: toEther("1"),
      });
      balance = await token.balanceOf(account1);
      console.log(balance.toString());

      const ethAccount = await web3.eth.getBalance(account1);
      console.log(ethAccount);

      const ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      console.log(web3.utils.fromWei(ethSwapBalance));
    });

    it("sellToken", async () => {
      const account1_balance = await token.balanceOf(account1);
      console.log(web3.utils.fromWei(account1_balance.toString(), "ether"));

      let swapEth = await web3.eth.getBalance(ethSwap.address);
      let swapToken = await token.balanceOf(ethSwap.address);
      let accountEth = await web3.eth.getBalance(account1);
      let accountToken = await token.balanceOf(account1);

      console.log(
        `swapEth : ${web3.utils.fromWei(
          swapEth,
          "ether"
        )},swapToken : ${web3.utils.fromWei(
          swapToken,
          "ether"
        )},accountEth : ${web3.utils.fromWei(
          accountEth,
          "ether"
        )},accountToken : ${web3.utils.fromWei(accountToken, "ether")} `
      );
      // token from -> to -> 50개 주는 코드
      await token.approve(ethSwap.address, toEther("50"), {
        from: account1,
      });

      //approve가 있기 때문에 transferFrom 이 실행 가능한것이다.

      //여기서 무작정 eth를 받는 코드를 적으면 돈이없었을때 오류가 터진다.
      //그러면 토큰은 받지만 eth는 보내지지않는 상황이 발생 > eth 보내는 코드를 바로 적으면 안됨

      await ethSwap.sellToken(toEther("50"), {
        from: account1,
      });
      //account1 > ethswap 토큰 50개를 보내면
      //ethswap 에서 transferFrom으로 eth를 해당하는 토큰양 만큼 보낸다.
      console.log(
        `swapEth : ${web3.utils.fromWei(
          swapEth,
          "ether"
        )},swapToken : ${web3.utils.fromWei(
          swapToken,
          "ether"
        )},accountEth : ${web3.utils.fromWei(
          accountEth,
          "ether"
        )},accountToken : ${web3.utils.fromWei(accountToken, "ether")} `
      );
    });
  });
});
