import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Command, ChevronUp, ChevronDown } from 'lucide-react';

interface TerminalOutput {
  type: 'command' | 'output' | 'error' | 'success' | 'info';
  content: string;
  timestamp: Date;
  isValid?: boolean;
}

interface CommandSuggestion {
  command: string;
  description: string;
  category: string;
}

const InteractiveTerminal = () => {
  const [commandHistory, setCommandHistory] = useState<TerminalOutput[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<CommandSuggestion[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [repoInitialized, setRepoInitialized] = useState(false);
  const [hasCommits, setHasCommits] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [branches, setBranches] = useState(['main']);
  const [remotes, setRemotes] = useState<string[]>([]);
  const [commitCount, setCommitCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commandSuggestions: CommandSuggestion[] = [
    { command: 'git init', description: 'Initialize a new Git repository', category: 'Repository' },
    { command: 'git status', description: 'Show working tree status', category: 'Repository' },
    { command: 'git add .', description: 'Add all files to staging area', category: 'Staging' },
    { command: 'git add <file>', description: 'Add specific file to staging area', category: 'Staging' },
    { command: 'git commit -m "message"', description: 'Commit staged changes with message', category: 'Committing' },
    { command: 'git log', description: 'Show commit history', category: 'History' },
    { command: 'git log --oneline', description: 'Show compact commit history', category: 'History' },
    { command: 'git branch', description: 'List all branches', category: 'Branching' },
    { command: 'git branch <name>', description: 'Create new branch', category: 'Branching' },
    { command: 'git checkout <branch>', description: 'Switch to branch', category: 'Branching' },
    { command: 'git checkout -b <name>', description: 'Create and switch to new branch', category: 'Branching' },
    { command: 'git merge <branch>', description: 'Merge branch into current branch', category: 'Branching' },
    { command: 'git remote add origin <url>', description: 'Add remote repository', category: 'Remote' },
    { command: 'git push origin <branch>', description: 'Push commits to remote', category: 'Remote' },
    { command: 'git pull origin <branch>', description: 'Pull changes from remote', category: 'Remote' },
    { command: 'git clone <url>', description: 'Clone remote repository', category: 'Remote' },
    { command: 'git config --global user.name "name"', description: 'Set global username', category: 'Configuration' },
    { command: 'git config --global user.email "email"', description: 'Set global email', category: 'Configuration' },
    { command: 'git --version', description: 'Show Git version', category: 'System' },
    { command: 'git help', description: 'Show Git help', category: 'System' },
    { command: 'clear', description: 'Clear terminal', category: 'System' },
    { command: 'help', description: 'Show available commands', category: 'System' }
  ];

  const parseCommand = (command: string) => {
    const parts = command.trim().split(' ');
    const baseCommand = parts[0];
    const args = parts.slice(1);
    return { baseCommand, args, fullCommand: command.trim() };
  };

  const getCommandResponse = (command: string): { output: string; isValid: boolean; type: 'output' | 'error' | 'success' | 'info' } => {
    const { baseCommand, args, fullCommand } = parseCommand(command);
    
    // Check if it's a valid Git command
    if (baseCommand === 'git') {
      if (args.length === 0) {
        return {
          output: 'usage: git <command> [<args>]\n\nThese are common Git commands used in various situations:\n\nstart a working area (see also: git help tutorial)\n   clone     Clone a repository into a new directory\n   init      Create an empty Git repository or reinitialize an existing one\n\nwork on the current change (see also: git help everyday)\n   add       Add file contents to the index\n   mv        Move or rename a file, a directory, or a symlink\n   reset     Reset current HEAD to the specified state\n   rm        Remove files from the working tree and from the index\n\nexamine the history and state (see also: git help revisions)\n   log       Show commit logs\n   show      Show various types of objects\n   status    Show the working tree status\n\n',
          isValid: true,
          type: 'info'
        };
      }

      const gitCommand = args[0];
      const gitArgs = args.slice(1);

      // git init
      if (gitCommand === 'init') {
        setRepoInitialized(true);
        return {
          output: 'Initialized empty Git repository in .git/\n',
          isValid: true,
          type: 'success'
        };
      }

      // git status
      if (gitCommand === 'status') {
        if (!repoInitialized) {
          return {
            output: 'fatal: not a git repository (or any of the parent directories): .git\n',
            isValid: false,
            type: 'error'
          };
        }
        if (stagedFiles.length === 0) {
          return {
            output: `On branch ${currentBranch}\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n        README.md\n        index.html\n        style.css\n\nnothing added to commit but untracked files present (use "git add" and/or "git commit -a")\n`,
            isValid: true,
            type: 'output'
          };
        }
        return {
          output: `On branch ${currentBranch}\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n        new file:   README.md\n        new file:   index.html\n        new file:   style.css\n\n`,
          isValid: true,
          type: 'output'
        };
      }

      // git add
      if (gitCommand === 'add') {
        if (!repoInitialized) {
          return {
            output: 'fatal: not a git repository (or any of the parent directories): .git\n',
            isValid: false,
            type: 'error'
          };
        }
        if (gitArgs.length === 0) {
          return {
            output: 'Nothing specified, nothing added.\nhint: Maybe you wanted to say \'git add .\'?\nhint: Turn this message off by running\nhint: \'git config advice.addEmptyPathspec false\'\n',
            isValid: false,
            type: 'error'
          };
        }
        if (gitArgs[0] === '.') {
          setStagedFiles(['README.md', 'index.html', 'style.css']);
          return {
            output: '',
            isValid: true,
            type: 'success'
          };
        }
        if (gitArgs[0] === 'README.md' || gitArgs[0] === 'readme.md') {
          setStagedFiles(prev => [...prev, 'README.md']);
          return {
            output: '',
            isValid: true,
            type: 'success'
          };
        }
        return {
          output: `fatal: pathspec '${gitArgs[0]}' did not match any files\n`,
          isValid: false,
          type: 'error'
        };
      }

      // git commit
      if (gitCommand === 'commit') {
        if (!repoInitialized) {
          return {
            output: 'fatal: not a git repository (or any of the parent directories): .git\n',
            isValid: false,
            type: 'error'
          };
        }
        if (stagedFiles.length === 0) {
          return {
            output: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean\n',
            isValid: true,
            type: 'output'
          };
        }
        const messageIndex = gitArgs.indexOf('-m');
        if (messageIndex === -1 || messageIndex === gitArgs.length - 1) {
          return {
            output: 'error: switch \'m\' requires a value\nusage: git commit [<options>] [<commit>]\n\n    -m <msg>       use the given <msg> as the commit message\n',
            isValid: false,
            type: 'error'
          };
        }
        const message = gitArgs[messageIndex + 1];
        if (!message || message.startsWith('-')) {
          return {
            output: 'error: switch \'m\' requires a value\nusage: git commit [<options>] [<commit>]\n\n    -m <msg>       use the given <msg> as the commit message\n',
            isValid: false,
            type: 'error'
          };
        }
        setHasCommits(true);
        setStagedFiles([]);
        setCommitCount(prev => prev + 1);
        return {
          output: `[${currentBranch} (root-commit) ${generateCommitHash()}] ${message}\n 3 files changed, 25 insertions(+)\n create mode 100644 README.md\n create mode 100644 index.html\n create mode 100644 style.css\n`,
          isValid: true,
          type: 'success'
        };
      }

      // git log
      if (gitCommand === 'log') {
        if (!repoInitialized) {
          return {
            output: 'fatal: not a git repository (or any of the parent directories): .git\n',
            isValid: false,
            type: 'error'
          };
        }
        if (!hasCommits) {
          return {
            output: 'fatal: your current branch has no commits yet\n',
            isValid: false,
            type: 'error'
          };
        }
        if (gitArgs.includes('--oneline')) {
          return {
            output: `${generateCommitHash().substring(0, 7)} Initial commit\n`,
            isValid: true,
            type: 'output'
          };
        }
        return {
          output: `commit ${generateCommitHash()} (HEAD -> ${currentBranch})\nAuthor: Your Name <your.email@example.com>\nDate:   ${new Date().toLocaleString()}\n\n    Initial commit\n\n    Add README, HTML, and CSS files\n`,
          isValid: true,
          type: 'output'
        };
      }

      // git branch
      if (gitCommand === 'branch') {
        if (!repoInitialized) {
          return {
            output: 'fatal: not a git repository (or any of the parent directories): .git\n',
            isValid: false,
            type: 'error'
          };
        }
        if (gitArgs.length === 0) {
          return {
            output: `${branches.map(branch => `${branch === currentBranch ? '*' : ' '} ${branch}`).join('\n')}\n`,
            isValid: true,
            type: 'output'
          };
        }
        if (gitArgs[0] && !branches.includes(gitArgs[0])) {
          setBranches(prev => [...prev, gitArgs[0]]);
          return {
            output: '',
            isValid: true,
            type: 'success'
          };
        }
        return {
          output: `fatal: A branch named '${gitArgs[0]}' already exists.\n`,
          isValid: false,
          type: 'error'
        };
      }

      // git checkout
      if (gitCommand === 'checkout') {
        if (!repoInitialized) {
          return {
            output: 'fatal: not a git repository (or any of the parent directories): .git\n',
            isValid: false,
            type: 'error'
          };
        }
        if (gitArgs[0] === '-b' && gitArgs[1]) {
          if (branches.includes(gitArgs[1])) {
            return {
              output: `fatal: A branch named '${gitArgs[1]}' already exists.\n`,
              isValid: false,
              type: 'error'
            };
          }
          setBranches(prev => [...prev, gitArgs[1]]);
          setCurrentBranch(gitArgs[1]);
          return {
            output: `Switched to a new branch '${gitArgs[1]}'\n`,
            isValid: true,
            type: 'success'
          };
        }
        if (gitArgs[0] && branches.includes(gitArgs[0])) {
          setCurrentBranch(gitArgs[0]);
          return {
            output: `Switched to branch '${gitArgs[0]}'\n`,
            isValid: true,
            type: 'success'
          };
        }
        return {
          output: `error: pathspec '${gitArgs[0]}' did not match any file(s) known to git\n`,
          isValid: false,
          type: 'error'
        };
      }

      // git remote
      if (gitCommand === 'remote') {
        if (!repoInitialized) {
          return {
            output: 'fatal: not a git repository (or any of the parent directories): .git\n',
            isValid: false,
            type: 'error'
          };
        }
        if (gitArgs[0] === 'add' && gitArgs[1] === 'origin' && gitArgs[2]) {
          setRemotes(prev => [...prev, gitArgs[2]]);
          return {
            output: '',
            isValid: true,
            type: 'success'
          };
        }
        return {
          output: 'usage: git remote add <name> <url>\n',
          isValid: false,
          type: 'error'
        };
      }

      // git push
      if (gitCommand === 'push') {
        if (!repoInitialized) {
          return {
            output: 'fatal: not a git repository (or any of the parent directories): .git\n',
            isValid: false,
            type: 'error'
          };
        }
        if (remotes.length === 0) {
          return {
            output: 'fatal: No configured push destination.\nEither specify the URL from the command line or configure a remote repository using\n\n    git remote add <name> <url>\n\nand then push using the remote name\n\n    git push <name>\n',
            isValid: false,
            type: 'error'
          };
        }
        return {
          output: `Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (2/2), done.\nWriting objects: 100% (3/3), 1.2 KiB | 1.2 MiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0), pack-reused 0\nTo ${remotes[0]}\n * [new branch]      ${currentBranch} -> ${currentBranch}\nBranch '${currentBranch}' set up to track remote branch '${currentBranch}' from 'origin'.\n`,
          isValid: true,
          type: 'success'
        };
      }

      // git pull
      if (gitCommand === 'pull') {
        if (!repoInitialized) {
          return {
            output: 'fatal: not a git repository (or any of the parent directories): .git\n',
            isValid: false,
            type: 'error'
          };
        }
        if (remotes.length === 0) {
          return {
            output: 'There is no tracking information for the current branch.\nPlease specify which branch you want to merge with.\nSee git-pull(1) for details.\n\n    git pull <remote> <branch>\n\nIf you wish to set tracking information for this branch you can do so with:\n\n    git branch --set-upstream-to=<remote>/<branch> main\n',
            isValid: false,
            type: 'error'
          };
        }
        return {
          output: `From ${remotes[0]}\n * branch            ${currentBranch}     -> FETCH_HEAD\nAlready up to date.\n`,
          isValid: true,
          type: 'output'
        };
      }

      // git clone
      if (gitCommand === 'clone') {
        if (gitArgs.length === 0) {
          return {
            output: 'usage: git clone [<options>] [--] <repo> [<dir>]\n',
            isValid: false,
            type: 'error'
          };
        }
        return {
          output: `Cloning into 'repo'...\nremote: Enumerating objects: 3, done.\nremote: Counting objects: 100% (3/3), done.\nremote: Compressing objects: 100% (2/2), done.\nremote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0\nReceiving objects: 100% (3/3), done.\n`,
          isValid: true,
          type: 'success'
        };
      }

      // git config
      if (gitCommand === 'config') {
        if (gitArgs[0] === '--global' && gitArgs[1] === 'user.name' && gitArgs[2]) {
          return {
            output: '',
            isValid: true,
            type: 'success'
          };
        }
        if (gitArgs[0] === '--global' && gitArgs[1] === 'user.email' && gitArgs[2]) {
          return {
            output: '',
            isValid: true,
            type: 'success'
          };
        }
        return {
          output: 'usage: git config [<options>]\n',
          isValid: false,
          type: 'error'
        };
      }

      // git --version
      if (gitArgs[0] === '--version') {
        return {
          output: 'git version 2.39.2\n',
          isValid: true,
          type: 'output'
        };
      }

      // git help
      if (gitArgs[0] === 'help') {
        return {
          output: 'usage: git <command> [<args>]\n\nThese are common Git commands used in various situations:\n\nstart a working area (see also: git help tutorial)\n   clone     Clone a repository into a new directory\n   init      Create an empty Git repository or reinitialize an existing one\n\nwork on the current change (see also: git help everyday)\n   add       Add file contents to the index\n   mv        Move or rename a file, a directory, or a symlink\n   reset     Reset current HEAD to the specified state\n   rm        Remove files from the working tree and from the index\n\nexamine the history and state (see also: git help revisions)\n   log       Show commit logs\n   show      Show various types of objects\n   status    Show the working tree status\n\n',
          isValid: true,
          type: 'info'
        };
      }

      return {
        output: `git: '${gitArgs[0]}' is not a git command. See 'git --help'.\n\nThe most similar commands are\n        init\n        status\n        add\n        commit\n        log\n        branch\n        checkout\n        remote\n        push\n        pull\n        clone\n        config\n`,
        isValid: false,
        type: 'error'
      };
    }

    // Non-git commands
    if (baseCommand === 'help') {
      return {
        output: `Available commands:\n${commandSuggestions.map(cmd => `${cmd.command.padEnd(30)} ${cmd.description}`).join('\n')}\n\nTry typing any of these commands to see their simulated output!\n`,
        isValid: true,
        type: 'info'
      };
    }

    if (baseCommand === 'clear') {
      setCommandHistory([]);
      return {
        output: '',
        isValid: true,
        type: 'success'
      };
    }

    return {
      output: `bash: ${baseCommand}: command not found\nTry 'help' for available commands.\n`,
      isValid: false,
      type: 'error'
    };
  };

  const generateCommitHash = () => {
    return Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
  };

  const handleCommand = (command: string) => {
    if (!command.trim()) return;
    
    const response = getCommandResponse(command);
    
    const newOutput: TerminalOutput[] = [
      { 
        type: 'command', 
        content: `$ ${command}`, 
        timestamp: new Date(),
        isValid: response.isValid
      },
      { 
        type: response.type, 
        content: response.output, 
        timestamp: new Date(),
        isValid: response.isValid
      }
    ];
    
    setCommandHistory(prev => [...prev, ...newOutput]);
    setCurrentCommand('');
    setCommandIndex(0);
    setShowSuggestions(false);
  };

  const handleInputChange = (value: string) => {
    setCurrentCommand(value);
    
    if (value.trim()) {
      const filtered = commandSuggestions.filter(cmd => 
        cmd.command.toLowerCase().includes(value.toLowerCase()) ||
        cmd.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showSuggestions && filteredSuggestions.length > 0) {
        handleCommand(filteredSuggestions[suggestionIndex].command);
      } else {
        handleCommand(currentCommand);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        setCurrentCommand(filteredSuggestions[suggestionIndex].command);
        setShowSuggestions(false);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        setSuggestionIndex(prev => prev > 0 ? prev - 1 : filteredSuggestions.length - 1);
      } else {
        if (commandIndex < commandHistory.length / 2) {
          setCommandIndex(prev => prev + 1);
          const commands = commandHistory.filter(output => output.type === 'command');
          if (commands[commands.length - 1 - commandIndex]) {
            setCurrentCommand(commands[commands.length - 1 - commandIndex].content.substring(2));
          }
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        setSuggestionIndex(prev => prev < filteredSuggestions.length - 1 ? prev + 1 : 0);
      } else {
        if (commandIndex > 0) {
          setCommandIndex(prev => prev - 1);
          const commands = commandHistory.filter(output => output.type === 'command');
          if (commands[commands.length - 1 - commandIndex]) {
            setCurrentCommand(commands[commands.length - 1 - commandIndex].content.substring(2));
          } else {
            setCurrentCommand('');
          }
        }
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSuggestionIndex(0);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Note: We intentionally do not auto-focus the input on mount to avoid
  // scrolling the page down when this component renders far below the fold.
  // The input will receive focus naturally when the user clicks into it.

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-green-400" />
          <span className="text-gray-300 text-sm font-medium">Git Terminal Simulator</span>
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
        className="p-4 h-96 overflow-y-auto font-mono text-sm relative"
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
            <div className={`${
              output.type === 'command' 
                ? (output.isValid ? 'text-green-400' : 'text-red-400')
                : output.type === 'success' 
                ? 'text-green-300'
                : output.type === 'error' 
                ? 'text-red-300'
                : output.type === 'info'
                ? 'text-blue-300'
                : 'text-gray-300'
            }`}>
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
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-300 outline-none"
            placeholder="Type a Git command..."
          />
        </div>

        {/* Autocomplete Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute bottom-16 left-4 right-4 bg-gray-800 border border-gray-600 rounded-lg max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-700 ${
                  index === suggestionIndex ? 'bg-gray-700' : ''
                }`}
                onClick={() => {
                  setCurrentCommand(suggestion.command);
                  setShowSuggestions(false);
                }}
              >
                <div className="text-green-400 font-medium">{suggestion.command}</div>
                <div className="text-gray-400 text-xs">{suggestion.description}</div>
                <div className="text-gray-500 text-xs">{suggestion.category}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTerminal; 