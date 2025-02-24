import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getRanking } from "../functions/get-ranking"
import { count } from "console";


export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/ranking',
        {
            schema: {
                summary: "Get ranking ",
                tags: ['referral'],
                response: {
                    200: z.object({
                        ranking: z.array(

                            z.object({
                                id: z.string(),
                                name: z.string(),
                                score: z.number(),
                            })
                        ),
                    }),
                },
            },
        },
        async (request) => {
            const { rankingWithScore } = await getRanking()

            return { ranking: rankingWithScore }
        }
    )
}