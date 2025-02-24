import { fastify } from "fastify";
import {fastifyCors} from "@fastify/cors"
import {validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform} from "fastify-type-provider-zod"
import {fastifySwagger} from "@fastify/swagger";
import {fastifySwaggerUi} from "@fastify/swagger-ui";
import { subscribeToRoute } from "./routes/subscribe-to-event-route";
import { env } from "./env";
import { accessInviteLinkRoute } from "./routes/access-invite-link-route";
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite-clicks";
import { getSubscriberInvitesCountRoute } from "./routes/get-subscriber-invites-count-route";
import { getSubscriberRankingPositionRoute } from "./routes/get-ranking-position-route";
import { getRankingRoute } from "./routes/get-ranking-route";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);


app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToRoute);
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({port: env.PORT}).then(() => {
    console.log('HTTP server running')
})