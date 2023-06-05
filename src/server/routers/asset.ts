import prisma from '../prisma'
import { router, publicProcedure } from '../trpc'

export const assetRouter = router({
    list: publicProcedure
        .query(async () => {
            const assets = await prisma.assets.findMany()
            return assets
        }),
});
