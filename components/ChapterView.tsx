import React from 'react';
import { Chapter, ContentType } from '../types';
import { Lightbulb, AlertTriangle, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChapterViewProps {
    chapter: Chapter;
}

const ChapterView: React.FC<ChapterViewProps> = ({ chapter }) => {
    const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-github-border pb-4">{chapter.title}</h1>
            
            <div className="space-y-8">
                {chapter.blocks.map((block, idx) => {
                    switch (block.type) {
                        case ContentType.TEXT:
                            return (
                                <div key={idx} className="text-github-light leading-7 text-lg">
                                    <ReactMarkdown components={{
                                        strong: ({node, ...props}) => <span className="font-bold text-white" {...props} />
                                    }}>
                                        {block.content}
                                    </ReactMarkdown>
                                </div>
                            );
                        
                        case ContentType.CODE:
                            return (
                                <div key={idx} className="relative group">
                                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleCopy(block.content, idx)}
                                            className="bg-[#21262d] hover:bg-[#30363d] text-gray-300 p-1.5 rounded-md border border-github-border"
                                        >
                                            {copiedIndex === idx ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <div className="bg-[#161b22] border border-github-border rounded-lg overflow-hidden">
                                        <div className="px-4 py-2 bg-[#21262d] border-b border-github-border text-xs text-gray-400 font-mono">
                                            {block.language || 'text'}
                                        </div>
                                        <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300">
                                            <code>{block.content}</code>
                                        </pre>
                                    </div>
                                </div>
                            );

                        case ContentType.TIP:
                            return (
                                <div key={idx} className="bg-[#161b22] border-l-4 border-github-green p-4 rounded-r-lg flex gap-4">
                                    <Lightbulb className="w-6 h-6 text-github-green flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Pro Tip</h4>
                                        <p className="text-github-light">{block.content}</p>
                                    </div>
                                </div>
                            );

                        case ContentType.WARNING:
                            return (
                                <div key={idx} className="bg-[#161b22] border-l-4 border-yellow-500 p-4 rounded-r-lg flex gap-4">
                                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Warning</h4>
                                        <p className="text-github-light">{block.content}</p>
                                    </div>
                                </div>
                            );

                        case ContentType.IMAGE:
                            return (
                                <div key={idx} className="rounded-lg overflow-hidden border border-github-border">
                                    <img src={block.content} alt={block.alt} className="w-full h-auto object-cover" />
                                    {block.alt && <div className="bg-[#161b22] p-2 text-center text-xs text-gray-500 italic">{block.alt}</div>}
                                </div>
                            );
                        
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default ChapterView;