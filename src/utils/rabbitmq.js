var amqp = require('amqplib/callback_api');
import { mailSenderRabbitMQ } from './rabbitmq.mailsender';

let email_Id;

export const sender = (userData) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';
            var msg = JSON.stringify(userData);
            email_Id = userData.email;
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });
    });
}

const receiver = () => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';
 
            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function (msg) {
                console.log(" [x] Received %s", msg.content.toString());
                mailSenderRabbitMQ(email_Id);
            }, {
                noAck: true
            });
        });
    });
};

receiver();