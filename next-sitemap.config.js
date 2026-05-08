/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://litwill-garden.com",
  generateRobotsTxt: false,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: [
    "/characters",
    "/characters/*",
    "/weapons",
    "/weapons/*",
    "/tier-list",
    "/ranking",
    "/settings",
    "/guides",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
  },
};
