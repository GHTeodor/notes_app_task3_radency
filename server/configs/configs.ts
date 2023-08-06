import {config} from 'dotenv';

config();

export const configs = {
    PORT: Number(process.env.PORT) || 5500,
};