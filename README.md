# Microlip Wallet
We are a Fintech bridging micropayment financial institutions and services to the Interledger Protocol (ILP),
XRP. XRPL, and vice versa unlocking a new world of possibilities

# How to install and test
- Change into the root folder 
- Run `npm install`
- Create a .env file at the root folder. Use any twillio credetials SID, TOKEN for secret key
- send a POST HTTP request using postman or any REST client and send the following payload
  ```
  {
    "amount": "1",
    "address": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
    "phone": "+256785442776",
    "message": "You have won 10 xrp"
}
  ```

