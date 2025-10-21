import React, { useState } from 'react';
import { Menu, User, ChevronDown, Plus, MoreVertical, X, Calendar, Tag, MessageSquare, Send } from 'lucide-react';


import { ThemeProvider } from './contexts/ThemeContext';
import ThemeSelector from './components/common/ThemeSelector';

// Types
interface Task {
  id: number;
  title: string;
  assignee: string;
  description?: string;
  dueDate?: string;
  priority?: string;
}

interface TaskComment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

interface AuthPageProps {
  onLogin: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  level: number;
  avatar: string;
}

const pixelFontStyle = {
  fontFamily: "'Press Start 2P', cursive",
  imageRendering: 'pixelated' as const,
};

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      <div className="bg-orange-500 rounded-none p-2 w-full max-w-md relative z-10 shadow-2xl border-4 sm:border-8 border-black" style={{ boxShadow: '0 8px 0 #000' }}>
        <div className="bg-white border-2 sm:border-4 border-black p-4 sm:p-6">
          <h1 className="text-lg sm:text-2xl font-bold text-orange-600 mb-2 text-center" style={{ textShadow: '3px 3px 0 #000' }}>
            weAlists
          </h1>
          <p className="text-[8px] sm:text-xs text-gray-800 mb-4 sm:mb-6 text-center" >
            {isLogin ? 'INSERT ACCOUNT' : 'NEW PLAYER'}
          </p>

          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute -top-1 -left-1 w-full h-full bg-black"></div>
              <input
                type="email"
                placeholder="EMAIL"
                className="relative w-full px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black bg-white text-[8px] sm:text-sm focus:outline-none focus:ring-4 focus:ring-orange-400"
                
              />
            </div>
            <div className="relative">
              <div className="absolute -top-1 -left-1 w-full h-full bg-black"></div>
              <input
                type="password"
                placeholder="PASSWORD"
                className="relative w-full px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black bg-white text-[8px] sm:text-sm focus:outline-none focus:ring-4 focus:ring-orange-400"
                
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 w-full h-full bg-orange-700"></div>
              <button
                onClick={onLogin}
                className="relative w-full bg-orange-500 text-white py-3 sm:py-4 border-2 sm:border-4 border-black font-bold hover:bg-orange-600 transition text-[10px] sm:text-sm active:top-1 active:left-1"
                
              >
                {isLogin ? 'LOG IN' : 'CREATE HERO'}
              </button>
            </div>
          </div>

          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 sm:border-t-4 border-dashed border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-[8px] sm:text-xs">
              <span className="px-2 bg-white text-gray-800 border-2 sm:border-4 border-gray-300" >OR</span>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="relative">
              <div className="absolute top-1 left-1 w-full h-full bg-gray-300"></div>
              <button
                onClick={onLogin}
                className="relative w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black bg-white hover:bg-gray-50 transition active:top-1 active:left-1"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 border-2 border-black flex-shrink-0"></div>
                <span className="font-bold text-[8px] sm:text-xs" >GOOGLE</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute top-1 left-1 w-full h-full bg-gray-300"></div>
              <button
                onClick={onLogin}
                className="relative w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black bg-white hover:bg-gray-50 transition active:top-1 active:left-1"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-800 border-2 border-black flex-shrink-0"></div>
                <span className="font-bold text-[8px] sm:text-xs" >GITHUB</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute top-1 left-1 w-full h-full bg-yellow-600"></div>
              <button
                onClick={onLogin}
                className="relative w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-2 sm:border-4 border-black bg-yellow-400 hover:bg-yellow-500 transition active:top-1 active:left-1"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 border-2 border-black flex-shrink-0"></div>
                <span className="font-bold text-[8px] sm:text-xs" >KAKAO</span>
              </button>
            </div>
          </div>

          <p className="mt-4 sm:mt-6 text-center text-[8px] sm:text-xs" >
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-600 hover:text-orange-700 underline"
            >
              {isLogin ? 'CREATE ACCOUNT?' : 'CONTINUE?'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const UserProfileModal: React.FC<{ user: UserProfile; onClose: () => void }> = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-2 left-2 w-full h-full bg-black"></div>
        <div className="relative bg-white border-4 border-black p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-black">
            <h2 className="text-sm sm:text-base font-bold" >PLAYER INFO</h2>
            <button onClick={onClose} className="bg-red-500 border-2 border-black p-2 hover:bg-red-600">
              <X className="w-4 h-4 text-white" style={{ strokeWidth: 3 }} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-orange-500 border-4 border-black flex items-center justify-center text-white text-3xl font-bold" >
                {user.name[0]}
              </div>
            </div>

            <div>
              <label className="block text-[8px] sm:text-xs mb-2 text-gray-600" >NAME:</label>
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-full h-full bg-black"></div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="relative w-full px-3 py-2 border-2 border-black bg-white text-xs"
                  
                />
              </div>
            </div>

            <div>
              <label className="block text-[8px] sm:text-xs mb-2 text-gray-600" >EMAIL:</label>
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-full h-full bg-black"></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative w-full px-3 py-2 border-2 border-black bg-white text-xs"
                  
                />
              </div>
            </div>

            <div>
              <label className="block text-[8px] sm:text-xs mb-2 text-gray-600" >LEVEL:</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 border-2 border-black h-6">
                  <div className="bg-orange-500 h-full border-r-2 border-black" style={{ width: `${user.level}%` }}></div>
                </div>
                <span className="text-xs font-bold" >{user.level}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <div className="relative flex-1">
                <div className="absolute top-1 left-1 w-full h-full bg-orange-700"></div>
                <button className="relative w-full bg-orange-500 text-white py-3 border-2 border-black hover:bg-orange-600 transition text-xs active:top-1 active:left-1" >
                  SAVE
                </button>
              </div>
              <div className="relative flex-1">
                <div className="absolute top-1 left-1 w-full h-full bg-gray-400"></div>
                <button onClick={onClose} className="relative w-full bg-gray-300 py-3 border-2 border-black hover:bg-gray-400 transition text-xs active:top-1 active:left-1" >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskDetailModal: React.FC<{ task: Task; onClose: () => void }> = ({ task, onClose }) => {
  const [comments, setComments] = useState<TaskComment[]>([
    { id: 1, author: 'KIM', content: 'Looking good!', timestamp: '2h ago' },
    { id: 2, author: 'LEE', content: 'Need more details', timestamp: '1h ago' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, {
        id: comments.length + 1,
        author: 'PLAYER1',
        content: newComment,
        timestamp: 'Just now'
      }]);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={onClose}>
      <div className="relative w-full max-w-2xl my-8" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-2 left-2 w-full h-full bg-black"></div>
        <div className="relative bg-white border-4 border-black p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-start justify-between mb-4 pb-4 border-b-4 border-black">
            <div className="flex-1 pr-4">
              <h2 className="text-xs sm:text-base font-bold mb-2 break-words" >{task.title}</h2>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 bg-orange-500 border-2 border-black flex items-center justify-center text-white text-xs font-bold" >
                  {task.assignee[0]}
                </div>
                <span className="text-[8px] sm:text-xs" >{task.assignee}</span>
              </div>
            </div>
            <button onClick={onClose} className="bg-red-500 border-2 border-black p-2 hover:bg-red-600 flex-shrink-0">
              <X className="w-4 h-4 text-white" style={{ strokeWidth: 3 }} />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-[8px] sm:text-xs mb-2 text-gray-600" >
                <Calendar className="w-4 h-4" />
                DUE DATE:
              </label>
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-full h-full bg-black"></div>
                <div className="relative px-3 py-2 border-2 border-black bg-gray-50 text-xs" >
                  2025-10-25
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-[8px] sm:text-xs mb-2 text-gray-600" >
                <Tag className="w-4 h-4" />
                PRIORITY:
              </label>
              <div className="relative inline-block">
                <div className="absolute top-1 left-1 w-full h-full bg-red-700"></div>
                <div className="relative px-3 py-2 border-2 border-black bg-red-500 text-white text-xs" >
                  HIGH
                </div>
              </div>
            </div>

            <div>
              <label className="text-[8px] sm:text-xs mb-2 text-gray-600 block" >
                DESCRIPTION:
              </label>
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-full h-full bg-black"></div>
                <textarea
                  className="relative w-full px-3 py-2 border-2 border-black bg-gray-50 text-xs min-h-24"
                  
                  defaultValue="This is a detailed description of the task."
                />
              </div>
            </div>
          </div>

          <div className="border-t-4 border-black pt-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4" style={{ strokeWidth: 3 }} />
              <h3 className="text-[8px] sm:text-xs font-bold" >
                COMMENTS ({comments.length})
              </h3>
            </div>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="relative">
                  <div className="absolute top-1 left-1 w-full h-full bg-gray-300"></div>
                  <div className="relative bg-white border-2 border-black p-3">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-orange-500 border-2 border-black flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0" >
                        {comment.author[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[8px] font-bold" >{comment.author}</span>
                          <span className="text-[8px] text-gray-500" >{comment.timestamp}</span>
                        </div>
                        <p className="text-[8px] sm:text-xs break-words" >{comment.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute top-1 left-1 w-full h-full bg-black"></div>
              <div className="relative border-2 border-black bg-white p-2 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="ADD COMMENT..."
                  className="flex-1 px-2 py-1 border-2 border-black text-[8px] sm:text-xs"
                  
                />
                <button
                  onClick={handleAddComment}
                  className="bg-orange-500 text-white px-3 py-1 border-2 border-black hover:bg-orange-600 transition flex items-center gap-1"
                >
                  <Send className="w-3 h-3" style={{ strokeWidth: 3 }} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 pt-4 border-t-4 border-black">
            <div className="relative flex-1">
              <div className="absolute top-1 left-1 w-full h-full bg-orange-700"></div>
              <button className="relative w-full bg-orange-500 text-white py-3 border-2 border-black hover:bg-orange-600 transition text-xs active:top-1 active:left-1" >
                SAVE
              </button>
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 w-full h-full bg-red-700"></div>
              <button className="relative bg-red-500 text-white px-4 py-3 border-2 border-black hover:bg-red-600 transition text-xs active:top-1 active:left-1" >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainDashboard: React.FC = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('DEV WORLD');
  const [selectedProject, setSelectedProject] = useState<string>('WEB QUEST');
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const userProfile: UserProfile = {
    name: 'PLAYER1',
    email: 'player1@example.com',
    level: 99,
    avatar: 'P'
  };

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 1,
      title: 'TODO ZONE',
      tasks: [
        { id: 1, title: 'UI DESIGN', assignee: 'KIM' },
        { id: 2, title: 'API DOCS', assignee: 'PARK' }
      ]
    },
    {
      id: 2,
      title: 'BATTLE MODE',
      tasks: [
        { id: 3, title: 'LOGIN FUNC', assignee: 'LEE' },
        { id: 4, title: 'DB SETUP', assignee: 'CHOI' }
      ]
    },
    {
      id: 3,
      title: 'REVIEW STAGE',
      tasks: [
        { id: 5, title: 'CODE CHECK', assignee: 'JUNG' }
      ]
    },
    {
      id: 4,
      title: 'VICTORY!',
      tasks: [
        { id: 6, title: 'PROJECT INIT', assignee: 'KIM' },
        { id: 7, title: 'REQUIREMENTS', assignee: 'PARK' }
      ]
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<number | null>(null);

  const workspaces: string[] = ['DEV WORLD', 'DESIGN LAND', 'MARKET ZONE'];
  const projects: string[] = ['WEB QUEST', 'MOBILE SAGA', 'NEW FEATURE'];

  const columnColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];

  const handleDragStart = (task: Task, columnId: number): void => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: number): void => {
    if (!draggedTask || !draggedFromColumn) return;

    const newColumns = columns.map(col => {
      if (col.id === draggedFromColumn) {
        return {
          ...col,
          tasks: col.tasks.filter(t => t.id !== draggedTask.id)
        };
      }
      if (col.id === targetColumnId) {
        return {
          ...col,
          tasks: [...col.tasks, draggedTask]
        };
      }
      return col;
    });

    setColumns(newColumns);
    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      <header className="bg-orange-500 border-b-4 sm:border-b-8 border-black px-3 sm:px-6 py-2 sm:py-4 relative z-20" style={{ boxShadow: '0 4px 0 #000' }}>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-white border-2 sm:border-4 border-black px-2 sm:px-4 py-1 sm:py-2" style={{ boxShadow: '2px 2px 0 #000, 4px 4px 0 #000' }}>
              <h1 className="text-sm sm:text-xl font-bold text-orange-600" style={{ ...pixelFontStyle, textShadow: '2px 2px 0 #000' }}>
                KANBAN
              </h1>
            </div>
             <ThemeSelector />
            <div className="relative hidden md:block">
              <div className="absolute top-1 left-1 w-full h-full bg-black"></div>
              <button
                onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
                className="relative flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-white border-2 sm:border-4 border-black hover:bg-gray-100 transition text-[8px] sm:text-xs active:top-1 active:left-1"
                
              >
                <Menu className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                <span className="hidden lg:inline">{selectedWorkspace}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
              </button>
              {showWorkspaceMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 sm:w-64 bg-white border-2 sm:border-4 border-black z-50" style={{ boxShadow: '4px 4px 0 #000' }}>
                  {workspaces.map((workspace) => (
                    <button
                      key={workspace}
                      onClick={() => {
                        setSelectedWorkspace(workspace);
                        setShowWorkspaceMenu(false);
                      }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-orange-100 transition border-b-2 border-gray-200 last:border-b-0 text-[8px] sm:text-xs"
                      
                    >
                      {workspace}
                    </button>
                  ))}
                  <div className="border-t-2 sm:border-t-4 border-black"></div>
                  <button className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left bg-orange-500 text-white hover:bg-orange-600 transition flex items-center gap-2 text-[8px] sm:text-xs" >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                    NEW WORLD
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden relative bg-white border-2 border-black p-2"
            >
              <Menu className="w-5 h-5" style={{ strokeWidth: 3 }} />
            </button>
          </div>

          <div className="relative">
            <div className="absolute top-1 left-1 w-full h-full bg-black"></div>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-white border-2 sm:border-4 border-black hover:bg-gray-100 transition text-[8px] sm:text-xs active:top-1 active:left-1"
              
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" style={{ strokeWidth: 3 }} />
              <span className="hidden sm:inline">PLAYER1</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
            </button>
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 sm:w-56 bg-white border-2 sm:border-4 border-black z-50" style={{ boxShadow: '4px 4px 0 #000' }}>
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-b-2 sm:border-b-4 border-black bg-orange-500 text-white">
                  <p className="font-bold text-[8px] sm:text-xs" >PLAYER1</p>
                  <p className="text-[8px] sm:text-xs mt-1" >LV.99</p>
                </div>
                <button 
                  onClick={() => {
                    setShowUserProfile(true);
                    setShowUserMenu(false);
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-orange-100 transition border-b-2 border-gray-200 text-[8px] sm:text-xs" 
                  
                >
                  PROFILE
                </button>
                <div className="border-t-2 sm:border-t-4 border-black"></div>
                <button className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left bg-red-500 hover:bg-red-600 transition text-white text-[8px] sm:text-xs" >
                  LOG OUT
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowMobileMenu(false)}>
          <div className="bg-white border-4 border-black w-64 h-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold" >MENU</h2>
              <button onClick={() => setShowMobileMenu(false)} className="bg-red-500 border-2 border-black p-1">
                <X className="w-4 h-4 text-white" style={{ strokeWidth: 3 }} />
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-[8px] text-gray-600 mb-2" >WORKSPACES:</p>
              {workspaces.map((workspace) => (
                <button
                  key={workspace}
                  onClick={() => {
                    setSelectedWorkspace(workspace);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left border-2 border-black text-[8px] ${
                    selectedWorkspace === workspace ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-100'
                  }`}
                  
                >
                  {workspace}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b-2 sm:border-b-4 border-black px-3 sm:px-6 py-2 sm:py-3 overflow-x-auto">
        <div className="flex items-center gap-2 sm:gap-4 min-w-max">
          <span className="text-[8px] sm:text-xs text-gray-800 font-bold" >PROJECT:</span>
          <div className="flex gap-2 flex-nowrap">
            {projects.map((project, idx) => (
              <div key={project} className="relative flex-shrink-0">
                <div className="absolute top-1 left-1 w-full h-full bg-black"></div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className={`relative px-2 sm:px-4 py-1 sm:py-2 border-2 sm:border-4 border-black transition text-[8px] sm:text-xs active:top-1 active:left-1 whitespace-nowrap ${
                    selectedProject === project
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                  
                >
                  {idx + 1}-{project}
                </button>
              </div>
            ))}
            <div className="relative flex-shrink-0">
              <div className="absolute top-1 left-1 w-full h-full bg-orange-700"></div>
              <button className="relative px-2 sm:px-4 py-1 sm:py-2 bg-orange-500 text-white border-2 sm:border-4 border-black hover:bg-orange-600 transition flex items-center gap-1 sm:gap-2 text-[8px] sm:text-xs active:top-1 active:left-1" >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                NEW
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:overflow-x-auto pb-4">
          {columns.map((column, idx) => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              className="w-full lg:w-80 lg:flex-shrink-0 relative"
            >
              <div className="absolute top-1 left-1 w-full h-full bg-black"></div>
              <div className="relative border-2 sm:border-4 border-black p-3 sm:p-4 bg-white">
                <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 border-b-2 sm:border-b-4 border-black">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 text-[8px] sm:text-xs" >
                    <span className={`w-3 h-3 sm:w-4 sm:h-4 ${columnColors[idx]} border-2 border-black`}></span>
                    {column.title}
                    <span className="bg-black text-white px-1 sm:px-2 py-1 border-2 border-black text-[8px] sm:text-xs">
                      {column.tasks.length}
                    </span>
                  </h3>
                  <button className="text-gray-800 hover:text-orange-600">
                    <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                  </button>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {column.tasks.map((task) => (
                    <div key={task.id} className="relative">
                      <div className="absolute top-1 left-1 w-full h-full bg-gray-300"></div>
                      <div
                        draggable
                        onDragStart={() => handleDragStart(task, column.id)}
                        onClick={() => setSelectedTask(task)}
                        className="relative bg-white p-3 sm:p-4 border-2 sm:border-4 border-black hover:border-orange-500 transition cursor-pointer active:top-1 active:left-1"
                      >
                        <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-[8px] sm:text-xs break-words" >{task.title}</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 border-2 border-black flex items-center justify-center text-white font-bold text-[8px] sm:text-xs flex-shrink-0" >
                            {task.assignee[0]}
                          </div>
                          <span className="text-[8px] sm:text-xs truncate text-gray-800" >{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="relative">
                    <div className="absolute top-1 left-1 w-full h-full bg-gray-300"></div>
                    <button className="relative w-full py-3 sm:py-4 border-2 sm:border-4 border-dashed border-black bg-white hover:bg-orange-50 transition flex items-center justify-center gap-2 text-[8px] sm:text-xs active:top-1 active:left-1" >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                      ADD TASK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full lg:w-80 lg:flex-shrink-0 relative">
            <div className="absolute top-1 left-1 w-full h-full bg-gray-300"></div>
            <button className="relative w-full h-24 sm:h-32 border-2 sm:border-4 border-dashed border-black bg-white hover:bg-orange-50 transition flex items-center justify-center gap-2 text-[8px] sm:text-xs active:top-1 active:left-1" >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" style={{ strokeWidth: 3 }} />
              NEW TICKET
            </button>
          </div>
        </div>
      </div>

      {showUserProfile && <UserProfileModal user={userProfile} onClose={() => setShowUserProfile(false)} />}
      {selectedTask && <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
    <ThemeProvider>
      <div>
        {!isLoggedIn ? (
          <AuthPage onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <MainDashboard />
        )}
      </div>
      </ThemeProvider>
    </>
  );
};

export default App;