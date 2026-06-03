#!/usr/bin/env node
/**
 * Brand image generation via Nano Banana Pro (Gemini 3 Pro Image) voor Bouwbedrijf Van de Linde.
 *
 * Usage:
 *   npm run generate:images                       # all missing images
 *   npm run generate:images -- --force            # regenerate everything
 *   npm run generate:images -- --only=<name>      # one specific image
 *
 * Schrijft .png naar de juiste public-map. Converteer daarna naar geoptimaliseerde
 * .jpg met sips (zie README/commando in de generatie-stap).
 *
 * Requires GEMINI_API_KEY (in ~/.zshrc shell-env of lokale .env).
 */

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

if (!process.env.GEMINI_API_KEY) {
  console.error("\x1b[31mGEMINI_API_KEY is not set.\x1b[0m");
  console.error("  Add to ~/.zshrc:  export GEMINI_API_KEY=AIza...  (en `source ~/.zshrc`)");
  process.exit(1);
}

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = args.find((a) => a.startsWith("--only="))?.split("=")[1];

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gedeelde merk-signatuur op elke prompt.
const BRAND = [
  "Photorealistic, editorial architectural photography for Bouwbedrijf Van de Linde,",
  "a 70-year-old construction and restoration company in Zeeland, the Netherlands.",
  "Visual language: confident architectural composition, honest materials (brick, timber, glass, natural stone),",
  "Dutch coastal light (soft overcast diffuse or warm low golden hour), calm and premium.",
  "Subtle warm-and-navy palette, magazine-quality finish (think Architectural Digest and Wallpaper*).",
  "Craftsmanship and durability. No people's faces, only anonymous hands or figures from behind if needed.",
  "No text, no logos, no watermarks, no captions, no signage, no brand names on buildings.",
  "Shot on a full-frame camera, 35mm, rich detail, natural color grade.",
].join(" ");

const RATIO_WIDE = "Aspect ratio 16:9 (wide landscape).";
const RATIO_PORTRAIT = "Aspect ratio 4:5 (vertical portrait).";

const IMAGES = [
  {
    name: "hero",
    dir: "img",
    prompt:
      "Wide cinematic exterior of a premium contemporary detached villa in the Zeeland countryside at golden hour. " +
      "Warm hand-laid brick combined with large floor-to-ceiling glass and a crisp dark zinc roof. " +
      "Low evening sun rakes across the facade, long soft shadows, manicured lawn and reed in the foreground, " +
      "a wide Dutch sky with subtle clouds behind. Architectural, aspirational, serene. " + RATIO_WIDE,
  },
  {
    name: "about",
    dir: "img",
    prompt:
      "Close-up of a craftsman's hands laying a clean course of brick with a trowel and fresh mortar, " +
      "warm afternoon light, fine texture of the brick and mortar joint, a few tools resting nearby out of focus. " +
      "Tactile, honest, heritage craftsmanship. Only hands visible, no face. " + RATIO_PORTRAIT,
  },
  {
    name: "p-restauratie",
    dir: "projecten",
    prompt:
      "Restoration of a monumental Dutch village church facade. Aged red brick and natural stone detailing, " +
      "neat traditional scaffolding against part of the tower, careful repointing work visible. " +
      "Soft overcast Zeeland sky, respectful and dignified, documentary architectural feel. " + RATIO_WIDE,
  },
  {
    name: "p-villa",
    dir: "projecten",
    prompt:
      "Exterior of a newly built contemporary Dutch detached villa at dusk. Warm brick volume with a sharp gable, " +
      "large glazing glowing with warm interior light, clean landscaped entrance with a paved path. " +
      "Blue-hour sky, inviting and high-end residential. " + RATIO_WIDE,
  },
  {
    name: "p-utiliteit",
    dir: "projecten",
    prompt:
      "Modern commercial office and business building exterior on a Dutch business park. " +
      "Clean horizontal lines, large aluminium-framed glazing, brick and composite cladding, tidy forecourt. " +
      "Blue hour with soft interior lighting, professional and crisp. " + RATIO_WIDE,
  },
  {
    name: "p-winkel",
    dir: "projecten",
    prompt:
      "Interior of a high-end retail clothing store after a full renovation. Warm oak shelving and display fixtures, " +
      "refined recessed lighting, polished concrete floor, calm neutral tones with brass accents. " +
      "No people, no readable text or brand names, editorial interior photography. " + RATIO_WIDE,
  },
  {
    name: "p-verduurzaming",
    dir: "projecten",
    prompt:
      "A renovated traditional Dutch brick home with a full array of solar panels neatly installed on the pitched roof, " +
      "new triple-glazed windows, fresh insulation detailing at the eaves. Sunny clear day, green garden, " +
      "sustainable and well-maintained, residential architectural photography. " + RATIO_WIDE,
  },
  {
    name: "p-monument",
    dir: "projecten",
    prompt:
      "Restoration of a historic Dutch castle or old water tower. Ancient weathered masonry and arched windows, " +
      "a dramatic moody sky behind, sense of age, scale and heritage. " +
      "Careful conservation work, timeless and monumental. " + RATIO_WIDE,
  },
];

const filtered = ONLY ? IMAGES.filter((i) => i.name === ONLY) : IMAGES;
if (ONLY && filtered.length === 0) {
  console.error(`\x1b[31mNo image named "${ONLY}".\x1b[0m  Available:`);
  IMAGES.forEach((i) => console.error(`    ${i.name}`));
  process.exit(1);
}

async function generateOne({ name, dir, prompt }) {
  const outDir = path.join(PUBLIC_DIR, dir);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${name}.png`);
  const jpgPath = path.join(outDir, `${name}.jpg`);
  if ((fs.existsSync(outPath) || fs.existsSync(jpgPath)) && !FORCE) {
    console.log(`\x1b[90mskip (exists): ${dir}/${name}\x1b[0m`);
    return { name, status: "skip" };
  }
  console.log(`\x1b[36mgenerating: ${dir}/${name}\x1b[0m`);
  const t0 = Date.now();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: `${BRAND}\n\n${prompt}`,
    });
    const part = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!part) {
      console.warn(`\x1b[33m  no image data returned for ${name}\x1b[0m`);
      return { name, status: "empty" };
    }
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync(outPath, buffer);
    const kb = (buffer.length / 1024).toFixed(0);
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`\x1b[32msaved: ${dir}/${name}.png  (${kb} KB, ${secs}s)\x1b[0m`);
    return { name, status: "ok" };
  } catch (err) {
    console.error(`\x1b[31mfailed: ${name}  ${err.message}\x1b[0m`);
    return { name, status: "error" };
  }
}

async function main() {
  console.log(`\nGenerating ${filtered.length} image${filtered.length === 1 ? "" : "s"} (PNG) into /public ...\n`);
  const results = [];
  for (const img of filtered) {
    results.push(await generateOne(img));
  }
  const ok = results.filter((r) => r.status === "ok").length;
  const skip = results.filter((r) => r.status === "skip").length;
  const fail = results.filter((r) => r.status !== "ok" && r.status !== "skip").length;
  console.log(`\n\x1b[1mDone:\x1b[0m ${ok} generated, ${skip} skipped, ${fail} failed.`);
  console.log("Converteer PNG -> JPG met sips (zie generatie-stap).\n");
  if (fail > 0) process.exit(1);
}

main();
