module.exports = {
  siteUrl: "https://hamzafallahi.me/",
  generateRobotsTxt: true, // Generate robots.txt
  exclude: ['/admin', '/login'], // <--- Add this line to hide these pages
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login'], // <--- Tells bots not to crawl these
      },
    ],
  },
};
