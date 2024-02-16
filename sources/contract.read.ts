import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { Address, OpenedContract, fromNano  } from "@ton/core";
import { LootBoxContract } from "./output/sample_LootBoxContract";

(async () => {
    const client = new TonClient({
        endpoint: await getHttpEndpoint({ network: "testnet" }),
    });

    let contract_address = Address.parse("EQDYfALh5zjhkNDDIwyRXtTtQKLVcrNs2xiprpWmDyvdIU2c");

    let contract = LootBoxContract.fromAddress(contract_address);
    let contract_opened = client.open(contract) as OpenedContract<LootBoxContract>;

    let address = Address.parse("0:65e8a3453e3cff10c7bee7834bc5932940cbb9f6afee2d72770f89150990cca2")
    let paramUserStats = await contract_opened.getUserStats(address);
    console.log("user stats: counter: " + (paramUserStats?.counter));
    console.log("user stats: biggestWin: " + fromNano(paramUserStats?.biggestWin!!));
    console.log("user stats: lastWin: " + fromNano(paramUserStats?.lastWin!!));

    let paramGlobalStats = await contract_opened.getGlobalStats();
    console.log("global stats: counter: " + (paramGlobalStats?.counter));
    console.log("global stats: biggestWin: " + fromNano(paramGlobalStats?.biggestWin!!));
    console.log("global stats: lastWin: " + fromNano(paramGlobalStats?.lastWin!!));
})();
