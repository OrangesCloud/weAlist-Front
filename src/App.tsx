import React, { useState } from 'react';
import { Menu, User, ChevronDown, Plus, MoreVertical, X} from 'lucide-react';
// styles
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
// components
import UserProfileModal from './components/modals/UserProfileModal';
import TaskDetailModal from './components/modals/TaskDetailModal';
import { UserProfile } from './types';

// Types
interface Task {
  id: number;
  title: string;
  assignee: string;
  description?: string;
  dueDate?: string;
  priority?: string;
}

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

interface AuthPageProps {
  onLogin: () => void;
}


const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className={`min-h-screen ${theme.colors.background} flex items-center justify-center p-4 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      <div className={`${theme.colors.primary} ${theme.effects.borderRadius} p-2 w-full max-w-md relative z-10 shadow-2xl ${theme.effects.borderWidth} ${theme.colors.border}`}>
        <div className={`${theme.colors.secondary} ${theme.effects.cardBorderWidth} ${theme.colors.border} p-4 sm:p-6 ${theme.effects.borderRadius}`}>
          <h1 className={`${theme.font.size.xl} font-bold ${theme.colors.text} mb-2 text-center`} >
            weAlists
          </h1>
          <p className={`${theme.font.size.xs} ${theme.colors.text} mb-4 sm:mb-6 text-center`}>
            {isLogin ? 'INSERT ACCOUNT' : 'NEW ACCOUNT'}
          </p>

          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div className="relative">
              <input
                type="email"
                placeholder="EMAIL"
                className={`relative w-full px-3 sm:px-4 py-2 sm:py-3 ${theme.effects.cardBorderWidth} ${theme.colors.border} ${theme.colors.secondary} ${theme.font.size.sm} ${theme.effects.borderRadius} focus:outline-none focus:ring-4 focus:ring-orange-400`}
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="PASSWORD"
                className={`relative w-full px-3 sm:px-4 py-2 sm:py-3 ${theme.effects.cardBorderWidth} ${theme.colors.border} ${theme.colors.secondary} ${theme.font.size.sm} ${theme.effects.borderRadius} focus:outline-none focus:ring-4 focus:ring-orange-400`}
              />
            </div>
            <div className="relative">
              <button
                onClick={onLogin}
                className={`relative w-full ${theme.colors.primary} text-white py-3 sm:py-4 ${theme.effects.cardBorderWidth} ${theme.colors.border} font-bold ${theme.colors.primaryHover} transition ${theme.font.size.sm} ${theme.effects.borderRadius}`}
              >
                {isLogin ? 'LOG IN' : 'CREATE ACCOUNT'}
              </button>
            </div>
          </div>

          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t-2 sm:border-t-4 border-gray-200`}></div>
            </div>
            <div className={`relative flex justify-center ${theme.font.size.xs}`}>
              <span className={`px-2 ${theme.colors.secondary} ${theme.colors.text} ${theme.effects.cardBorderWidth} ${theme.colors.border} ${theme.effects.borderRadius}`}>OR</span>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="relative">
              <button
                onClick={onLogin}
                className={`relative w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 ${theme.effects.cardBorderWidth} ${theme.colors.border} ${theme.colors.secondary} hover:bg-gray-50 transition ${theme.effects.borderRadius}`}
              >
                <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-red-500 border-2 ${theme.colors.border} flex-shrink-0`}></div>
                <span className={`font-bold ${theme.font.size.xs}`}>GOOGLE</span>
              </button>
            </div>

            <div className="relative">
              <button
                onClick={onLogin}
                className={`relative w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 ${theme.effects.cardBorderWidth} ${theme.colors.border} ${theme.colors.secondary} hover:bg-gray-50 transition ${theme.effects.borderRadius}`}
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-800 border-2 border-black flex-shrink-0"></div>
                <span className={`font-bold ${theme.font.size.xs}`}>GITHUB</span>
              </button>
            </div>

            <div className="relative">
              <button
                onClick={onLogin}
                className={`relative w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 ${theme.effects.cardBorderWidth} ${theme.colors.border} bg-yellow-400 hover:bg-yellow-500 transition ${theme.effects.borderRadius}`}
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 border-2 border-black flex-shrink-0"></div>
                <span className={`font-bold ${theme.font.size.xs}`}>KAKAO</span>
              </button>
            </div>
          </div>

          <p className={`mt-4 sm:mt-6 text-center ${theme.font.size.xs}`}>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className={`text-blue-600 hover:text-blue-700 underline`}
            >
              {isLogin ? 'CREATE ACCOUNT?' : 'CONTINUE?'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};


const MainDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('workspace1');
  const [selectedProject, setSelectedProject] = useState<string>('WEB QUEST');
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const userProfile: UserProfile = {
    name: 'ACCOUNT1',
    email: 'ACCOUNT1@example.com',
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

  const workspaces: string[] = ['workspace1', 'workspace2', 'workspace3'];
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
    <div className={`min-h-screen ${theme.colors.background}`}>
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      <header className={`${theme.colors.primary} ${theme.effects.borderWidth} ${theme.colors.border} border-t-0 border-l-0 border-r-0 px-3 sm:px-6 py-2 sm:py-4 relative z-20`} style={{ boxShadow: theme.effects.headerShadow }}>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
                className={`relative flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 ${theme.colors.secondary} ${theme.effects.cardBorderWidth} ${theme.colors.border} hover:bg-gray-100 transition ${theme.font.size.xs} ${theme.effects.borderRadius}`}
              >
                <Menu className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                <span className="hidden lg:inline">{selectedWorkspace}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
              </button>
              {showWorkspaceMenu && (
                <div className={`absolute top-full left-0 mt-2 w-48 sm:w-64 ${theme.colors.card} ${theme.effects.cardBorderWidth} ${theme.colors.border} z-50 ${theme.effects.borderRadius}`} style={{ boxShadow: theme.effects.shadow }}>
                  {workspaces.map((workspace) => (
                    <button
                      key={workspace}
                      onClick={() => {
                        setSelectedWorkspace(workspace);
                        setShowWorkspaceMenu(false);
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-orange-100 transition ${theme.effects.cardBorderWidth} ${theme.colors.border} border-t-0 border-l-0 border-r-0 last:border-b-0 ${theme.font.size.xs}`}
                    >
                      {workspace}
                    </button>
                  ))}
                  <div className={`${theme.effects.cardBorderWidth} ${theme.colors.border} border-b-0 border-l-0 border-r-0`}></div>
                  <button className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left ${theme.colors.primary} text-white ${theme.colors.primaryHover} transition flex items-center gap-2 ${theme.font.size.xs} ${theme.effects.borderRadius} ${theme.effects.borderRadius.includes('rounded-lg') ? 'rounded-t-none' : ''}`}>
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                    NEW WORLD
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`md:hidden relative ${theme.colors.secondary} ${theme.effects.cardBorderWidth} ${theme.colors.border} p-2 ${theme.effects.borderRadius}`}
            >
              <Menu className="w-5 h-5" style={{ strokeWidth: 3 }} />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 ${theme.colors.secondary} ${theme.effects.cardBorderWidth} ${theme.colors.border} hover:bg-gray-100 transition ${theme.font.size.xs} ${theme.effects.borderRadius}`}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" style={{ strokeWidth: 3 }} />
              <span className="hidden sm:inline">계정1</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
            </button>
            {showUserMenu && (
              <div className={`absolute top-full right-0 mt-2 w-48 sm:w-56 ${theme.colors.card} ${theme.effects.cardBorderWidth} ${theme.colors.border} z-50 ${theme.effects.borderRadius}`} style={{ boxShadow: theme.effects.shadow }}>
                <div className={`px-3 sm:px-4 py-2 sm:py-3 ${theme.effects.cardBorderWidth} ${theme.colors.border} border-t-0 border-l-0 border-r-0 ${theme.colors.primary} text-white`}>
                  <p className={`font-bold ${theme.font.size.xs}`}>계정1</p>
                </div>
                <button 
                  onClick={() => {
                    setShowUserProfile(true);
                    setShowUserMenu(false);
                  }}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-orange-100 transition ${theme.effects.cardBorderWidth} ${theme.colors.border} border-t-0 border-l-0 border-r-0 ${theme.font.size.xs}`}
                >
                  PROFILE
                </button>
                <div className={`${theme.effects.cardBorderWidth} ${theme.colors.border} border-b-0 border-l-0 border-r-0`}></div>
                <button className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left bg-red-500 hover:bg-red-600 transition text-white ${theme.font.size.xs} ${theme.effects.borderRadius} ${theme.effects.borderRadius.includes('rounded-lg') ? 'rounded-t-none' : ''}`}>
                  LOG OUT
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowMobileMenu(false)}>
          <div className={`${theme.colors.card} ${theme.effects.borderWidth} ${theme.colors.border} w-64 h-full p-4`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`${theme.font.size.xs} font-bold`}>MENU</h2>
              <button onClick={() => setShowMobileMenu(false)} className={`bg-red-500 ${theme.effects.cardBorderWidth} ${theme.colors.border} p-1`}>
                <X className="w-4 h-4 text-white" style={{ strokeWidth: 3 }} />
              </button>
            </div>
            <div className="space-y-2">
              <p className={`text-[8px] ${theme.colors.textSecondary} mb-2`}>WORKSPACES:</p>
              {workspaces.map((workspace) => (
                <button
                  key={workspace}
                  onClick={() => {
                    setSelectedWorkspace(workspace);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left ${theme.effects.cardBorderWidth} ${theme.colors.border} text-[8px] ${theme.effects.borderRadius} ${
                    selectedWorkspace === workspace ? `${theme.colors.primary} text-white` : `${theme.colors.secondary} hover:bg-gray-100`
                  }`}
                >
                  {workspace}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`${theme.colors.card} ${theme.effects.borderWidth} ${theme.colors.border} border-t-0 border-l-0 border-r-0 px-3 sm:px-6 py-2 sm:py-3 overflow-x-auto`}>
        <div className="flex items-center gap-2 sm:gap-4 min-w-max">
          <span className={`${theme.font.size.xs} ${theme.colors.text} font-bold`}>PROJECT:</span>
          <div className="flex gap-2 flex-nowrap">
            {projects.map((project, idx) => (
              <div key={project} className="relative flex-shrink-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className={`relative px-2 sm:px-4 py-1 sm:py-2 ${theme.effects.cardBorderWidth} ${theme.colors.border} transition ${theme.font.size.xs} ${theme.effects.borderRadius} whitespace-nowrap ${
                    selectedProject === project
                      ? `${theme.colors.primary} text-white`
                      : `${theme.colors.secondary} ${theme.colors.text} hover:bg-gray-100`
                  }`}
                >
                  {idx + 1}-{project}
                </button>
              </div>
            ))}
            {/* <div className="relative flex-shrink-0">
              {theme.name === 'retro' && <div className="absolute top-1 left-1 w-full h-full bg-orange-700"></div>}
              <button className={`relative px-2 sm:px-4 py-1 sm:py-2 ${theme.colors.primary} text-white ${theme.effects.cardBorderWidth} ${theme.colors.border} ${theme.colors.primaryHover} transition flex items-center gap-1 sm:gap-2 ${theme.font.size.xs} ${theme.effects.borderRadius} ${theme.name === 'retro' ? 'active:top-1 active:left-1' : ''}`}>
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                NEW
              </button>
            </div> */}
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
              <div className={`relative ${theme.effects.cardBorderWidth} ${theme.colors.border} p-3 sm:p-4 ${theme.colors.card} ${theme.effects.borderRadius}`}>
                <div className={`flex items-center justify-between mb-3 sm:mb-4 pb-2 ${theme.effects.cardBorderWidth} ${theme.colors.border} border-t-0 border-l-0 border-r-0`}>
                  <h3 className={`font-bold ${theme.colors.text} flex items-center gap-2 ${theme.font.size.xs}`}>
                    <span className={`w-3 h-3 sm:w-4 sm:h-4 ${columnColors[idx]} ${theme.effects.cardBorderWidth} ${theme.colors.border}`}></span>
                    {column.title}
                    <span className={`bg-black text-white px-1 sm:px-2 py-1 ${theme.effects.cardBorderWidth} ${theme.colors.border} text-[8px] sm:text-xs`}>
                      {column.tasks.length}
                    </span>
                  </h3>
                  <button className={`${theme.colors.text} ${theme.colors.primaryHover}`}>
                    <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                  </button>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {column.tasks.map((task) => (
                    <div key={task.id} className="relative">
                      <div
                        draggable
                        onDragStart={() => handleDragStart(task, column.id)}
                        onClick={() => setSelectedTask(task)}
                        className={`relative ${theme.colors.card} p-3 sm:p-4 ${theme.effects.cardBorderWidth} ${theme.colors.border} hover:border-orange-500 transition cursor-pointer ${theme.effects.borderRadius}`}
                      >
                        <h4 className={`font-bold ${theme.colors.text} mb-2 sm:mb-3 ${theme.font.size.xs} break-words`}>{task.title}</h4>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 ${theme.colors.primary} ${theme.effects.cardBorderWidth} ${theme.colors.border} flex items-center justify-center text-white font-bold text-[8px] sm:text-xs flex-shrink-0 ${theme.effects.borderRadius}`}>
                            {task.assignee[0]}
                          </div>
                          <span className={`${theme.font.size.xs} truncate ${theme.colors.text}`}>{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="relative">
                    <button className={`relative w-full py-3 sm:py-4 ${theme.effects.cardBorderWidth} border-dashed ${theme.colors.border} ${theme.colors.card} hover:bg-orange-50 transition flex items-center justify-center gap-2 ${theme.font.size.xs} ${theme.effects.borderRadius} `}>
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 3 }} />
                      ADD TASK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full lg:w-80 lg:flex-shrink-0 relative">
            <button className={`relative w-full h-24 sm:h-32 ${theme.effects.cardBorderWidth} border-dashed ${theme.colors.border} ${theme.colors.card} hover:bg-orange-50 transition flex items-center justify-center gap-2 ${theme.font.size.xs} ${theme.effects.borderRadius}`}>
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
    <ThemeProvider>
      <div>
        {!isLoggedIn ? (
          <AuthPage onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <MainDashboard />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;