import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!='PATCH')
    {
        return res.status(405).end();
    }
    try{
        const {currentUser} = await serverAuth(req, res);
        const {name, username, bio, image} = req.body;
        if(!name || !username){
            console.log(name+" "+username);
            throw new Error('Missing Fields ');

        }
        const updatedUser = await prismadb.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                name,
                username,
                bio,
                image
            }
        });
        return res.status(200).json(updatedUser);
    }
    catch(error)
    {
        console.log(error);
        res.status(400).end();
    }
}