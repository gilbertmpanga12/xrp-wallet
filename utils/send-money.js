const xrpl = require("xrpl");

const sendXrp = async ({amount, address}) => {
    try{
      const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
      console.log("Connecting to Testnet...")
     
      await client.connect()
    
      // Get credentials from the Testnet Faucet -----------------------------------
      console.log("Getting a wallet from the Testnet faucet...")
      const {wallet, balance} = await client.fundWallet()
    
      // Prepare transaction -------------------------------------------------------
      const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account": wallet.address,
        "Amount": xrpl.xrpToDrops("" + amount),
        "Destination": address
      })
      const max_ledger = prepared.LastLedgerSequence
      console.log("Prepared transaction instructions:", prepared)
      console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
      console.log("Transaction expires after ledger:", max_ledger)
    
      // Sign prepared instructions ------------------------------------------------
      const signed = wallet.sign(prepared)
      console.log("Identifying hash:", signed.hash)
      console.log("Signed blob:", signed.tx_blob)
    
      // Submit signed blob --------------------------------------------------------
      const tx = await client.submitAndWait(signed.tx_blob)
    
      // Wait for validation -------------------------------------------------------
      // submitAndWait() handles this automatically, but it can take 4-7s.
    
      // Check transaction results -------------------------------------------------
      console.log("Transaction result:", tx.result.meta.TransactionResult)
      console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
    
      // End of main()
      client.disconnect();
      return tx;
    }catch(e){
        return false;
    };
}

module.exports = {sendXrp};