import React, { useState, useEffect } from 'react';
import { CODE_LIBRARY } from '../data/codeLibrary';
import './CodeEditor.css';

const categories = [
  {
    title: 'Sorting Algorithms',
    items: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort'],
  },
  {
    title: 'Search Algorithms',
    items: ['Linear Search', 'Binary Search', 'Jump Search'],
  },
  {
    title: 'Graph Theory',
    items: ["Dijkstra's", 'BFS', 'DFS', "Prim's MST", 'Bellman-Ford', 'A* Pathfinding'],
  },
  {
    title: 'Data Structures',
    items: ['Binary Tree', 'Linked List', 'Hash Table', 'Stack', 'Queue'],
  },
  {
    title: 'Dynamic Programming',
    items: ['Fibonacci DP', '0/1 Knapsack', 'Coin Change'],
  },
];

const LANGUAGE_LABELS = {
  javascript: 'JavaScript',
  python: 'Python',
  cpp: 'C++',
};

const highlight = (code, lang) => {
  if (!code) return '';
  // Escape HTML
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Match comments first to avoid highlighting inside comments
  // JS/C++ comments
  const comments = [];
  html = html.replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, (match) => {
    comments.push(`<span class="token-comment">${match}</span>`);
    return `___COMMENT_${comments.length - 1}___`;
  });
  // Python comments
  if (lang === 'python') {
    html = html.replace(/(#.*)/g, (match) => {
      comments.push(`<span class="token-comment">${match}</span>`);
      return `___COMMENT_${comments.length - 1}___`;
    });
  }

  // Strings
  const strings = [];
  html = html.replace(/(["'`])(.*?)\1/g, (match) => {
    strings.push(`<span class="token-string">${match}</span>`);
    return `___STRING_${strings.length - 1}___`;
  });

  // Keywords
  const keywords = /\b(const|let|var|function|return|if|else|for|while|do|break|continue|class|constructor|this|new|import|export|from|def|in|range|elif|and|or|not|import|from|class|self|try|except|raise|void|int|double|long|bool|std|vector|swap|include|struct|nullptr|public|private|structs|using|namespace|greater|template|long\s+long)\b/g;
  html = html.replace(keywords, '<span class="token-keyword">$1</span>');

  // Functions
  html = html.replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g, '<span class="token-function">$1</span>');

  // Numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');

  // Restore comments and strings
  html = html.replace(/___STRING_(\d+)___/g, (_, idx) => strings[parseInt(idx)]);
  html = html.replace(/___COMMENT_(\d+)___/g, (_, idx) => comments[parseInt(idx)]);

  return html;
};

const CodeEditor = ({ onLaunch }) => {
  const [selectedAlgo, setSelectedAlgo] = useState('Bubble Sort');
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(categories.map(c => c.title));

  const toggleCategory = (title) => {
    setExpanded(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const codeSnippet = CODE_LIBRARY[selectedAlgo]?.[selectedLang] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate line numbers
  const lineNumbers = codeSnippet.split('\n').map((_, index) => index + 1);

  return (
    <div className="editor-container">
      {/* Sidebar Selector */}
      <aside className="editor-sidebar">
        <div className="sidebar-header">
          <h3>Algorithm Files</h3>
        </div>
        <div className="sidebar-nav">
          {categories.map(cat => (
            <div key={cat.title} className="nav-group">
              <div className="nav-group-title" onClick={() => toggleCategory(cat.title)}>
                <span className={`chevron ${expanded.includes(cat.title) ? 'open' : ''}`}>›</span>
                <span>{cat.title}</span>
              </div>
              {expanded.includes(cat.title) && (
                <div className="nav-group-items">
                  {cat.items.map(item => (
                    <div
                      key={item}
                      className={`nav-item ${selectedAlgo === item ? 'active' : ''}`}
                      onClick={() => setSelectedAlgo(item)}
                    >
                      <span className="file-icon">📄</span>
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Editor Main Area */}
      <main className="editor-main">
        {/* Editor Header / Toolbar */}
        <div className="editor-toolbar">
          <div className="tab-title">
            <span className="file-icon-large">📄</span>
            <div>
              <span className="filename">{selectedAlgo.replace(/\s+/g, '')}.{selectedLang === 'python' ? 'py' : selectedLang === 'cpp' ? 'cpp' : 'js'}</span>
              <span className="file-meta">{LANGUAGE_LABELS[selectedLang]} Implementation</span>
            </div>
          </div>
          
          <div className="toolbar-controls">
            {/* Language Selection Chips */}
            <div className="language-selector">
              {Object.keys(LANGUAGE_LABELS).map(lang => (
                <button
                  key={lang}
                  className={`lang-btn ${selectedLang === lang ? 'active' : ''}`}
                  onClick={() => setSelectedLang(lang)}
                >
                  {LANGUAGE_LABELS[lang]}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="toolbar-btn copy-btn" onClick={handleCopy}>
                {copied ? '✓ Copied!' : '⎘ Copy'}
              </button>
              <button 
                className="toolbar-btn run-btn" 
                onClick={() => onLaunch(selectedAlgo)}
              >
                ▶ Run Simulation
              </button>
            </div>
          </div>
        </div>

        {/* Code View Body */}
        <div className="editor-body">
          <div className="line-numbers">
            {lineNumbers.map(n => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <pre className="code-pre">
            <code 
              dangerouslySetInnerHTML={{ __html: highlight(codeSnippet, selectedLang) }} 
            />
          </pre>
        </div>
      </main>
    </div>
  );
};

export default CodeEditor;
