const { sendXrp } = require("./utils/send-money");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const amount = req.body.amount, address = req.body.address;
    const data = await sendXrp({amount, address});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred: ' + JSON.stringify(err?.message));
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});