import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

let highlighter: HighlighterCore | null = null;

export async function getHighlighter(): Promise<HighlighterCore> {
    if (!highlighter) {
        highlighter = await createHighlighterCore({
            themes: [
                import('shiki/themes/github-dark.mjs'),
                import('shiki/themes/github-light.mjs'),
            ],
            langs: [
                import('shiki/langs/php.mjs'),
                import('shiki/langs/tsx.mjs'),
                import('shiki/langs/typescript.mjs'),
                import('shiki/langs/bash.mjs'),
                import('shiki/langs/json.mjs'),
                import('shiki/langs/html.mjs'),
                import('shiki/langs/css.mjs'),
                import('shiki/langs/yaml.mjs'),
            ],
            engine: createOnigurumaEngine(import('shiki/wasm')),
        });
    }
    return highlighter;
}

export async function highlightCode(code: string, lang: string, theme: 'dark' | 'light' = 'dark'): Promise<string> {
    const hl = await getHighlighter();
    const themeName = theme === 'dark' ? 'github-dark' : 'github-light';

    try {
        return hl.codeToHtml(code, { lang, theme: themeName });
    } catch {
        return hl.codeToHtml(code, { lang: 'text', theme: themeName });
    }
}
