const mifi =  artifacts.require("Mifi");

module.exports = function (deployer){
    deployer.deploy(mifi);
}