//
export default function validateUser(rq, rs, pass) {
  const proxyToken = rq.headers["proxy-tt-key"];
  if (proxyToken) {
    pass();
  } else {
    rs.status(400).json({ error: "Proxy Token Required" });
  }
}
