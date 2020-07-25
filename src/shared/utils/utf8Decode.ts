export default function utf8Decode(str: string): string {
  return decodeURIComponent(escape(str));
}
