const prompt = `
${interviewPrompt}

Candidate:

${JSON.stringify(resumeAI.parsedResume, null, 2)}

Job:

${JSON.stringify(jobAI.parsedJob, null, 2)}
`;