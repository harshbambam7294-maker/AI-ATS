const ai = require("../services/geminiService");
const jobPrompt = require("../prompts/jobPrompt");

const parseJob = async (jobDescription) => {

    const prompt = `
${jobPrompt}

Job Description:

${jobDescription}
`;

    const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt
});

    let output = response.text;

    output = output
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const start = output.indexOf("{");
    const end = output.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
        output = output.substring(start, end + 1);
    }

    return JSON.parse(output);

};

module.exports = parseJob;