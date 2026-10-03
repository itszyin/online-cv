// Produce a self-contained 1200 × 630 HTML card for browser screenshot export.
// Run from the repository root: node scripts/share-card.mjs /tmp/resume-share.html
// Capture at device scale 1 after document.fonts.ready; commit the resulting
// public/assets/images/resume-share.png. Chinese text needs a CJK system font.
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
const data = parse(readFileSync('_data/data.yml', 'utf8'));
const escape = (s) => s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const font = (name) => readFileSync(`node_modules/geist/dist/fonts/geist-sans/Geist-${name}.woff2`).toString('base64');
const photo = readFileSync(`public/assets/images/${data.sidebar.avatar}`).toString('base64');
const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>Resume share card</title><style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${font('Regular')}) format('woff2');font-weight:400}
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${font('SemiBold')}) format('woff2');font-weight:600}
*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden}body{background:#f9fafb;color:#17191d;font-family:Geist,"PingFang SC","Microsoft YaHei",sans-serif}.card{position:relative;width:1200px;height:630px;padding:58px 68px}.eyebrow{font-size:16px;letter-spacing:3px;color:#636b75;text-transform:uppercase}.identity{margin-top:50px;width:850px}h1{font-size:66px;letter-spacing:-3px;line-height:1.1;margin:0;font-weight:600}.chinese{font-size:27px;letter-spacing:3px;color:#59616d;margin-top:12px}.role{font-size:25px;margin-top:21px;color:#424b57}.portrait{position:absolute;right:68px;top:126px;width:174px;height:174px;object-fit:cover;border-radius:22px;border:1px solid #e0e3e8}.focus{margin-top:47px;font-size:32px;letter-spacing:-.8px;font-weight:600}.product{font-size:21px;margin-top:12px;color:#56606e}.footer{position:absolute;bottom:43px;left:68px;right:68px;border-top:1px solid #dce1e7;padding-top:22px;display:flex;justify-content:space-between;font-size:16px;color:#66707c}.domain{color:#17191d;font-weight:600}
</style><main class="card"><div class="eyebrow">Professional profile</div><div class="identity"><h1>${escape(data.sidebar.name)}</h1><div class="chinese" lang="zh-Hans">${escape(data.sidebar.alternate_name)}</div><div class="role">${escape(data.sidebar.tagline)}</div></div><img class="portrait" src="data:image/jpeg;base64,${photo}" alt="${escape(data.sidebar.name)}"><div class="focus">Large-scale LLM inference systems</div><div class="product"><span lang="zh-Hans">火山方舟</span> / BytePlus ModelArk</div><div class="footer"><span>Distributed serving · Inference performance · GPU efficiency</span><span class="domain">zqyin.com</span></div></main></html>`;
writeFileSync(process.argv[2] || '/tmp/resume-share.html', html);
