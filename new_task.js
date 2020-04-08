#!/usr/bin/env node

const amqp = require("amqplib/callback_api");

const queue = "task_queue";
const msg = process.argv.slice(2).join(" ") || "Hello World!";

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
