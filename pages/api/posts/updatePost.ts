
import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const {currentUser} = await serverAuth(req, res);
  if (!currentUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { postId, body } = req.body;

  try {
    const updatedPost = await prismadb.post.update({
      where: { id: postId},
      data: { body},
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}