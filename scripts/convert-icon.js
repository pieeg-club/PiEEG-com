const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputIcon = path.join(__dirname, '../public/icon.png');
const appDir = path.join(__dirname, '../src/app');

async function convertIcons() {
  try {
    console.log('Starting icon conversion...');
    
    // Read the original icon
    const iconBuffer = fs.readFileSync(inputIcon);
    const metadata = await sharp(iconBuffer).metadata();
    console.log(`Original icon dimensions: ${metadata.width}x${metadata.height}`);

    // Create favicon.ico (32x32) in src/app directory
    console.log('Creating favicon.ico...');
    await sharp(iconBuffer)
      .resize(32, 32)
      .toFile(path.join(appDir, 'favicon.ico'));

    // Create icon.png (192x192) in src/app directory for Next.js
    console.log('Creating icon.png (192x192)...');
    await sharp(iconBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(appDir, 'icon.png'));

    // Create apple-icon.png (180x180) in src/app directory
    console.log('Creating apple-icon.png (180x180)...');
    await sharp(iconBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(appDir, 'apple-icon.png'));

    // Create opengraph-image.png (1200x630) in src/app directory
    console.log('Creating opengraph-image.png (1200x630)...');
    await sharp(iconBuffer)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(appDir, 'opengraph-image.png'));

    console.log('✅ All icons created successfully!');
    console.log('Generated files:');
    console.log('  - src/app/favicon.ico (32x32)');
    console.log('  - src/app/icon.png (192x192)');
    console.log('  - src/app/apple-icon.png (180x180)');
    console.log('  - src/app/opengraph-image.png (1200x630)');
  } catch (error) {
    console.error('Error converting icons:', error);
    process.exit(1);
  }
}

convertIcons();
