const ampq = require("amqplib/callback_api");

ampq.connect("amqp://localhost", function (err1, conn) {
  if (err1) {
    throw err1;
  }
  conn.createChannel(function (err2, channel) {
    if (err1) {
      throw err1;
    }

    const queue = "exampleQueue";
    const msg = process.argv[2];

    channel.assertQueue(queue, {
      durable: false,
    });
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  function send(i, channel, queue) {
    setTimeout(() => {
      console.log("");
    }, 1000);
  }

  setTimeout(function () {
    conn.close();
    process.exit(0);
  }, 500);
});
