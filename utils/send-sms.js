require('dotenv').config();
const accountSid = process.env.SID;
const authToken =  process.env.TOKEN;


const client = require('twilio')(accountSid, authToken);

const sendSMS = async({body, to}) => {
    try{
    await client.messages.create({
        body,
        from: '+14754656210',
        to
      });
    }catch(e){
        console.log('failed to send', e?.message);
    }
};  

module.exports = {sendSMS};