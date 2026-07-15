const ai = require("../services/geminiService");
const reviewPrompt = require("../prompts/reviewPrompt");

const reviewResume = async (parsedResume) => {

    const prompt = `
${reviewPrompt}

Resume:

${JSON.stringify(parsedResume, null, 2)}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
    });

    console.dir(response, { depth: null })

    let output = response.text;

    output = output
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(output);
};

module.exports = reviewResume;