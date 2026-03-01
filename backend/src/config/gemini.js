// gemini.js - WORKING FREE SOLUTION
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import "dotenv/config";
import sharp from 'sharp';
import axios from "axios";
import FormData from "form-data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEYS;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

if (!STABILITY_API_KEY) {
  throw new Error("STABILITY_API_KEY missing in env");
}

export const geminiClient = new GoogleGenerativeAI(GEMINI_API_KEY);
console.log("Gemini client configured");

// ---------------- TEXT GENERATION ----------------
const generateText = async (prompt, modelName = "gemini-2.5-flash") => {
  try {
    const model = geminiClient.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("❌ Gemini Text Error:", error.message);
    throw new Error("Failed to generate text");
  }
};

// ---------------- IMAGE GENERATION (FREE - Pollinations.ai) ----------------
const generateImage = async ({ prompt, aspectRatio = "1:1" }) => {
  try {
    console.log("🎨 Generating image with Stability AI...");

    const formData = new FormData();

    formData.append("prompt", prompt);
    formData.append("output_format", "png");

    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      formData,
      {
        headers: {
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          ...formData.getHeaders(),
          Accept: "image/*"
        },
        responseType: "arraybuffer"
      }
    );

    const base64 = Buffer.from(response.data).toString("base64");

    console.log("✅ Stability image generated successfully");
    return base64;

  } catch (error) {
    console.error(
      "❌ Stability Error:",
      error.response?.data?.toString() || error.message
    );
    throw new Error("Stability image generation failed");
  }
};

// ---------------- THUMBNAIL GENERATION ----------------

const generateThumbnail = async ({
  topic,
  style = "youtube",
  colorScheme = "vibrant",
  addText = true,
}) => {
  try {
    console.log("📸 Generating thumbnail with Stability AI...");

    // 🔥 1️⃣ Build Strong Background Prompt
    let basePrompt = "";

    switch (style) {
      case "youtube":
        basePrompt = `YouTube thumbnail background for "${topic}", dramatic lighting, high contrast, bold composition, cinematic, eye-catching, ${colorScheme} tones`;
        break;

      case "gaming":
        basePrompt = `Gaming thumbnail background for "${topic}", neon glow, intense action, dynamic energy, futuristic, high detail, ${colorScheme} colors`;
        break;

      case "educational":
        basePrompt = `Educational YouTube thumbnail background for "${topic}", clean layout, modern design, bright lighting, professional, ${colorScheme} theme`;
        break;

      case "tech":
        basePrompt = `Tech YouTube thumbnail background for "${topic}", futuristic UI elements, glowing accents, sleek modern lighting, ${colorScheme} palette`;
        break;

      case "sports":
        basePrompt = `Sports YouTube thumbnail background for "${topic}", high energy action shot, motion blur, dramatic stadium lighting, ${colorScheme} theme`;
        break;

      default:
        basePrompt = `Professional YouTube thumbnail background for "${topic}", bold lighting, strong contrast, ${colorScheme} tones`;
    }

    // 🔥 2️⃣ Enhance Prompt For Better Quality
    const enhancedPrompt = `
      ${basePrompt},
      widescreen 16:9 composition,
      ultra detailed,
      sharp focus,
      professional photography,
      8k quality,
      dramatic shadows
    `;

    // 🔥 3️⃣ Call Stability API
    const formData = new FormData();
    formData.append("prompt", enhancedPrompt);
    formData.append("output_format", "png");

    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      formData,
      {
        headers: {
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          ...formData.getHeaders(),
          Accept: "image/*"
        },
        responseType: "arraybuffer"
      }
    );

    let imageBuffer = Buffer.from(response.data);

    // 🔥 4️⃣ Add Text Overlay (Sharp)
    if (addText) {
      imageBuffer = await addTextToThumbnail(
        imageBuffer,
        topic,
        style
      );
    }

    const base64 = imageBuffer.toString("base64");

    console.log("✅ Thumbnail generated successfully!");
    return base64;

  } catch (error) {
    console.error(
      "❌ Thumbnail Generation Error:",
      error.response?.data?.toString() || error.message
    );
    throw new Error("Thumbnail generation failed");
  }
};

export { generateText, generateImage, generateThumbnail };



