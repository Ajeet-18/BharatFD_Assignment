const axios = require("axios");
const redis = require("redis");

const client = redis.createClient({ url: process.env.REDIS_URL });

client.on("error", (err) => console.error("❌ Redis Connection Error:", err));

client.connect().then(() => console.log("✅ Redis Connected")).catch(console.error);

const translateText = async (text, targetLang) => {
  const cacheKey = `translate_${text}_${targetLang}`;

  try {
    const cachedTranslation = await client.get(cacheKey);
    if (cachedTranslation) {
      console.log("✅ Translation from Cache");
      return cachedTranslation;
    }

    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    
    const translation = response.data[0][0][0];
    await client.set(cacheKey, translation, { EX: 86400 });

    return translation;
  } catch (error) {
    console.error("❌ Translation Error:", error);
    return text; 
  }
};

module.exports = { translateText };
