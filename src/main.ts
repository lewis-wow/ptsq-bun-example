import { createServer } from '@ptsq/server';
import { z } from 'zod';

const { router, resolver, serve } = createServer({
  ctx: () => ({}),
});

const baseRouter = router({
  greetings: resolver
    .args(
      z.object({
        name: z.string(),
      })
    )
    .output(z.string())
    .query(({ input }) => {
      return `Hello, ${input.name}`;
    }),
});

const server = Bun.serve(serve(baseRouter));

console.log(`Listening on: http://localhost:${server.port}/ptsq`);

export type BaseRouter = typeof baseRouter;
