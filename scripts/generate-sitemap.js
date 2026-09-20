const fs = require('fs');
const path = require('path');
const { ALL_TOOL_SLUGS } = require('../app/tools/toolsData.ts');

const today = new Date().toISOString().split('T')[0];

const hubPages = [
  { url: 'https://mrfreqline.vercel.app/', priority: '1.0', changefreq: 'daily' },
  { url: 'https://mrfreqline.vercel.app/tools', priority: '0.95', changefreq: 'daily' },
  { url: 'https://mrfreqline.vercel.app/resources/essentials-toolkit', priority: '0.95', changefreq: 'daily' },
  { url: 'https://mrfreqline.vercel.app/tech/best-pc-optimization-tools', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/gaming/free-resources', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/best-free-websites', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/prompts', priority: '0.9', changefreq: 'daily' },
  { url: 'https://mrfreqline.vercel.app/resources', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault/developer', priority: '0.85', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault/image-tools', priority: '0.85', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault/video-tools', priority: '0.85', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault/utilities', priority: '0.85', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault/music', priority: '0.85', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault/mobile', priority: '0.85', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault/os-ecosystems', priority: '0.85', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault/books', priority: '0.85', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/resources/internet-vault/torrenting', priority: '0.85', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/news', priority: '0.8', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/reviews', priority: '0.8', changefreq: 'weekly' },
  { url: 'https://mrfreqline.vercel.app/help', priority: '0.7', changefreq: 'monthly' },
  { url: 'https://mrfreqline.vercel.app/contact', priority: '0.7', changefreq: 'monthly' },
  { url: 'https://mrfreqline.vercel.app/donate', priority: '0.7', changefreq: 'monthly' }
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
xml += '  <!-- Core Site & Major Resource Hubs -->\n';

for (const p of hubPages) {
  xml += '  <url>\n';
  xml += '    <loc>' + p.url + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>' + p.changefreq + '</changefreq>\n';
  xml += '    <priority>' + p.priority + '</priority>\n';
  xml += '  </url>\n';
}

xml += '\n  <!-- 65 Dedicated Built-in Interactive Tools -->\n';
for (const slug of ALL_TOOL_SLUGS) {
  xml += '  <url>\n';
  xml += '    <loc>https://mrfreqline.vercel.app/tools/' + slug + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.8</priority>\n';
  xml += '  </url>\n';
}

xml += '</urlset>\n';

const outPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log('Successfully generated sitemap. Total URLs:', hubPages.length + ALL_TOOL_SLUGS.length);
