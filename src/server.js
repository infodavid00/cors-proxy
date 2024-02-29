import express from "express";
import cors from "cors";
import request from "request";
import "dotenv/config";
import EventEmitter from "events";

const Events = new EventEmitter();
const app = express();
const PORT = process.env.PORT || 5010;

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Handle the error, e.g., send a response or log it
});

app.use(cors());
app.use(express.json());

app.all("/", async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'Missing "url" parameter' });
    }

    const Requestoptions = {
      url,
      headers: {
        "Content-Type": "application/json",
        Referer: "https://bbp.api.rentmanager.com",
        Accept: "application/json",
      },
    };

    if (req.method === "GET") {
      Requestoptions.headers["X-RM12Api-ApiToken"] =
        req.headers["x-rm12api-apitoken"];
      request(Requestoptions)
        .on("error", (err) => {
          console.error("Request Error:", err);
          Events.emit("error", err); // Emit custom error event
          res.status(500).json({
            error: "Cannot CONNECT with Target server",
            message: err.message,
          });
        })
        .pipe(res);
    } else if (req.method === "POST") {
      const POSToptions = { json: req.body, ...Requestoptions };
      request
        .post(POSToptions)
        .on("error", (err) => {
          console.error("Request Error:", err);
          Events.emit("error", err); // Emit custom error event
          res.status(500).json({
            error: "Cannot CONNECT with Target server",
            message: err.message,
          });
        })
        .pipe(res);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err) {
    Events.emit("error", err); // Emit custom error event
    res.status(500).json({
      error: "Cannot CONNECT with Target server",
      message: err.message,
    });
  }
});

Events.on("error", (err) => {
  console.error("Custom Error Event occured");
});

app.listen(PORT, () => {
  console.log(`CORS proxy server is running on port ${PORT}`);
});
