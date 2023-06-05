import prisma from '../prisma'
import { router, publicProcedure } from '../trpc'

export const relationRouter = router({
    list: publicProcedure
        .query(async () => {
            const relations = await prisma.relations.findMany()
            return relations
        }),
});
