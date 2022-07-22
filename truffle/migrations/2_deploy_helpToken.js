const helpToken = artifacts.require("helpToken");
const EthSwap = artifacts.require("ethSwap");

module.exports = async function (deployer) {
  try {
    await deployer.deploy(helpToken); // tx보내기 배포 진행
    const token = await helpToken.deployed(); //tx내용 가져오기 token.address = CA가 있음

    await deployer.deploy(EthSwap, token.address); // 배포 진행, ethSwap
    const ethSwap = await EthSwap.deployed()
  } catch (e) {
    console.log(e.message);
  }
};
