// Serves the XSLT stylesheet that renders /sitemap.xml as a friendly HTML table
// for humans. Served with an explicit `text/xsl` type so it works under our
// `X-Content-Type-Options: nosniff` header (a wrong MIME type would be blocked).
export const dynamic = "force-static";

const XSL = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:x="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Forex Market Hours: XML Sitemap</title>
        <style>
          :root {
            --bg: #fbf3e9; --card: #fffcf6; --ink: #23201c; --fg: #4a443b;
            --muted: #6b6153; --line: #e7dccb; --accent: #9e1b4b;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #1a1714; --card: #241f1b; --ink: #ece3d6; --fg: #c3b8a9;
              --muted: #a69a89; --line: #38302a; --accent: #e0577e;
            }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0; background: var(--bg); color: var(--fg);
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
            -webkit-font-smoothing: antialiased; line-height: 1.5;
          }
          .wrap { max-width: 1100px; margin: 0 auto; padding: 40px 20px 64px; }
          header { border-bottom: 1px solid var(--line); padding-bottom: 20px; margin-bottom: 24px; }
          .eyebrow { color: var(--accent); font-weight: 600; font-size: 13px; letter-spacing: .04em; text-transform: uppercase; }
          h1 { color: var(--ink); font-size: 28px; margin: 6px 0 4px; letter-spacing: -0.02em; }
          .sub { color: var(--muted); font-size: 14px; margin: 0; }
          .count { color: var(--ink); font-weight: 600; }
          .card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; }
          .scroll { overflow-x: auto; }
          table { width: 100%; border-collapse: collapse; font-size: 14px; }
          thead th {
            text-align: left; padding: 12px 16px; background: var(--bg);
            color: var(--muted); font-weight: 600; font-size: 12px;
            text-transform: uppercase; letter-spacing: .03em; white-space: nowrap;
            border-bottom: 1px solid var(--line);
          }
          tbody td { padding: 12px 16px; border-bottom: 1px solid var(--line); vertical-align: top; }
          tbody tr:last-child td { border-bottom: 0; }
          tbody tr:hover { background: color-mix(in srgb, var(--accent) 6%, transparent); }
          a { color: var(--accent); text-decoration: none; word-break: break-all; }
          a:hover { text-decoration: underline; }
          .num { font-variant-numeric: tabular-nums; color: var(--fg); white-space: nowrap; }
          .badge {
            display: inline-block; min-width: 22px; text-align: center;
            padding: 1px 8px; border-radius: 999px; font-size: 12px; font-weight: 600;
            background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent);
          }
          footer { margin-top: 20px; color: var(--muted); font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <div class="eyebrow">Forex Market Hours</div>
            <h1>XML Sitemap</h1>
            <p class="sub">
              This sitemap contains <span class="count"><xsl:value-of select="count(s:urlset/s:url)"/></span> URLs.
              Generated for search engines; this table is a human-readable view.
            </p>
          </header>
          <div class="card">
            <div class="scroll">
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Languages</th>
                    <th>Last modified</th>
                    <th>Change freq.</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="s:urlset/s:url">
                    <tr>
                      <td>
                        <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                      </td>
                      <td><span class="badge"><xsl:value-of select="count(x:link)"/></span></td>
                      <td class="num"><xsl:value-of select="substring(s:lastmod, 1, 10)"/></td>
                      <td class="num"><xsl:value-of select="s:changefreq"/></td>
                      <td class="num"><xsl:value-of select="s:priority"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>
          <footer>
            Each row links to a page; the “Languages” badge counts its hreflang alternates (en, es).
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;

export function GET() {
  return new Response(XSL, {
    headers: {
      "Content-Type": "text/xsl; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
