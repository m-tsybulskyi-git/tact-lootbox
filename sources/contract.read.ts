import { Address} from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { LootBoxContract } from "./output/sample_LootBoxContract";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });

    let contract_address = Address.parse("EQCHcWAcKtbY5E75piPJYmqyhKwDNa7fF5SU2LTzEWnzFL7-");
    let contract = LootBoxContract.fromAddress(contract_address);
    let contract_open = client.open(contract);
    let param = await contract_open.getBiggestWin() / BigInt(1000000000);
    console.log("getBiggestWin: " + (param));
})();