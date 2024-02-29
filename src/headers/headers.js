export default function Headers(Url, Referer, TokenHeaders) {
  const header = {
    url: Url,
    headers: {
      "Content-Type": "application/json",
      Referer: Referer,
      Accept: "application/json",
    },
  };
  if (TokenHeaders) {
    header[TokenHeaders?.key] = TokenHeaders?.value;
  }
  return header;
}

// TokenHeaders = {key:'', value:''}
