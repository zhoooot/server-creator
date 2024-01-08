import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const USER_EXCHANGE_NAME = 'user';
export const USER_ROUTING_KEY = 'user.register';
export const RABBITMQ_URL = process.env.RABBITMQ_URL;
