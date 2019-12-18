export default function urlDecode(url) {
  return decodeURIComponent(url.replace(/\+/g, " "));
}
