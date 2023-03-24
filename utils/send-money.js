const xrpl = require("xrpl");

const sendXrp = async ({amount, address}) => {
    try{
      const wallet = xrpl.Wallet.fromSeed(address);
      const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
      await client.connect();
      const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account": wallet.address,
        "Amount": xrpl.xrpToDrops(`${amount}`),
        "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
      });
      const max_ledger = prepared.LastLedgerSequence
      console.log("Prepared transaction instructions:", prepared);
      console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP");
      console.log("Transaction expires after ledger:", max_ledger);

      const signed = wallet.sign(prepared);
      console.log("Identifying hash:", signed.hash);
      console.log("Signed blob:", signed.tx_blob);

      const tx = await client.submitAndWait(signed.tx_blob);
     
      client.disconnect();

      return tx;
    }catch(e){
        return false;
    };
}

module.exports = {sendXrp};