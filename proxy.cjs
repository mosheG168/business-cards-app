const corsAnywhere = require("cors-anywhere");

const host = "localhost";
const port = 8080;

corsAnywhere.createServer({
  originWhitelist: [], 
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"],
}).listen(port, host, () => {
  console.log(`CORS Anywhere running on http://${host}:${port}`);
});
