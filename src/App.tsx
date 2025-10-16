import React, { useState } from 'react';
import { Menu, User, ChevronDown, Plus, MoreVertical } from 'lucide-react';

// Types
interface Task {
  id: number;
  title: string;
  assignee: string;
}

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

interface AuthPageProps {
  onLogin: () => void;
}

// 로그인/회원가입 페이지
const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          칸반 프로젝트
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          {isLogin ? '로그인하여 시작하세요' : '새 계정을 만들어보세요'}
        </p>

        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="이메일"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={onLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? '로그인' : '회원가입'}
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-700">Google로 계속하기</span>
          </button>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" fill="#181717" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="font-medium text-gray-700">GitHub로 계속하기</span>
          </button>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#FEE500" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
              <path fill="#3C1E1E" d="M10.5 14.5h-3c-.276 0-.5-.224-.5-.5v-4c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v4c0 .276-.224.5-.5.5zm6.5 0h-3c-.276 0-.5-.224-.5-.5v-4c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v4c0 .276-.224.5-.5.5zm-1.5-7.5h-7c-.276 0-.5.224-.5.5v.5c0 .276.224.5.5.5h7c.276 0 .5-.224.5-.5V7.5c0-.276-.224-.5-.5-.5z"/>
            </svg>
            <span className="font-medium text-gray-700">카카오톡으로 계속하기</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            {isLogin ? '회원가입' : '로그인'}
          </button>
        </p>
      </div>
    </div>
  );
};

// 메인 대시보드
const MainDashboard: React.FC = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('개발팀 워크스페이스');
  const [selectedProject, setSelectedProject] = useState<string>('웹 앱 리뉴얼');
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState<boolean>(false);

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 1,
      title: 'To Do',
      tasks: [
        { id: 1, title: 'UI 디자인 검토', assignee: '김철수' },
        { id: 2, title: 'API 문서 작성', assignee: '박영희' }
      ]
    },
    {
      id: 2,
      title: 'In Progress',
      tasks: [
        { id: 3, title: '로그인 기능 개발', assignee: '이민수' },
        { id: 4, title: '데이터베이스 설계', assignee: '최지원' }
      ]
    },
    {
      id: 3,
      title: 'Review',
      tasks: [
        { id: 5, title: '코드 리뷰 요청', assignee: '정다은' }
      ]
    },
    {
      id: 4,
      title: 'Done',
      tasks: [
        { id: 6, title: '프로젝트 초기 설정', assignee: '김철수' },
        { id: 7, title: '요구사항 정리', assignee: '박영희' }
      ]
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<number | null>(null);

  const workspaces: string[] = ['개발팀 워크스페이스', '디자인팀 워크스페이스', '마케팅팀 워크스페이스'];
  const projects: string[] = ['웹 앱 리뉴얼', '모바일 앱 개발', '신규 기능 추가'];

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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 좌측: 워크스페이스 선택 */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">칸반</h1>
            <div className="relative">
              <button
                onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <Menu className="w-4 h-4" />
                <span className="font-medium">{selectedWorkspace}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showWorkspaceMenu && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  {workspaces.map((workspace) => (
                    <button
                      key={workspace}
                      onClick={() => {
                        setSelectedWorkspace(workspace);
                        setShowWorkspaceMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition"
                    >
                      {workspace}
                    </button>
                  ))}
                  <div className="border-t border-gray-200 my-2"></div>
                  <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-gray-50 transition flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    새 워크스페이스 만들기
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 우측: 사용자 메뉴 */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">홍길동</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="font-semibold">홍길동</p>
                  <p className="text-sm text-gray-600">hong@example.com</p>
                </div>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition">
                  프로필 설정
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition">
                  팀 관리
                </button>
                <div className="border-t border-gray-200 my-2"></div>
                <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 transition">
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 프로젝트 선택 바 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">프로젝트:</span>
          <div className="flex gap-2">
            {projects.map((project) => (
              <button
                key={project}
                onClick={() => setSelectedProject(project)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedProject === project
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {project}
              </button>
            ))}
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
              <Plus className="w-4 h-4" />
              새 프로젝트
            </button>
          </div>
        </div>
      </div>

      {/* 칸반 보드 */}
      <div className="p-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  {column.title}
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    {column.tasks.length}
                  </span>
                </h3>
                <button className="text-gray-600 hover:text-gray-800">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-move"
                  >
                    <h4 className="font-medium text-gray-800 mb-2">{task.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          {task.assignee[0]}
                        </div>
                        <span className="text-sm text-gray-600">{task.assignee}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  카드 추가
                </button>
              </div>
            </div>
          ))}
          <button className="flex-shrink-0 w-80 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            새 컬럼 추가
          </button>
        </div>
      </div>
    </div>
  );
};

// 메인 앱
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div>
      {!isLoggedIn ? (
        <AuthPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <MainDashboard />
      )}
    </div>
  );
};

export default App;