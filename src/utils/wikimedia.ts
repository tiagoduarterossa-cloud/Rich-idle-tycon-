export function wikimediaImage(filename: string, width = 480): string {
  const normalized = filename.replace(/ /g, '_');
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(normalized)}?width=${width}`;
}
