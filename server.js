const { sendXrp } = require("./utils/send-money");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Transaction} = require('./utils/validators');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/convert-xrp', async (req, res) => {
  try {
    const result = Transaction.validate(req.body);
    if(result.error){
      return res.status(403).send(result.error.details[0].message);
    };
    const amount = req.body.amount, address = req.body.address;
    const data = await sendXrp({amount, address});
    if(!data) return res.status(500).send({message: "Please check your address or amount and try again"});
    return res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred: ' + JSON.stringify(err?.message));
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

