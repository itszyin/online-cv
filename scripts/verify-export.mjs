import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import { load } from 'cheerio';
const data = parse(readFileSync('_data/data.yml', 'utf8'));
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
for (const path of ['out/index.html', 'out/print/index.html']) {
  const $ = load(readFileSync(path, 'utf8'));
  const text = normalize($('main').text());
  const expected = [...data.skills, data.sidebar.name, data.sidebar.tagline, data.sidebar.timezone, data['career-profile'].summary,
    ...data.education.flatMap((x) => [x.degree, x.university, x.time, x.details].filter(Boolean)),
    ...data.experiences.flatMap((x) => [x.role, x.company, x.time, x.context, ...x.details.trim().split('\n').map((line) => line.replace(/^\s*-\s*/, ''))]),
    ...data.sidebar.languages.flatMap((x) => [x.idiom, x.level]), ...data.sidebar.interests.map((x) => x.item)];
  for (const item of expected) assert.ok(text.includes(normalize(item)), `${path}: missing ${item}`);
  for (const href of [`mailto:${data.sidebar.email}`, `https://github.com/${data.sidebar.github}`, `https://linkedin.com/in/${data.sidebar.linkedin}`]) assert.ok($(`a[href="${href}"]`).length, `Missing link ${href}`);
  for (const [label, href] of [['火山方舟', 'https://www.volcengine.com/product/ark'], ['BytePlus ModelArk', 'https://www.byteplus.com/en/product/modelark']]) {
    for (const selector of ['section[aria-labelledby="profile-title"]', 'section[aria-labelledby="experience-title"]']) {
      const link = $(selector).find(`a[href="${href}"]`);
      assert.equal(link.length, 1, `${path}: missing product link in ${selector}`);
      assert.equal(link.text(), label);
    }
  }
  assert.ok(!readFileSync(path, 'utf8').includes('zhengqiang.yin@outlook.com'), `${path}: obsolete email remains`);
  assert.equal($('.contact-links a').length, 3);
  assert.equal($('.print-contacts a').length, 3);
  assert.ok(!readFileSync(path, 'utf8').includes('codle.net'), `${path}: obsolete website remains`);
  assert.ok($('h1').text().includes(data.sidebar.alternate_name));
  assert.equal($('html').attr('lang'), 'en');
  const schema = JSON.parse($('script[type="application/ld+json"]').text());
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'ProfilePage');
  assert.equal(schema['@id'], 'https://zqyin.com/#profile');
  assert.equal(schema.mainEntity['@type'], 'Person');
  assert.equal(schema.mainEntity['@id'], 'https://zqyin.com/#person');
  assert.equal(schema.mainEntity.name, data.sidebar.name);
  assert.equal(schema.mainEntity.alternateName, data.sidebar.alternate_name);
  assert.equal(schema.mainEntity.jobTitle, data.sidebar.tagline);
  assert.deepEqual(schema.mainEntity.sameAs, [`https://github.com/${data.sidebar.github}`, `https://linkedin.com/in/${data.sidebar.linkedin}`]);
  assert.equal($('meta[name="description"]').attr('content'), normalize(data['career-profile'].summary));
  assert.equal($('meta[property="og:title"]').attr('content'), $('head > title').text());
  assert.equal($('meta[property="og:description"]').attr('content'), normalize(data['career-profile'].summary));
  assert.equal($('meta[name="twitter:card"]').attr('content'), 'summary_large_image');
  for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) assert.equal($(selector).attr('content'), 'https://zqyin.com/assets/images/resume-share.png');
  assert.equal($('meta[property="og:image:width"]').attr('content'), '1200');
  assert.equal($('meta[property="og:image:height"]').attr('content'), '630');
  assert.ok($('meta[property="og:image:alt"]').attr('content').includes(data.sidebar.alternate_name));
  assert.equal($('meta[name="robots"]').attr('content'), path.includes('/print/') ? 'noindex, follow' : undefined);
  assert.equal($('h1').length, 1);
  assert.equal($('link[rel="canonical"]').attr('href'), 'https://zqyin.com/');
  assert.equal($('a[href*="github.com/Codle"]').length, 0);
  for (const element of $('script[src], link[href], img[src]').toArray()) {
    const href = $(element).attr('src') || $(element).attr('href');
    if (href?.startsWith('/')) assert.ok(existsSync(`out${href.split('?')[0]}`), `Missing asset ${href}`);
  }
  console.log(`PASS ${path}: all résumé facts, contact destinations and local assets preserved`);
}
assert.equal(readFileSync('out/CNAME', 'utf8').trim(), 'zqyin.com');
assert.ok(existsSync('out/.nojekyll'));
console.log('PASS custom domain and static Pages export');

const robots = readFileSync('out/robots.txt', 'utf8');
assert.match(robots, /User-agent: \*/);
assert.match(robots, /Allow: \//);
assert.match(robots, /Sitemap: https:\/\/zqyin\.com\/sitemap\.xml/);
assert.ok(!robots.includes('Disallow:'));
const sitemap = load(readFileSync('out/sitemap.xml', 'utf8'), { xmlMode: true });
assert.deepEqual(sitemap('loc').toArray().map((e) => sitemap(e).text()), ['https://zqyin.com/']);
assert.equal(sitemap('lastmod').length, 0);
const png = readFileSync('out/assets/images/resume-share.png');
assert.equal(png.subarray(1, 4).toString(), 'PNG');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
console.log('PASS identity schema, social metadata, crawl files, and share image dimensions');
