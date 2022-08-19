import { client } from "../config/redis"
import HttpStatus from 'http-status-codes';

export const redisNotes = async (req,res,next) => {
    const data = await client.get('Notes');
    if(data){
        const result = JSON.parse(data)
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: result,
            message: "Notes Fetched from Redis successfully"
        })
    }else{
        next();
    }
}