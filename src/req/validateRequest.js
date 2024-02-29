export default function validateRequest(rq, rs, pass) {
  const { url } = rq.query;
  if (url) {
    pass();
  } else {
    rs.status(403).json({
      error: "Url Params Missing or Cannot be validated!",
    });
  }
}
