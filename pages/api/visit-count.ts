import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from  '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Increment the visit count
      const updatedCount = await prisma.visitCount.upsert({
        where: { id: 1 },
        update: { count: { increment: 1 } },
        create: { id: 1, count: 1 },
      })

      res.status(200).json({ count: updatedCount.count })
    } catch (error) {
      console.error('Failed to update visit count:', error)
      res.status(500).json({ error: 'Failed to update visit count' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}