/**
 * Utility to parse simple Markdown text into sanitized HTML string.
 * Supports: bold (**text**), italics (*text*), lists (- item), links ([text](url)), line breaks and paragraphs.
 */
export function parseMarkdown(markdownText) {
  if (!markdownText) return '';

  let text = String(markdownText);

  // Escape basic HTML entities for safety
  text = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold: **text** or __text__
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');

  // Italics: *text* or _text_
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.*?)_/g, '<em>$1</em>');

  // Inline Code: `code`
  text = text.replace(/`(.*?)`/g, '<code>$1</code>');

  // Links: [text](url)
  text = text.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Separate paragraphs by double line breaks
  const blocks = text.split(/\n\s*\n/);

  const htmlBlocks = blocks.map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return '';

    // Check if block consists of bullet list items
    const isBulletList = lines.every(line => line.startsWith('- ') || line.startsWith('* '));
    if (isBulletList) {
      const listItems = lines
        .map(line => `<li>${line.replace(/^[-*]\s+/, '')}</li>`)
        .join('');
      return `<ul class="markdown-list">${listItems}</ul>`;
    }

    // Check if block consists of ordered list items (e.g. 1. 2.)
    const isOrderedList = lines.every(line => /^\d+\.\s+/.test(line));
    if (isOrderedList) {
      const listItems = lines
        .map(line => `<li>${line.replace(/^\d+\.\s+/, '')}</li>`)
        .join('');
      return `<ol class="markdown-list">${listItems}</ol>`;
    }

    // Normal paragraph with line breaks
    return `<p class="markdown-paragraph">${lines.join('<br>')}</p>`;
  });

  return htmlBlocks.join('');
}
