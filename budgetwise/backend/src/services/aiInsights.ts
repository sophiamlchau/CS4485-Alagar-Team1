import { z } from "zod";
import { env } from "../config/env.js";

/**
 * Placeholder for Phase 3.
 * We keep the API contract in /openapi/openapi.yaml and a minimal service stub here.
 * When you implement AI insights, call OpenAI server side and validate the final output with Zod.
 */
export const dashboardAiResponseSchema = z.object({
  cards: z.array(z.object({
    type: z.enum(["alert","onTrack","tip","reallocation"]),
    title: z.string(),
    message: z.string(),
    savingsCents: z.number().int().nonnegative().optional(),
    category: z.string().optional(),
  })),
  comparison: z.object({
    items: z.array(z.object({
      category: z.string(),
      currentSpendCents: z.number().int().nonnegative(),
      recommendedSpendCents: z.number().int().nonnegative(),
    })),
  }),
  recommendedActions: z.array(z.object({
    severity: z.enum(["info","warning","critical"]),
    text: z.string(),
  })),
  generatedAt: z.string(),
});

export async function generateDashboardInsights(_input: unknown) {
  if (!env.OPENAI_API_KEY) {
    return { unavailable: true, reason: "OPENAI_API_KEY not configured" } as const;
  }

  // TODO: implement OpenAI call and map into dashboardAiResponseSchema
  return { unavailable: true, reason: "Not implemented yet" } as const;
}
