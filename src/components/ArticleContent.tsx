'use client';

import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8 text-zinc-900 dark:text-zinc-100">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8 text-zinc-900 dark:text-zinc-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-3 mt-6 text-zinc-900 dark:text-zinc-100">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mb-2 mt-4 text-zinc-900 dark:text-zinc-100">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-zinc-700 dark:text-zinc-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-zinc-700 dark:text-zinc-300">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="ml-4 leading-7">{children}</li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline underline-offset-2 font-medium transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 mb-4 italic text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900">
        {children}
      </blockquote>
    ),
    code: ({ className, children }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 text-sm font-mono">
            {children}
          </code>
        );
      }
      return (
        <code className="block p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm font-mono overflow-x-auto mb-4">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto">{children}</pre>
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt || ''}
        className="rounded-lg my-6 w-full shadow-lg"
      />
    ),
    hr: () => (
      <hr className="my-8 border-t border-zinc-200 dark:border-zinc-800" />
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-50 dark:bg-zinc-900">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
        {children}
      </tbody>
    ),
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
        {children}
      </td>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-zinc-900 dark:text-zinc-100">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-zinc-700 dark:text-zinc-300">{children}</em>
    ),
  };

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none article-content">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
