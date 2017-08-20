var YellowPage = artifacts.require("./yellow_page.sol");
module.exports = function(deployer) {
  deployer.deploy(YellowPage);
};
