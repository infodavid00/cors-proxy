import Headers from "../headers/headers.js";

export default function Get(rq, rs, pass) {
  // const { url } = rq.query;
  // const Referer = url.split(".com").join("") + ".com";
  // const h = Headers(url, Referer);
  // console.log(h);
  let customHeader = "CustomHeader";
  customHeader = rq.headers[customHeader.toLowerCase()];

  console.log(customHeader);
}
