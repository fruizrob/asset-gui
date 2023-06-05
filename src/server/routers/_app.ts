import { publicProcedure, router } from '../trpc';
import { assetRouter } from './asset';
import { relationRouter } from './relation';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  asset: assetRouter,
  relation: relationRouter,
});

export type AppRouter = typeof appRouter;
