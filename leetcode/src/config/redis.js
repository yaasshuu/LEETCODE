const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-10650.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 10650
    }
});
module.exports =redisClient;