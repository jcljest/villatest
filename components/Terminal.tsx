import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw } from 'lucide-react';
import { INITIAL_TERMINAL_OUTPUT } from '../constants';

const VALID_COMMANDS: Record<string, string> = {
    'git init': 'Initialized empty Git repository in /home/user/project/.git/',
    'git status': 'On branch main\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n    index.html\n    style.css',
    'git add .': 'warning: LF will be replaced by CRLF in index.html.\nThe file will have its original line endings in your working directory',
    'git commit -m': '[main (root-commit) 2d8d8f1] Initial commit\n 2 files changed, 45 insertions(+)\n create mode 100644 index.html\n create mode 100644 style.css',
    'git log': 'commit 2d8d8f1e4b3c2a1 (HEAD -> main)\nAuthor: User <user@example.com>\nDate:   Mon Oct 23 20:23:45 2023 +0000\n\n    Initial commit',
    'git push': 'To https://github.com/user/repo.git\n * [new branch]      main -> main',
    'help': 'Available commands:\n  git init\n  git status\n  git add .\n  git commit -m "message"\n  git log\n  git push\n  clear',
    'clear': 'CLEAR_SIGNAL'
};

const Terminal: React.FC = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>(INITIAL_TERMINAL_OUTPUT);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim();
        
        if (!cmd) return;

        let output = `Command not found: ${cmd}. Type 'help' for available commands.`;
        
        // Simple command matching
        if (VALID_COMMANDS[cmd]) {
            output = VALID_COMMANDS[cmd];
        } else if (cmd.startsWith('git commit -m')) {
             output = VALID_COMMANDS['git commit -m'];
        }

        if (output === 'CLEAR_SIGNAL') {
            setHistory(INITIAL_TERMINAL_OUTPUT);
        } else {
            setHistory(prev => [...prev, `$ ${cmd}`, output]);
        }
        
        setInput('');
    };

    return (
        <div className="bg-[#010409] border border-github-border rounded-lg overflow-hidden flex flex-col h-full shadow-2xl">
            <div className="bg-[#161b22] px-4 py-2 border-b border-github-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <TerminalIcon className="w-4 h-4 text-github-light opacity-60" />
                    <span className="text-sm font-mono text-github-light font-bold">bash -- 80x24</span>
                </div>
                <div className="flex space-x-2">
                     <button onClick={() => setHistory(INITIAL_TERMINAL_OUTPUT)} className="text-xs text-github-blue hover:underline flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> Reset
                     </button>
                </div>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto max-h-[400px] min-h-[300px]">
                {history.map((line, i) => (
                    <div key={i} className={`mb-1 whitespace-pre-wrap ${line.startsWith('$') ? 'text-github-blue font-bold' : 'text-gray-300'}`}>
                        {line}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
            <form onSubmit={handleCommand} className="bg-[#0d1117] p-2 border-t border-github-border flex items-center">
                <span className="text-github-green font-bold mr-2">➜</span>
                <span className="text-github-blue font-bold mr-2">~</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-gray-100 font-mono"
                    placeholder="Type git command..."
                    autoFocus
                />
            </form>
        </div>
    );
};

export default Terminal;