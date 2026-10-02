import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import { load } from 'cheerio';
const data = parse(readFileSync('_data/data.yml', 'utf8'));
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
for (const path of ['out/index.html', 'out/print/index.html']) {
  const $ = load(readFileSync(path, 'utf8'));
  const text = normalize($('main').text());
  const expected = [data.sidebar.name, data.sidebar.tagline, data.sidebar.timezone, data['career-profile'].summary,
    ...data.education.flatMap((x) => [x.degree, x.university, x.time, x.details].filter(Boolean)),
    ...data.experiences.flatMap((x) => [x.role, x.company, x.time, x.context, ...x.details.trim().split('\n').map((line) => line.replace(/^\s*-\s*/, ''))]),
    ...data.sidebar.languages.flatMap((x) => [x.idiom, x.level]), ...data.sidebar.interests.map((x) => x.item)];
  for (const item of expected) assert.ok(text.includes(normalize(item)), `${path}: missing ${item}`);
  for (const href of [`mailto:${data.sidebar.email}`, `http://${data.sidebar.website}`, `https://github.com/${data.sidebar.github}`, `https://linkedin.com/in/${data.sidebar.linkedin}`]) assert.ok($(`a[href="${href}"]`).length, `Missing link ${href}`);
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
