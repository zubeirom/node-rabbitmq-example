const fs = require("fs");
const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "apple";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(
      " [*] RECEIVER 1 Waiting for messages in %s. To exit press CTRL+C",
      queue
    );

    channel.consume(
      queue,
      function (msg) {
        console.log(
          " [x] Received %s -- writing to file",
          msg.content.toString()
        );
        fs.appendFileSync("myMessages.log", msg.content.toString() + "\n");
      },
      {
        noAck: true,
      }
    );
  });
});
