const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it("should create a function named validateAge that takes a parameter named oldEnough and returns 'old enough' only if oldEnough is true", async function() {
      const result = await page.evaluate(() => {
        return validateAge(true);
      });

      expect(result).toBe('old enough');
  });

  it("should not return 'old enough' from the validateAge function if oldEnough is false", async function() {
      const result = await page.evaluate(() => {
        return validateAge(false);
      });

      expect(result).not.toBe('old enough');
  });
});

