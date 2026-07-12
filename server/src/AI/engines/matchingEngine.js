const ai = require("../services/geminiService");
const matchingPrompt = require("../prompts/matchingPrompt");

const matchCandidate = async (resumeAI, jobAI) => {

    // ------------------------------------
    // Resume Data
    // ------------------------------------

    const resumeSkills = resumeAI.parsedResume?.skills || [];

    const requiredSkills = jobAI.parsedJob?.requiredSkills || [];

    const matchedSkills = requiredSkills.filter(skill =>
        resumeSkills.some(
            s => s.toLowerCase() === skill.toLowerCase()
        )
    );

    const missingSkills = requiredSkills.filter(skill =>
        !resumeSkills.some(
            s => s.toLowerCase() === skill.toLowerCase()
        )
    );

    const skillScore =
        requiredSkills.length === 0
            ? 100
            : Math.round(
                (matchedSkills.length /
                    requiredSkills.length) * 100
            );

    // ------------------------------------
    // Experience
    // ------------------------------------

    const experienceScore =
        resumeAI.parsedResume?.experience?.length > 0
            ? 100
            : 40;

    // ------------------------------------
    // Education
    // ------------------------------------

    const educationScore =
        resumeAI.parsedResume?.education?.length > 0
            ? 100
            : 40;

    // ------------------------------------
    // Projects
    // ------------------------------------

    const projectCount =
        resumeAI.parsedResume?.projects?.length || 0;

    let projectScore = 20;

    if (projectCount >= 3)
        projectScore = 100;
    else if (projectCount === 2)
        projectScore = 80;
    else if (projectCount === 1)
        projectScore = 60;

    // ------------------------------------
    // Overall Score
    // ------------------------------------

    const overallScore = Math.round(

        skillScore * 0.50 +

        experienceScore * 0.20 +

        educationScore * 0.15 +

        projectScore * 0.15

    );

    // ------------------------------------
    // Gemini Prompt
    // ------------------------------------

    const prompt = `
${matchingPrompt}

Overall ATS Score: ${overallScore}

Skill Score: ${skillScore}

Experience Score: ${experienceScore}

Education Score: ${educationScore}

Project Score: ${projectScore}

Matched Skills:
${matchedSkills.join(", ")}

Missing Skills:
${missingSkills.join(", ")}

Return ONLY valid JSON.
`;

    try {

        const response = await ai.models.generateContent({

            model: "gemini-3.5-flash",

            contents: prompt

        });

        let output = response.text;

        if (!output) {
            throw new Error("Gemini returned an empty response.");
        }

        output = output
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const start = output.indexOf("{");
        const end = output.lastIndexOf("}");

        if (start !== -1 && end !== -1) {
            output = output.substring(start, end + 1);
        }

        const explanation = JSON.parse(output);

        return {

            overallScore,

            skillScore,

            experienceScore,

            educationScore,

            projectScore,

            matchedSkills,

            missingSkills,

            strengths: explanation.strengths || [],

            weaknesses: explanation.weaknesses || [],

            recommendation: explanation.recommendation || "Average Fit"

        };

    } catch (error) {
        console.error(error);

        // Return deterministic result instead of crashing

        return {

            overallScore,

            skillScore,

            experienceScore,

            educationScore,

            projectScore,

            matchedSkills,

            missingSkills,

            strengths: [],

            weaknesses: [],

            recommendation: "Unable to generate AI explanation."

        };

    }

};

module.exports = matchCandidate;