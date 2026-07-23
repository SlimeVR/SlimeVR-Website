export function parseMarkdownFrontMatter(content: string): { attributes: Record<string, string>; body: string } {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return { attributes: {}, body: content };

  const attrs: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const sep = line.indexOf(":");
    if (sep !== -1) {
      const key = line.slice(0, sep).trim();
      let val = line.slice(sep + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      attrs[key] = val === "null" ? "" : val;
    }
  }
  return { attributes: attrs, body: content.slice(match[0].length) };
}

const EMOJI_RE = /<:([^:]+):(\d+)>/g;

export function renderEmoji(text: string, loading: string = "lazy"): string {
  return text.replace(EMOJI_RE, `<img src="/posts/emoji/$1-$2.webp" alt=":$1:" class="emoji-inline" loading="${loading}" />`);
}

export interface EmojiSegment {
  type: "text" | "emoji";
  value: string;
  emojiName?: string;
  emojiId?: string;
}

export function splitEmoji(text: string): EmojiSegment[] {
  const parts: EmojiSegment[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(EMOJI_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ type: "text", value: text.slice(last, match.index) });
    }
    parts.push({ type: "emoji", value: match[0], emojiName: match[1], emojiId: match[2] });
    last = re.lastIndex;
  }
  if (last < text.length) {
    parts.push({ type: "text", value: text.slice(last) });
  }
  return parts;
}

export function stripEmoji(text: string): string {
  return text.replace(EMOJI_RE, ":$1:");
}
