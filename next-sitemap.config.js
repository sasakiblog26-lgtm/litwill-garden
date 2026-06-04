/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.litwillgarden.com",
  generateRobotsTxt: false,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: [
    "/admin",
    "/admin/*",
    "/readings/success",
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
