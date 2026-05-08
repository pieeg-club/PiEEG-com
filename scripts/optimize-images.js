const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const THRESHOLD_BYTES = 1 * 1024 * 1024; // 1 MB
const PUBLIC_DIR = path.join(__dirname, '../public');
const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.jfif']);

async function getFilesRecursive(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFilesRecursive(fullPath)));
    } else if (SUPPORTED_EXTS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const sizeBefore = fs.statSync(filePath).size;
  if (sizeBefore <= THRESHOLD_BYTES) return;

  const ext = path.extname(filePath).toLowerCase();
  const tmpPath = filePath + '.tmp';

  try {
    let pipeline = sharp(filePath);
    const meta = await pipeline.metadata();

    // Downscale if wider than 2000px while preserving aspect ratio
    if (meta.width && meta.width > 2000) {
      pipeline = pipeline.resize(2000, undefined, { withoutEnlargement: true });
    }

    if (ext === '.png') {
      await pipeline.png({ quality: 80, compressionLevel: 9 }).toFile(tmpPath);
    } else if (ext === '.webp') {
      await pipeline.webp({ quality: 80 }).toFile(tmpPath);
    } else {
      // jpg / jpeg / jfif
      await pipeline.jpeg({ quality: 80, progressive: true }).toFile(tmpPath);
    }

    const sizeAfter = fs.statSync(tmpPath).size;

    if (sizeAfter < sizeBefore) {
      fs.renameSync(tmpPath, filePath);
      const saved = ((sizeBefore - sizeAfter) / 1024).toFixed(1);
      console.log(`  ✅ ${path.relative(PUBLIC_DIR, filePath)}: ${(sizeBefore / 1024).toFixed(1)} KB → ${(sizeAfter / 1024).toFixed(1)} KB (saved ${saved} KB)`);
    } else {
      fs.unlinkSync(tmpPath);
      console.log(`  ⏭  ${path.relative(PUBLIC_DIR, filePath)}: already optimal, skipped`);
    }
  } catch (err) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    console.error(`  ❌ ${path.relative(PUBLIC_DIR, filePath)}: ${err.message}`);
  }
}

async function main() {
  console.log(`Scanning ${PUBLIC_DIR} for images > 1 MB...\n`);
  const files = await getFilesRecursive(PUBLIC_DIR);
  const large = files.filter((f) => fs.statSync(f).size > THRESHOLD_BYTES);

  if (large.length === 0) {
    console.log('No images exceed 1 MB. Nothing to do.');
    return;
  }

  console.log(`Found ${large.length} image(s) to optimize:\n`);
  for (const file of large) {
    await optimizeImage(file);
  }
  console.log('\nDone.');
}

main();
