const ai = require("../services/geminiService");
const resumePrompt = require("../prompts/resumePrompt");

const parseResume = async (resumeText) => {

    const prompt = `
${resumePrompt}

Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
    });

    let output = response.text;

    // Remove markdown if Gemini returns ```json
    output = output.replace(/```json/g, "");
    output = output.replace(/```/g, "").trim();

    try {

        return JSON.parse(output);

    } catch (error) {

        throw new Error("Gemini returned invalid JSON.");

    }

};

module.exports = parseResume;