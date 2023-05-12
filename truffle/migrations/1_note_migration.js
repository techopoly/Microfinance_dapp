const note =  artifacts.require("Note");

module.exports = function (deployer){
    deployer.deploy(note);
}