import { PrismaClient } from "@prisma/client";

const debug = Boolean(process.env.APP_DEBUG)

const prismaClient = new PrismaClient({
  errorFormat: 'pretty',
  log: debug ? [{ emit: 'event', level: 'query' }] : []
});

if (debug) {
  prismaClient.$on("query", async ({query, params, duration}) => {
    console.log({ query, params, duration: duration + 'ms' });
  })
}

export default prismaClient;
