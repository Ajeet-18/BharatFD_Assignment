const FAQ = require("../models/FAQ");
const { translateText } = require("../utils/translate");

exports.createFAQ = async (req, res) => {
  try {
    let { question, answer } = req.body;

    // ✅ 1. Validate request body (Prevent empty question/answer)
    if (!question || !answer) {
      return res.status(400).json({ message: "❌ Question and answer are required" });
    }

    // ✅ 2. Translate text (with error fallback)
    const question_hi = await translateText(question, "hi").catch((err) => {
      console.error("❌ Hindi Translation Error:", err.message);
      return null; // Default to null if translation fails
    });

    const question_bn = await translateText(question, "bn").catch((err) => {
      console.error("❌ Bengali Translation Error:", err.message);
      return null;
    });

    // ✅ 3. Create new FAQ entry
    const faq = new FAQ({ question, answer, question_hi, question_bn });
    await faq.save();

    res.status(201).json({ message: "✅ FAQ Created Successfully", data: faq });
  } catch (error) {
    console.error("❌ Error Creating FAQ:", error.message);
    res.status(500).json({ message: "Error creating FAQ", error: error.message });
  }
};

exports.getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";

    // ✅ 4. Fetch all FAQs
    const faqs = await FAQ.find();
    if (!faqs.length) {
      return res.status(404).json({ message: "⚠️ No FAQs found" });
    }

    // ✅ 5. Translate question based on `lang` parameter
    const translatedFAQs = faqs.map((faq) => ({
      id: faq._id,
      question:
        lang === "hi" ? faq.question_hi :
        lang === "bn" ? faq.question_bn :
        faq.question,
      answer: faq.answer,
    }));

    res.status(200).json(translatedFAQs);
  } catch (error) {
    console.error("❌ Error Fetching FAQs:", error.message);
    res.status(500).json({ message: "Error fetching FAQs", error: error.message });
  }
};
