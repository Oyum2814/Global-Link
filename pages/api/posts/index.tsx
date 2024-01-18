import { NextApiRequest, NextApiResponse } from "next"
import serverAuth from "@/lib/serverAuth";
import prismadb from '@/lib/prismadb';

export default  async function(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='POST' && req.method!=='GET' && req.method!=='DELETE'){
        return res.status(405).end();
    }
    try{
        if(req.method==='POST')
        {
            const {currentUser} = await serverAuth(req,res);
            const { body } = req.body;
            const post = await prismadb.post.create({
                data:{
                    body,
                    userId:currentUser.id
                }
            });
            const updatedUser = await prismadb.user.update({
                where: {
                  id: currentUser.id,
                },
                data: {
                  posts: {
                    connect: {
                      id: post.id,
                    },
                  },
                },
                include: {
                    posts: true, // Include the posts relation in the result
                },
              });
            res.status(200).end();
        }
        else if(req.method==='DELETE') {

            const { currentUser } = await serverAuth(req, res);
            const { postId } = req.body;

            const existingPost= await prismadb.post.findUnique({
                where: {
                  id: postId,
                }
            });
            if (!existingPost) {
                throw new Error('Invalid ID');
            }
            try{
                
                const deletedPost = await prismadb.post.delete({
                    where:{
                        id:postId,
                    },
                });
                res.status(200).json(deletedPost);
            }
            catch(error)
            {
                console.log(error);
            }
        }
        else if(req.method==='GET')
        {
            try{

                
                const userId = req.query.userId as string;
                let posts;

                if(userId && typeof userId ==='string')
                {
                    posts = await prismadb.post.findMany({
                        where:{
                            userId
                        },
                        include:{
                            user:true,
                            comments:true
                        },
                        orderBy:{
                            createdAt:'desc'
                        }
                    });
                }
                else{
                    posts = await prismadb.post.findMany({
                        include:{
                            user:true,
                            comments:true,
                        },
                        orderBy:{
                            createdAt:'desc'
                        }
                    })
                }
                res.status(200).json(posts);
            }
            catch(error) {
                console.log("Error in loading posts :"+error);
                res.status(400).end();
            }
        }
        
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).end();
    }
}