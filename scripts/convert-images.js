/*
Simple Node script to convert images in public/projects and public/certifications
to multiple WebP sizes using sharp.

Usage: node scripts/convert-images.js
Make sure you ran: npm install --save-dev sharp
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const folders = [
  path.join(__dirname, '..', 'public', 'projects'),
  path.join(__dirname, '..', 'public', 'certifications')
];

const sizes = [320, 640, 1024];

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const base = filePath.replace(ext, '');
  const image = sharp(filePath);

  for (const width of sizes) {
    const out = `${base}-${width}.webp`;
    if (fs.existsSync(out)) {
      console.log('Exists:', out);
      continue;
    }
    try {
      await image
        .resize({ width })
        .webp({ quality: 80 })
        .toFile(out);
      console.log('Created:', out);
    } catch (err) {
      console.error('Error converting', filePath, err);
    }
  }

  // also create a full-size webp if not exists
  const fullOut = `${base}.webp`;
  if (!fs.existsSync(fullOut)) {
    try {
      await image.webp({ quality: 84 }).toFile(fullOut);
      console.log('Created:', fullOut);
    } catch (err) {
      console.error('Error creating full webp for', filePath, err);
    }
  }
}

(async function main() {
  for (const folder of folders) {
    if (!fs.existsSync(folder)) continue;
    const files = fs.readdirSync(folder);
    for (const f of files) {
      const full = path.join(folder, f);
      const stat = fs.statSync(full);
      if (stat.isFile()) {
        await convertFile(full);
      }
    }
  }
  console.log('Done');
})();
