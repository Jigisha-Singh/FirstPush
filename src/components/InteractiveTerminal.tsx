import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Command } from 'lucide-react';

interface TerminalOutput {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

const InteractiveTerminal = () => {
  const [commandHistory, setCommandHistory] = useState<TerminalOutput[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const [repoInitialized, setRepoInitialized] = useState(false);
  const [hasCommits, setHasCommits] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [currentBranch, setCurrentBranch] = useState('main');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = [
    'git init',
    'git status',
    'git add .',
    'git add README.md',
    'git commit -m "Initial commit"',
    'git log',
    'git branch',
    'git branch feature-branch',
    'git checkout feature-branch',
    'git checkout main',
    'git remote add origin https://github.com/username/repo.git',
    'git push origin main',
    'git pull origin main',
    'git clone https://github.com/username/repo.git',
    'git config --global user.name "Your Name"',
    'git config --global user.email "your.email@example.com"',
    'git --version',
    'help',
    'clear'
  ];

  const getCommandResponse = (command: string): string => {
    const cmd = command.trim().toLowerCase();
    
    if (cmd === 'git init') {
      setRepoInitialized(true);
      return 'Initialized empty Git repository in .git/\n';
    }
    
    if (cmd === 'git status') {
      if (!repoInitialized) {
        return 'fatal: not a git repository (or any of the parent directories): .git\n';
      }
      if (stagedFiles.length === 0) {
        return `On branch ${currentBranch}\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n        README.md\n        index.html\n        style.css\n\nnothing added to commit but untracked files present (use "git add" and/or "git commit -a")\n`;
      }
      return `On branch ${currentBranch}\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n        new file:   README.md\n        new file:   index.html\n        new file:   style.css\n\n`;
    }
    
    if (cmd === 'git add .') {
      setStagedFiles(['README.md', 'index.html', 'style.css']);
      return '';
    }
    
    if (cmd === 'git add readme.md') {
      setStagedFiles(prev => [...prev, 'README.md']);
      return '';
    }
    
    if (cmd === 'git commit -m "initial commit"') {
      if (stagedFiles.length === 0) {
        return 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean\n';
      }
      setHasCommits(true);
      setStagedFiles([]);
      return '[main (root-commit) abc1234] Initial commit\n 3 files changed, 25 insertions(+)\n create mode 100644 README.md\n create mode 100644 index.html\n create mode 100644 style.css\n';
    }
    
    if (cmd === 'git log') {
      if (!hasCommits) {
        return 'fatal: your current branch has no commits yet\n';
      }
      return `commit abc1234567890abcdef1234567890abcdef1234 (HEAD -> ${currentBranch})\nAuthor: Your Name <your.email@example.com>\nDate:   ${new Date().toLocaleString()}\n\n    Initial commit\n\n    Add README, HTML, and CSS files\n`;
    }
    
    if (cmd === 'git branch') {
      return `* ${currentBranch}\n  feature-branch\n`;
    }
    
    if (cmd === 'git branch feature-branch') {
      return '';
    }
    
    if (cmd === 'git checkout feature-branch') {
      setCurrentBranch('feature-branch');
      return `Switched to branch 'feature-branch'\n`;
    }
    
    if (cmd === 'git checkout main') {
      setCurrentBranch('main');
      return `Switched to branch 'main'\n`;
    }
    
    if (cmd === 'git remote add origin https://github.com/username/repo.git') {
      return '';
    }
    
    if (cmd === 'git push origin main') {
      return `Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (2/2), done.\nWriting objects: 100% (3/3), 1.2 KiB | 1.2 MiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0), pack-reused 0\nTo https://github.com/username/repo.git\n * [new branch]      main -> main\nBranch 'main' set up to track remote branch 'main' from 'origin'.\n`;
    }
    
    if (cmd === 'git pull origin main') {
      return `From https://github.com/username/repo\n * branch            main     -> FETCH_HEAD\nAlready up to date.\n`;
    }
    
    if (cmd === 'git clone https://github.com/username/repo.git') {
      return `Cloning into 'repo'...\nremote: Enumerating objects: 3, done.\nremote: Counting objects: 100% (3/3), done.\nremote: Compressing objects: 100% (2/2), done.\nremote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0\nReceiving objects: 100% (3/3), done.\n`;
    }
    
    if (cmd === 'git config --global user.name "your name"') {
      return '';
    }
    
    if (cmd === 'git config --global user.email "your.email@example.com"') {
      return '';
    }
    
    if (cmd === 'git --version') {
      return 'git version 2.39.2\n';
    }
    
    if (cmd === 'help') {
      return `Available commands:\n${commands.join('\n')}\n\nTry typing any of these commands to see their simulated output!\n`;
    }
    
    if (cmd === 'clear') {
      setCommandHistory([]);
      return '';
    }
    
    return `bash: ${command}: command not found\nTry 'help' for available commands.\n`;
  };

  const handleCommand = (command: string) => {
    if (!command.trim()) return;
    
    const newOutput: TerminalOutput[] = [
      { type: 'command', content: `$ ${command}`, timestamp: new Date() },
      { type: 'output', content: getCommandResponse(command), timestamp: new Date() }
    ];
    
    setCommandHistory(prev => [...prev, ...newOutput]);
    setCurrentCommand('');
    setCommandIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandIndex < commands.length) {
        setCommandIndex(prev => prev + 1);
        setCurrentCommand(commands[commands.length - 1 - commandIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        setCommandIndex(prev => prev - 1);
        setCurrentCommand(commands[commands.length - 1 - commandIndex]);
      } else {
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-green-400" />
          <span className="text-gray-300 text-sm font-medium">Git Terminal</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto font-mono text-sm"
      >
        {/* Welcome Message */}
        {commandHistory.length === 0 && (
          <div className="text-green-400 mb-4">
            Welcome to the Git Terminal Simulator!<br/>
            Type 'help' to see available commands.<br/>
            <br/>
          </div>
        )}
        
        {/* Command History */}
        {commandHistory.map((output, index) => (
          <div key={index} className="mb-2">
            <div className={`${output.type === 'command' ? 'text-blue-400' : 'text-gray-300'}`}>
              {output.content}
            </div>
          </div>
        ))}
        
        {/* Current Command Input */}
        <div className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-300 outline-none"
            placeholder="Type a Git command..."
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal; 