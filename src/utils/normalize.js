export function normalizeAnalysisScores(result) {
  const scores = result.scores || {}
  const values = [result.overallScore, scores.clarity, scores.context, scores.instructions, scores.safety, scores.specificity, scores.formatting]
  const isTenPointScale = values.every((value) => typeof value === 'number' && value >= 0 && value <= 10)
  if (!isTenPointScale) return result

  return {
    ...result,
    overallScore: Math.min(100, Math.round(result.overallScore * 10)),
    scores: {
      clarity: Math.min(100, Math.round(scores.clarity * 10)),
      context: Math.min(100, Math.round(scores.context * 10)),
      instructions: Math.min(100, Math.round(scores.instructions * 10)),
      safety: Math.min(100, Math.round(scores.safety * 10)),
      specificity: Math.min(100, Math.round(scores.specificity * 10)),
      formatting: Math.min(100, Math.round(scores.formatting * 10)),
    },
  }
}
