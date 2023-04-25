const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying Mocks...")
        const mockV3Aggregator = await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        if (mockV3Aggregator.newlyDeployed) {
            log(
                `Contract MockV3Aggregator deployed at ${mockV3Aggregator.address} using ${mockV3Aggregator.receipt.gasUsed} gas`
            )
            log("------------------------------------------------")
        }
    }
}

module.exports.tags = ["all", "mocks"]
