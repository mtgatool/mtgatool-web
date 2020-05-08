export default function urlDecode(url: string): string {
  return decodeURIComponent(url.replace(/\+/g, " "));
}
