export const analysisSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'overallScore',
    'scores',
    'missingContext',
    'lintWarnings',
    'securityWarnings',
    'hallucination',
    'complexity',
    'modelRecommendation',
    'explainMode',
  ],
  properties: {
    overallScore: { type: 'number' },
    scores: {
      type: 'object',
      additionalProperties: false,
      required: ['clarity', 'context', 'instructions', 'safety', 'specificity', 'formatting'],
      properties: {
        clarity: { type: 'number' },
        context: { type: 'number' },
        instructions: { type: 'number' },
        safety: { type: 'number' },
        specificity: { type: 'number' },
        formatting: { type: 'number' },
      },
    },
    missingContext: { type: 'array', items: { type: 'string' } },
    lintWarnings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['severity', 'message'],
        properties: {
          severity: { type: 'string', enum: ['info', 'warning', 'critical'] },
          message: { type: 'string' },
        },
      },
    },
    securityWarnings: { type: 'array', items: { type: 'string' } },
    hallucination: {
      type: 'object',
      additionalProperties: false,
      required: ['risk', 'reason', 'suggestion'],
      properties: {
        risk: { type: 'string', enum: ['Low', 'Medium', 'High'] },
        reason: { type: 'string' },
        suggestion: { type: 'string' },
      },
    },
    complexity: { type: 'string', enum: ['Easy', 'Medium', 'Hard', 'Expert'] },
    modelRecommendation: {
      type: 'object',
      additionalProperties: false,
      required: ['bestModel', 'reason', 'estimatedCost', 'alternative'],
      properties: {
        bestModel: { type: 'string' },
        reason: { type: 'string' },
        estimatedCost: { type: 'string' },
        alternative: { type: 'string' },
      },
    },
    explainMode: { type: 'array', items: { type: 'string' } },
  },
}

export const optimizeSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['optimizedPrompt', 'changes'],
  properties: {
    optimizedPrompt: { type: 'string' },
    changes: { type: 'array', items: { type: 'string' } },
  },
}

export const compareSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['winner', 'summary', 'metrics'],
  properties: {
    winner: { type: 'string' },
    summary: { type: 'string' },
    metrics: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['metric', 'promptA', 'promptB'],
        properties: {
          metric: { type: 'string' },
          promptA: { type: 'string' },
          promptB: { type: 'string' },
        },
      },
    },
  },
}

export const playgroundSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['originalOutput', 'optimizedOutput', 'verdict'],
  properties: {
    originalOutput: { type: 'string' },
    optimizedOutput: { type: 'string' },
    verdict: { type: 'string' },
  },
}

export const testsSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['results'],
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['input', 'status', 'reason'],
        properties: {
          input: { type: 'string' },
          status: { type: 'string', enum: ['Pass', 'Fail'] },
          reason: { type: 'string' },
        },
      },
    },
  },
}
