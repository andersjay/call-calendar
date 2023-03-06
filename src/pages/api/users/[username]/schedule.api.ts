import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const username = String(req.query.username);

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user){
    return res.status(404).json({ message: "User does not exist." });
  }


  const createSchedulingBody = z.object({
    name: z.string(),
    email: z.string().email(),
    observations: z.string(),
    date: z.string().datetime()
  })

  const { name, email, observations, date } = createSchedulingBody.parse(req.body);

  return res.json({})
}