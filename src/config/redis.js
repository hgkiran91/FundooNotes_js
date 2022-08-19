import { createClient } from "redis";
import logger from "./logger";

export const client = createClient();

const clientRedis= async () => {
    try{
        await client.connect();
        logger.info('Connected to the redid database.');
    }catch(error){
        logger.error('Could not connect to redis database.', error);
    }
}

export default clientRedis;