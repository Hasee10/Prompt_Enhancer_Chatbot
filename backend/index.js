const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const Jimp = require('jimp');
let cv;
try { cv = require('opencv4nodejs'); } catch (e) { cv = null; }

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Utility: Extract numbers and labels from OCR text
function extractNumbersAndLabels(text) {
  const lines = text.split(/\n|\r/).map(l => l.trim()).filter(Boolean);
  const results = [];
  for (const line of lines) {
    // Find numbers (with commas, decimals, $)
    const numberMatch = line.match(/([\$]?[\d,]+(\.\d+)?)/g);
    if (numberMatch) {
      results.push({ label: line.replace(numberMatch[0], '').trim(), value: numberMatch[0] });
    }
  }
  return results;
}

// Utility: Detect dashboard/chart keywords
function detectDashboardKeywords(text) {
  const lower = text.toLowerCase();
  const keywords = ['dashboard', 'chart', 'graph', 'sales', 'performance', 'trend', 'revenue', 'segment', 'category', 'total', 'average'];
  return keywords.filter(k => lower.includes(k));
}

// POST /chat
app.post('/chat', async (req, res) => {
  const { message, model } = req.body;
  if (!message || !model) {
    return res.status(400).json({ error: 'Message and model are required.' });
  }

  try {
    const ollamaRes = await axios.post('http://localhost:11434/api/generate', {
      model,
      prompt: message,
      stream: false
    });
    res.json({ response: ollamaRes.data.response });
  } catch (err) {
    res.status(500).json({ error: 'Ollama error', details: err.message });
  }
});

// POST /analyze-image
app.post('/analyze-image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded.' });
  }

  try {
    // OCR with Tesseract
    const ocrResult = await Tesseract.recognize(req.file.buffer, 'eng', { logger: m => {} });
    const detectedText = ocrResult.data.text.trim();

    // Color analysis and metadata with Jimp
    const jimpImage = await Jimp.read(req.file.buffer);
    const { r, g, b } = jimpImage.clone().resize(1, 1).bitmap.data;
    const dominantColor = `rgb(${r},${g},${b})`;
    const width = jimpImage.bitmap.width;
    const height = jimpImage.bitmap.height;
    const format = jimpImage.getExtension();

    // Basic shape/edge detection with OpenCV (if available)
    let contourCount = null;
    if (cv) {
      const mat = cv.imdecode(req.file.buffer);
      const gray = mat.bgrToGray();
      const blurred = gray.gaussianBlur(new cv.Size(5, 5), 0);
      const edges = blurred.canny(50, 150);
      const contours = edges.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
      contourCount = contours.length;
    }

    // Extract numbers and labels
    const numbersAndLabels = extractNumbersAndLabels(detectedText);
    // Detect dashboard/chart keywords
    const dashboardKeywords = detectDashboardKeywords(detectedText);

    // Compose a factual, to-the-point summary
    let summary = `Image details: ${width}x${height} px (${format.toUpperCase()}). Dominant color: ${dominantColor}.`;
    if (contourCount !== null) {
      summary += ` Detected ~${contourCount} prominent edges/shapes.`;
    }
    if (dashboardKeywords.length > 0) {
      summary += ` Dashboard/chart-related keywords detected: ${dashboardKeywords.join(', ')}.`;
    }
    if (numbersAndLabels.length > 0) {
      summary += `\nExtracted metrics:`;
      numbersAndLabels.forEach(({ label, value }) => {
        summary += `\n- ${label ? label + ': ' : ''}${value}`;
      });
    }
    if (detectedText) {
      summary += `\nExtracted text: "${detectedText.replace(/\n/g, ' ')}"`;
    }

    res.json({
      text: detectedText,
      color: dominantColor,
      width,
      height,
      format,
      contourCount,
      numbersAndLabels,
      dashboardKeywords,
      summary,
    });
  } catch (err) {
    res.status(500).json({ error: 'Image analysis error', details: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 