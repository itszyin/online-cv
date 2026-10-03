// Resize the approved v6 artwork intact: no crop, background removal or redraw.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
const source = 'design/folded-blue-z-lighting-v6.png';
const sizes = [16, 32, 48, 180, 192, 512];
const images = new Map();
for (const size of sizes) {
  const png = await sharp(source).resize(size, size, { fit: 'contain' }).png().toBuffer();
  images.set(size, png);
  await writeFile(`public/icons/icon-${size}.png`, png);
}
// ICO supports PNG payloads; retain native 16/32/48 entries for browser selection.
const icoSizes = [16, 32, 48];
const header = Buffer.alloc(6 + 16 * icoSizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);
let offset = header.length;
for (const [index, size] of icoSizes.entries()) {
  const pos = 6 + 16 * index;
  header[pos] = size;
  header[pos + 1] = size;
  header.writeUInt16LE(1, pos + 4);
  header.writeUInt16LE(24, pos + 6);
  header.writeUInt32LE(images.get(size).length, pos + 8);
  header.writeUInt32LE(offset, pos + 12);
  offset += images.get(size).length;
}
await writeFile('public/favicon.ico', Buffer.concat([header, ...icoSizes.map((size) => images.get(size))]));
console.log('Generated 16/32/48 ICO and 16/32/48/180/192/512 PNG icons');
