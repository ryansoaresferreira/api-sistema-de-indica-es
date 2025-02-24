import { redis } from "../redis/client";

interface GetSubscriberInviteClicksParams {
    subscriberId: string
    
}

export async function GetSubscriberInviteClicksParams({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget("referral:access-count", subscriberId)

  return {count: count ? Number.parseInt(count) : 0}
}
