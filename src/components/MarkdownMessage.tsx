import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownMessageProps {
	content: string;
	className?: string;
}

export function MarkdownMessage({
	content,
	className,
}: MarkdownMessageProps) {
	return (
		<article
			className={`prose prose-sm max-w-none dark:prose-invert 
				prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-2
				prose-p:text-foreground prose-p:my-1.5 prose-p:leading-relaxed
				prose-strong:text-foreground prose-strong:font-semibold
				prose-em:text-foreground
				prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
				prose-pre:bg-muted prose-pre:p-3 prose-pre:rounded-md prose-pre:overflow-x-auto
				prose-a:text-primary prose-a:no-underline hover:prose-a:underline
				prose-blockquote:border-l-primary prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-2
				prose-ul:my-1.5 prose-ul:pl-4 prose-ol:my-1.5 prose-ol:pl-4
				prose-li:my-0.5 prose-li:text-foreground
				prose-table:border-collapse prose-table:w-full
				prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2 prose-th:text-left prose-th:text-sm
				prose-td:border prose-td:border-border prose-td:p-2 prose-td:text-sm
				${className || ''}`}
		>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					code({ className, children, ...props }) {
						const isInline = !className;
						if (isInline) {
							return (
								<code
									className='bg-muted px-1.5 py-0.5 rounded text-xs font-mono'
									{...props}
								>
									{children}
								</code>
							);
						}
						return (
							<code className={className} {...props}>
								{children}
							</code>
						);
					},
					a({ children, ...props }) {
						return (
							<a
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary hover:underline'
								{...props}
							>
								{children}
							</a>
						);
					},
					table({ children, ...props }) {
						return (
							<div className='overflow-x-auto my-2'>
								<table {...props}>{children}</table>
							</div>
						);
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</article>
	);
}

export default MarkdownMessage;
