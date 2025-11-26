import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getMotivationalQuote = async (workoutType: string, duration: number): Promise<string> => {
  if (!apiKey) return "坚持就是胜利！记得补充水分。";

  try {
    const prompt = `
      用户刚刚完成了一次健身打卡。
      类型: ${workoutType}
      时长: ${duration} 分钟。
      
      请给出一段简短、有力、充满正能量的中文鼓励语（20字以内）。
      不要过于正式，要像一个贴心的健身伙伴。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "今天的汗水是明天的勋章！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "保持热爱，奔赴山海！";
  }
};