import {db} from "../db";
import { createHash } from "crypto";
export interface User {
    _id: number;
    nick: string;
    sesseh: string;
    username: string;
    hash: string;
    last_login: Date;
}
const users = db.collection('users')

export const createUser = async (username:string,password:string)=> {
    const hash = createHash('sha256').update(password).digest('hex');
    
    await users.insertOne({username,hash,nick:username,sesseh:''})
}
export const verifyUser = async (username:string,password:string)=> {
    const hash = createHash('sha256').update(password).digest('hex');
    const user = await getUser(username);
    if (user && user.hash === hash) {
        return {user,error:null};
    }
    if (user && user.hash !== hash) {
        return {user:null,error:'incorrect password',status:401};
    }
    return {user:null,error:'user not found',status:404};
}
export const getUser = async (username:string)=> {
    const user = await users.findOne({username})
    return user;
}
export const updateLogin = async (username:string)=> {
    const user = await users.findOneAndUpdate({username},{$set:{last_login:new Date()}})
    return user;
}
export const updateSesseh = async (username:string,sesseh:string)=> {
    const user = await users.findOneAndUpdate({username},{$set:{sesseh}})
    return user;
}
