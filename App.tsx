import React, { useState } from 'react';
import { CHAPTERS } from './constants';
import ChapterView from './components/ChapterView';
import Terminal from './components/Terminal';
import AiAssistant from './components/AiAssistant';
import { Github, Book, Terminal as TerminalIcon, Menu, X, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentChapterId, setCurrentChapterId] = useState<string>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const currentChapter = CHAPTERS.find(c => c.id === currentChapterId) || CHAPTERS[0];

  const handleNavClick = (id: string) => {
    setCurrentChapterId(id);
    setShowTerminal(false);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    const currentIndex = CHAPTERS.findIndex(c => c.id === currentChapterId);
    if (currentIndex < CHAPTERS.length - 1) {
      handleNavClick(CHAPTERS[currentIndex + 1].id);
    } else {
        setShowTerminal(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-github-light flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-[#161b22] border-b border-github-border p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2 font-bold text-white">
          <Github className="w-6 h-6" />
          <span>GitMaster</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0d1117] border-r border-github-border z-30 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:top-0 md:h-screen pt-16 md:pt-0 overflow-y-auto
      `}>
        <div className="p-6">
          <div className="hidden md:flex items-center gap-3 font-bold text-white text-xl mb-8">
            <Github className="w-8 h-8" />
            <span>GitMaster</span>
          </div>

          <nav className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Modules</div>
            {CHAPTERS.map(chapter => (
              <button
                key={chapter.id}
                onClick={() => handleNavClick(chapter.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  currentChapterId === chapter.id && !showTerminal
                    ? 'bg-[#21262d] text-white font-medium border-l-2 border-github-blue'
                    : 'text-gray-400 hover:text-white hover:bg-[#161b22]'
                }`}
              >
                <Book className="w-4 h-4" />
                <span className="text-left">{chapter.title.split('. ')[1]}</span>
              </button>
            ))}

            <div className="my-4 border-t border-github-border"></div>
            
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Practice</div>
            <button
              onClick={() => { setShowTerminal(true); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                showTerminal
                  ? 'bg-[#21262d] text-white font-medium border-l-2 border-github-green'
                  : 'text-gray-400 hover:text-white hover:bg-[#161b22]'
              }`}
            >
              <TerminalIcon className="w-4 h-4" />
              <span>Git Terminal</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {showTerminal ? (
          <div className="h-[calc(100vh-64px)] md:h-screen p-4 md:p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4">Interactive Terminal</h2>
            <p className="text-gray-400 mb-6">Practice your commands here. Try <code className="bg-[#21262d] px-1 rounded text-sm text-github-blue">git init</code> to start.</p>
            <div className="flex-1 max-h-[600px]">
                <Terminal />
            </div>
          </div>
        ) : (
          <div className="pb-24">
            <ChapterView chapter={currentChapter} />
            
            {/* Navigation Footer */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex justify-end">
                <button 
                    onClick={handleNext}
                    className="group flex items-center gap-2 px-6 py-3 bg-github-green hover:bg-[#2c974b] text-white font-semibold rounded-lg transition-all"
                >
                    {CHAPTERS.findIndex(c => c.id === currentChapterId) === CHAPTERS.length - 1 ? 'Go to Terminal Practice' : 'Next Chapter'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        )}
      </main>

      <AiAssistant />
    </div>
  );
};

export default App;