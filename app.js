const ampq = require("amqplib/callback_api");
const bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/send", (req, res) => {
  console.log(req.body);
  ampq.connect("amqp://localhost", function (err1, conn) {
    if (err1) {
      throw err1;
    }
    conn.createChannel(function (err2, channel) {
      if (err1) {
        throw err1;
      }

      const queue = req.body.fruit;
      const msg = req.body.message;

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(`${queue}: ${msg}`));
      console.log(" [x] Sent %s", msg);
    });
    // setTimeout(function () {
    //   conn.close();
    //   process.exit(0);
    // }, 500);
  });
  res.send("OK");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
