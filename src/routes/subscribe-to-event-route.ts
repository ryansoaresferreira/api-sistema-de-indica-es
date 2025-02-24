import {z} from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { SubscribeToEvent } from "../functions/subscribe-to-event";

export const subscribeToRoute: FastifyPluginAsyncZod = async (app) => {
    app.post('/subscriptions', {
        schema: {
            summary: "Subscribe someone to the event",
            tags: ['Subscription'],
          body: z.object({
             name: z.string(),
             email: z.string().email(), 
             referrer: z.string().optional(),
          }),
          response: {
            201: z.object({
              subscriberId: z.string(),
            })
          },
        },
      }, async (request, reply) => {
         const {name, email, referrer} = request.body

         const { subscriberId } = await SubscribeToEvent({
          name,
          email,
          referrerId: referrer,
         })
      
         return reply.status(201).send({
          subscriberId
         })
      })


}

