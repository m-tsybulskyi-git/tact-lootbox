import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { LootBoxContract } from "./output/sample_LootBoxContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    // Parameters
    let testnet = true;
    let packageName = "sample_LootBoxContract.pkg";
    let owner = Address.parse("0QDERojWOtp6fx3p8X0XSBCWmibdOzDzoskEVH6jN3Vt_ssC")
    let init = await LootBoxContract.init(owner);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
