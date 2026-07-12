const ai = require("../services/geminiService");
const reviewPrompt = require("../prompts/reviewPrompt");

const reviewResume = async (parsedResume) => {

    const prompt = `
${reviewPrompt}

Resume:

${JSON.stringify(parsedResume, null, 2)}
`;

    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
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

module.exports = reviewResume;