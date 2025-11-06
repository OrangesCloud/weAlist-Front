import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronDown, Plus, 
// MoreVertical,
X, Home, Bell, MessageSquare, Briefcase, Settings, File, } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import UserProfileModal from '../components/modals/UserProfileModal';
import { ProjectManageModal } from '../components/modals/ProjectManageModal';
import KanbanDetailModal from '../components/modals/KanbanDetailModal';
// --- 2. Mock API 함수 정의 (백엔드 대체) ---
const mockFetchWorkspaces = async (_token) => {
    console.log('[Mock] API: 조직(Workspace) 목록 조회');
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
        items: [
            { id: 'ws-mock-111', name: 'Wealist 개발팀 (Mock)', created_by: 'user-1' },
            { id: 'ws-mock-222', name: 'Orange Cloud 디자인팀 (Mock)', created_by: 'user-2' },
            { id: 'ws-mock-333', name: '개인 스터디 (Mock)', created_by: 'user-1' },
        ],
    };
};
const mockFetchProjects = async (workspaceId, _token) => {
    console.log(`[Mock] API: 프로젝트 목록 조회 (Workspace: ${workspaceId})`);
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (workspaceId === 'ws-mock-222') {
        return {
            items: [
                { id: 'prj-mock-design-A', name: '랜딩페이지 디자인', workspace_id: workspaceId },
                { id: 'prj-mock-design-B', name: 'BI/CI 리뉴얼', workspace_id: workspaceId },
            ],
        };
    }
    return {
        items: [
            { id: 'prj-mock-samsung', name: '삼성물산 백오피스 (Mock)', workspace_id: workspaceId },
            { id: 'prj-mock-cj', name: 'CJ 어드민 페이지 (Mock)', workspace_id: workspaceId },
            { id: 'prj-mock-internal', name: '자체 서비스 (Wealist)', workspace_id: workspaceId },
        ],
    };
};
const mockFetchKanbanBoard = async (projectId, _token) => {
    console.log(`[Mock] API: 칸반 보드 로드 (Project: ${projectId})`);
    await new Promise((resolve) => setTimeout(resolve, 400));
    // 💡 기존 Kanban Mock 데이터에 customFieldValues 추가
    const baseTasks = [
        {
            id: 't-1',
            title: `[${projectId.slice(0, 5)}] 인증 API 개발`,
            assignee_id: 'user-1',
            status: 'BACKEND',
            assignee: '김개발',
            dueDate: '2026-01-15', // 추가 필드
            priority: 'HIGH', // 추가 필드
            customFieldValues: {
                'cf-status': 'IN PROGRESS', // 커스텀 진행단계
                'cf-role': '백엔드', // 관련 역할
                'cf-sprint': 2,
                'cf-review': '박보안',
            },
        },
        {
            id: 't-2',
            title: `[${projectId.slice(0, 5)}] JWT 시큐리티 적용`,
            assignee_id: 'user-2',
            status: 'BACKEND',
            assignee: '박보안',
            dueDate: '2026-01-20',
            priority: 'MEDIUM',
            customFieldValues: {
                'cf-status': 'TO DO',
                'cf-role': '백엔드',
                'cf-sprint': 2,
                'cf-review': '김조직장',
            },
        },
        {
            id: 't-3',
            title: `[${projectId.slice(0, 5)}] 로그인 페이지 UI`,
            assignee_id: 'user-3',
            status: 'FRONTEND',
            assignee: '이디자인',
            dueDate: '2026-01-25',
            priority: 'LOW',
            customFieldValues: {
                'cf-status': 'QA',
                'cf-role': '프론트엔드',
                'cf-sprint': 1,
                'cf-review': '김개발',
            },
        },
        {
            id: 't-4',
            title: `[${projectId.slice(0, 5)}] EKS 클러스터 구성`,
            assignee_id: 'user-4',
            status: 'DEVOPS',
            assignee: '최데브옵스',
            customFieldValues: {
                'cf-status': 'TO DO',
                'cf-role': '백엔드',
                'cf-sprint': 3,
                'cf-review': '김조직장',
            },
        },
        {
            id: 't-5',
            title: `[${projectId.slice(0, 5)}] API 배포 완료`,
            assignee_id: 'user-1',
            status: 'DONE',
            assignee: '김개발',
            customFieldValues: {
                'cf-status': 'TO DO',
                'cf-role': '백엔드',
                'cf-sprint': 1,
                'cf-review': '박운영자',
            },
        },
        {
            id: 't-6',
            title: `[${projectId.slice(0, 5)}] UI QA 피드백`,
            assignee_id: 'user-3',
            status: 'FRONTEND',
            assignee: '이디자인',
            customFieldValues: {
                'cf-status': 'IN PROGRESS',
                'cf-role': '프론트엔드',
                'cf-sprint': 2,
                'cf-review': '김개발',
            },
        },
    ];
    return [
        {
            id: 'BACKEND',
            title: '백엔드 (Backend)',
            kanbans: baseTasks.filter((t) => t.status === 'BACKEND'),
        },
        {
            id: 'FRONTEND',
            title: '프론트엔드 (Frontend)',
            kanbans: baseTasks.filter((t) => t.status === 'FRONTEND'),
        },
        {
            id: 'DEVOPS',
            title: '인프라 (DevOps)',
            kanbans: baseTasks.filter((t) => t.status === 'DEVOPS'),
        },
        { id: 'DONE', title: '완료 (Done)', kanbans: baseTasks.filter((t) => t.status === 'DONE') },
    ];
};
// ----------------------------------------------------
// 💡 Mock Avatars for the stack display (Header)
const mockHeaderAvatars = ['김', '박', '이', '최']; // 4 members total
// Avatar Stack Component Logic:
const AvatarStack = () => (_jsxs("div", { className: "flex -space-x-1.5 p-1 pr-0 overflow-hidden", children: [mockHeaderAvatars.slice(0, 3).map((initial, index) => (_jsx("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-1 ring-white text-white ${index === 0 ? 'bg-indigo-500' : index === 1 ? 'bg-pink-500' : 'bg-green-500'}`, style: { zIndex: mockHeaderAvatars.length - index }, children: initial }, index))), mockHeaderAvatars.length > 3 && (_jsxs("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-1 ring-white bg-gray-400 text-white`, style: { zIndex: 0 }, children: ["+", mockHeaderAvatars.length - 3] }))] }));
// 💡 Assignee Avatar Stack Component Logic:
const AssigneeAvatarStack = ({ assignees }) => {
    const assigneeList = Array.isArray(assignees)
        ? assignees
        : assignees
            .split(',')
            .map((name) => name.trim())
            .filter((name) => name.length > 0);
    const initials = assigneeList.map((name) => name[0]).filter((i) => i);
    const displayCount = 3;
    if (initials.length === 0) {
        return (_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-1 ring-gray-200 bg-gray-200 text-gray-700`, children: "?" }));
    }
    return (_jsxs("div", { className: "flex -space-x-1 p-1 pr-0 overflow-hidden", children: [initials.slice(0, displayCount).map((initial, index) => (_jsx("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-1 ring-white text-white ${index === 0 ? 'bg-indigo-500' : index === 1 ? 'bg-pink-500' : 'bg-green-500'}`, style: { zIndex: initials.length - index }, title: assigneeList[index], children: initial }, index))), initials.length > displayCount && (_jsxs("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-1 ring-white bg-gray-400 text-white`, style: { zIndex: 0 }, title: `${initials.length - displayCount}명 외`, children: ["+", initials.length - displayCount] }))] }));
};
const MainDashboard = ({ onLogout, accessToken }) => {
    const { theme } = useTheme();
    // 💡 Mock: 로그인한 사용자의 프로젝트 역할 (ORG: 조직장, OP: 운영자, VIEW: 비운영자)
    // const [currentRole, setCurrentRole] = useState<'ORGANIZER' | 'OPERATOR' | 'VIEWER'>('OPERATOR');
    const currentRole = useRef('OPERATOR');
    // --- 3. 상태 관리 (API 연동) ---
    const [workspaces, setWorkspaces] = useState([]);
    const [projects, setProjects] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [userProfile, setUserProfile] = useState({
        name: 'Mock User',
        email: 'mock@wealist.com',
        avatar: 'P',
    });
    // UI 상태
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showWorkspaceSelector, setShowWorkspaceSelector] = useState(false);
    const [showProjectSelector, setShowProjectSelector] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [selectedKanban, setSelectedKanban] = useState(null);
    const [showManangeModal, setShowManageModal] = useState(false); // 💡 조직원 모달 상태 추가
    // Ref for Menu/Selector
    const userMenuRef = useRef(null);
    const workspaceSelectorRef = useRef(null);
    const projectSelectorRef = useRef(null);
    // --- 4. 데이터 연동 (useEffect 연쇄) ---
    const fetchProjectData = useCallback(async (workspaceId) => {
        // setIsLoadingData(true);
        try {
            console.log(`[Phase 2] 🚀 프로젝트 로드 시작 (Workspace: ${workspaceId})`);
            const projectListResponse = await mockFetchProjects(workspaceId, accessToken);
            const projectList = projectListResponse.items || [];
            setProjects(projectList);
            if (projectList.length > 0) {
                setSelectedProject(projectList[0]);
            }
            else {
                setSelectedProject(null);
            }
        }
        catch (err) {
            console.error('Project Load Failed:', err);
            // setDataError('프로젝트 목록을 불러오지 못했습니다.');
        }
        finally {
            // setIsLoadingData(false);
        }
    }, [accessToken]);
    const initDataFetch = useCallback(async () => {
        // setIsLoadingData(true);
        // setDataError(null);
        try {
            setUserProfile({
                name: 'Mock User',
                email: 'mock@wealist.com',
                avatar: 'P',
            });
            const workspaceListResponse = await mockFetchWorkspaces(accessToken);
            const loadedWorkspaces = workspaceListResponse.items || [];
            setWorkspaces(loadedWorkspaces);
            if (loadedWorkspaces.length > 0) {
                const defaultWorkspace = loadedWorkspaces[0];
                setSelectedWorkspace(defaultWorkspace);
            }
        }
        catch (err) {
            console.error('❌ API Data Fetch failed:', err);
            // setDataError('초기 데이터 로드에 실패했습니다. (Kanban API Mock)');
        }
        finally {
            // setIsLoadingData(false);
        }
    }, [accessToken]);
    useEffect(() => {
        initDataFetch();
    }, [initDataFetch]);
    useEffect(() => {
        if (selectedWorkspace) {
            if (!selectedProject || selectedProject.workspace_id !== selectedWorkspace.id) {
                fetchProjectData(selectedWorkspace.id);
            }
        }
    }, [selectedWorkspace, selectedProject, fetchProjectData]);
    useEffect(() => {
        if (!selectedProject) {
            setColumns([]);
            return;
        }
        console.log(`[Phase 3] 🔄 프로젝트 변경 감지: ${selectedProject.name}. 칸반 보드 로드 시작.`);
        // setIsLoadingData(true);
        mockFetchKanbanBoard(selectedProject.id, accessToken)
            .then((data) => {
            setColumns(data);
        })
            .catch((err) => console.error('칸반 보드 로드 실패', err))
            .finally(() => {
            // setIsLoadingData(false);
        });
    }, [selectedProject, accessToken]);
    // const handleColumnUpdate = (updatedColumn: Column) => {
    //   setColumns((prev) => prev.map((col) => (col.id === updatedColumn.id ? updatedColumn : col)));
    //   console.log(`[Mock] 컬럼 제목 업데이트 완료: ${updatedColumn.title}`);
    // };
    // --- 6. 드래그 앤 드롭 로직 (Mock 데이터 기준) ---
    const [draggedKanban, setDraggedKanban] = useState(null);
    const [draggedFromColumn, setDraggedFromColumn] = useState(null);
    const handleDragStart = (task, columnId) => {
        setDraggedKanban(task);
        setDraggedFromColumn(columnId);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (targetColumnId) => {
        if (!draggedKanban || !draggedFromColumn || draggedFromColumn === targetColumnId)
            return;
        const updatedTask = {
            ...draggedKanban,
            status: targetColumnId,
            assignee: draggedKanban.assignee,
        };
        const newColumns = columns.map((col) => {
            if (col.id === draggedFromColumn) {
                return { ...col, kanbans: col.kanbans.filter((t) => t.id !== draggedKanban.id) };
            }
            if (col.id === targetColumnId) {
                return { ...col, kanbans: [...col.kanbans, updatedTask] };
            }
            return col;
        });
        setColumns(newColumns);
        setDraggedKanban(null);
        setDraggedFromColumn(null);
        console.log(`[Mock] API: Kanban ${draggedKanban.id} 상태를 ${targetColumnId}(으)로 변경 요청`);
    };
    const columnColors = ['bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-green-500'];
    // --- 외부 클릭 감지 (모달/메뉴 닫기) ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            // User Menu
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
            // Workspace Selector
            if (showWorkspaceSelector &&
                workspaceSelectorRef.current &&
                !workspaceSelectorRef.current.contains(event.target)) {
                const workspaceLogoButton = document.getElementById('workspace-logo-button');
                if (workspaceLogoButton && workspaceLogoButton.contains(event.target)) {
                    return;
                }
                setShowWorkspaceSelector(false);
            }
            // Project Selector
            if (showProjectSelector &&
                projectSelectorRef.current &&
                !projectSelectorRef.current.contains(event.target)) {
                setShowProjectSelector(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showWorkspaceSelector, showProjectSelector]);
    const currentWorkspaceInitial = selectedWorkspace?.name.slice(0, 1) || 'W';
    const sidebarWidth = 'w-16 sm:w-20'; // 사이드바 너비 정의 (예: w-20 = 5rem = 80px)
    // 프로젝트 조직원 관리 버튼 활성화 여부
    const canManageMembers = currentRole.current === 'ORGANIZER' || currentRole.current === 'OPERATOR';
    // --- 8. UI 렌더링 ---
    return (_jsxs("div", { className: `min-h-screen flex ${theme.colors.background} relative`, children: [_jsx("div", { className: "fixed inset-0 opacity-5", style: {
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                } }), _jsxs("aside", { className: `${sidebarWidth} fixed top-0 left-0 h-full flex flex-col justify-between ${theme.colors.primary} text-white shadow-xl z-50 flex-shrink-0`, children: [_jsxs("div", { className: "flex flex-col flex-grow items-center", children: [_jsx("div", { className: `py-3 flex justify-center w-full relative`, children: _jsx("button", { id: "workspace-logo-button", onClick: () => setShowWorkspaceSelector(!showWorkspaceSelector), className: `w-12 h-12 rounded-lg mx-auto flex items-center justify-center text-xl font-bold transition 
                    bg-white text-blue-800 ring-2 ring-white/50 hover:opacity-90`, title: selectedWorkspace?.name || '워크스페이스 선택', children: currentWorkspaceInitial }) }), _jsxs("div", { className: "flex flex-col gap-2 mt-4 flex-grow px-2 w-full pt-4", children: [_jsx("button", { className: `w-12 h-12 rounded-lg mx-auto flex items-center justify-center transition bg-blue-600 text-white ring-2 ring-white/50`, title: "\uD648 (\uB300\uC2DC\uBCF4\uB4DC)", children: _jsx(Home, { className: "w-6 h-6" }) }), _jsx("button", { className: `w-12 h-12 rounded-lg mx-auto flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white opacity-50 transition`, title: "DM", children: _jsx(MessageSquare, { className: "w-6 h-6" }) }), _jsx("button", { className: `w-12 h-12 rounded-lg mx-auto flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white opacity-50 transition`, title: "\uC54C\uB9BC", children: _jsx(Bell, { className: "w-6 h-6" }) }), _jsx("button", { className: `w-12 h-12 rounded-lg mx-auto flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white opacity-50 transition`, title: "\uD30C\uC77C", children: _jsx(File, { className: "w-6 h-6" }) })] })] }), _jsx("div", { className: `py-3 px-2 border-t border-gray-700`, children: _jsx("button", { onClick: () => setShowUserMenu(!showUserMenu), className: `w-full flex items-center justify-center py-2 text-sm rounded-lg hover:bg-blue-600 transition relative`, title: "\uACC4\uC815 \uBA54\uB274", children: _jsx("div", { className: `w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold ring-2 ring-white/50 text-gray-700`, children: userProfile.avatar }) }) })] }), showWorkspaceSelector && (_jsxs(_Fragment, { children: [_jsx("div", { onClick: () => setShowWorkspaceSelector(false), className: "absolute inset-0 bg-black opacity-30 z-40" }), _jsx("div", { ref: workspaceSelectorRef, className: `fixed top-0 left-16 sm:left-20 h-full w-72 ${theme.colors.card} border-r ${theme.colors.border} z-50 transition-transform duration-300 ease-out`, style: { boxShadow: theme.effects.shadow }, children: _jsxs("div", { className: "p-4 flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between pb-3 border-b mb-3", children: [_jsx("h2", { className: "font-bold text-lg text-black", children: "\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4" }), _jsx("button", { onClick: () => setShowWorkspaceSelector(false), className: "p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "overflow-y-auto flex-grow", children: [_jsx("h3", { className: "text-xs text-gray-400 mb-2 px-2 font-semibold", children: "\uB0B4 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4" }), _jsx("div", { className: "space-y-1", children: workspaces.map((workspace) => (_jsxs("button", { onClick: () => {
                                                    setSelectedWorkspace(workspace);
                                                    setShowWorkspaceSelector(false);
                                                }, className: `w-full px-3 py-2 text-left text-sm rounded transition flex items-center gap-2 ${selectedWorkspace?.id === workspace.id
                                                    ? 'bg-blue-100 text-blue-700 font-semibold'
                                                    : 'hover:bg-gray-100 text-gray-800'}`, children: [_jsx("span", { className: "w-6 h-6 rounded bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700", children: workspace.name.slice(0, 1) }), workspace.name] }, workspace.id))) })] }), _jsxs("div", { className: "pt-3 border-t mt-3", children: [_jsxs("button", { className: "w-full px-3 py-2 text-left text-blue-500 text-sm flex items-center gap-2 hover:bg-gray-100 rounded transition", children: [_jsx(Plus, { className: "w-4 h-4" }), " \uC0C8\uB85C\uC6B4 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uC0DD\uC131"] }), _jsxs("button", { onClick: () => {
                                                setShowManageModal('WORKSPACE'); // 💡 모달 열기
                                            }, className: "w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 rounded transition text-gray-700", children: [_jsx(Settings, { className: "w-4 h-4 text-gray-500" }), " \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAD00\uB9AC"] })] })] }) })] })), _jsxs("div", { className: "flex-grow flex flex-col relative z-10", style: { marginLeft: sidebarWidth, minHeight: '100vh' }, children: [_jsxs("header", { className: `fixed top-0 left-0 h-16 flex items-center justify-between pl-20 pr-6 sm:pl-28 sm:pr-4 py-2 sm:py-3 ${theme.colors.card} shadow-md z-20 w-full`, style: {
                            boxShadow: theme.effects.headerShadow,
                            width: `calc(100% - ${sidebarWidth})`,
                            left: sidebarWidth,
                        }, children: [_jsxs("div", { className: "flex items-center gap-2 relative", children: [_jsxs("button", { onClick: () => setShowProjectSelector(!showProjectSelector), className: `flex items-center gap-2 font-bold text-xl ${theme.colors.text} hover:opacity-80 transition`, children: [selectedProject?.name || '프로젝트를 선택하세요', _jsx(ChevronDown, { className: `w-5 h-5 text-gray-500 transition-transform ${showProjectSelector ? 'rotate-180' : 'rotate-0'}`, style: { strokeWidth: 2.5 } })] }), showProjectSelector && (_jsxs("div", { ref: projectSelectorRef, className: `absolute top-full -left-4 mt-1 w-80 ${theme.colors.card} ${theme.effects.cardBorderWidth} ${theme.colors.border} z-50 ${theme.effects.borderRadius}`, style: { boxShadow: theme.effects.shadow }, children: [_jsxs("div", { className: "p-3 max-h-80 overflow-y-auto", children: [_jsxs("h3", { className: "text-xs text-gray-400 mb-2 px-1 font-semibold", children: ["\uB0B4 \uD504\uB85C\uC81D\uD2B8 (", projects.length, ")"] }), projects.map((project) => (_jsxs("button", { onClick: () => {
                                                            setSelectedProject(project);
                                                            setShowProjectSelector(false);
                                                        }, className: `w-full px-3 py-2 text-left text-sm rounded transition truncate ${selectedProject?.id === project.id
                                                            ? 'bg-blue-100 text-blue-700 font-semibold'
                                                            : 'hover:bg-gray-100 text-gray-800'}`, children: ["# ", project.name] }, project.id)))] }), _jsxs("div", { className: "pt-2 pb-2 border-t", children: [_jsxs("button", { className: "w-full px-3 py-2 text-left text-sm flex items-center gap-2 text-blue-500 hover:bg-gray-100 rounded-b-lg transition", children: [_jsx(Plus, { className: "w-4 h-4" }), " \uC0C8 \uD504\uB85C\uC81D\uD2B8 \uC0DD\uC131"] }), _jsxs("button", { onClick: () => {
                                                            setShowManageModal('PROJECT'); // 💡 모달 열기
                                                        }, className: "w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 rounded transition text-gray-700", children: [_jsx(Settings, { className: "w-4 h-4 text-gray-500" }), " \uD504\uB85C\uC81D\uD2B8 \uAD00\uB9AC"] })] })] }))] }), selectedProject && (_jsx("button", { 
                                // onClick={() => setShowMemberModal(true)}
                                className: `flex items-center gap-2 p-1 rounded-lg transition ${canManageMembers ? 'hover:bg-blue-100' : 'hover:bg-gray-100'}`, title: canManageMembers ? '조직원 초대 및 설정' : '조직원 목록 보기', children: _jsx(AvatarStack, {}) }))] }), _jsx("div", { className: "flex-grow flex flex-col p-3 sm:p-6 overflow-auto mt-16 ml-20", children: selectedProject ? (_jsx("div", { className: "flex flex-col lg:flex-row gap-3 sm:gap-4 min-w-max pb-4", children: columns.map((column, idx) => (_jsx("div", { onDragOver: handleDragOver, onDrop: () => handleDrop(column.id), className: "w-full lg:w-80 lg:flex-shrink-0 relative", children: _jsxs("div", { className: `relative ${theme.effects.cardBorderWidth} ${theme.colors.border} p-3 sm:p-4 ${theme.colors.card} ${theme.effects.borderRadius}`, children: [_jsx("div", { className: `flex items-center justify-between pb-2`, children: _jsxs("h3", { 
                                                // 💡 컬럼 상세 보기 기능 제외
                                                className: `font-bold ${theme.colors.text} flex items-center gap-2 ${theme.font.size.xs} cursor-pointer hover:underline`, children: [_jsx("span", { className: `w-3 h-3 sm:w-4 sm:h-4 ${columnColors[idx % columnColors.length]} ${theme.effects.cardBorderWidth} ${theme.colors.border}` }), column.title, _jsx("span", { className: `bg-black text-white px-1 sm:px-2 py-1 ${theme.effects.cardBorderWidth} ${theme.colors.border} text-[8px] sm:text-xs`, children: column.kanbans.length })] }) }), _jsxs("div", { className: "space-y-2 sm:space-y-3", children: [column.kanbans.map((kanban) => (_jsx("div", { className: "relative", children: _jsxs("div", { draggable: true, onDragStart: () => handleDragStart(kanban, column.id), onClick: () => setSelectedKanban(kanban), className: `relative ${theme.colors.card} p-3 sm:p-4 ${theme.effects.cardBorderWidth} ${theme.colors.border} hover:border-blue-500 transition cursor-pointer ${theme.effects.borderRadius}`, children: [_jsx("h3", { className: `font-bold ${theme.colors.text} mb-2 sm:mb-3 ${theme.font.size.xs} break-words`, children: kanban.title }), _jsx("div", { className: "flex items-center justify-between", children: _jsx(AssigneeAvatarStack, { assignees: kanban.customFieldValues?.['cf-assignee'] || kanban.assignee }) })] }) }, kanban.id))), _jsx("div", { className: "relative", children: _jsxs("button", { className: `relative w-full py-3 sm:py-4 ${theme.effects.cardBorderWidth} border-dashed ${theme.colors.border} ${theme.colors.card} hover:bg-gray-100 transition flex items-center justify-center gap-2 ${theme.font.size.xs} ${theme.effects.borderRadius}`, onClick: () => setSelectedKanban({
                                                            id: '',
                                                            title: '',
                                                            assignee_id: '',
                                                            status: 'NEW',
                                                            assignee: '',
                                                        }), children: [_jsx(Plus, { className: "w-3 h-3 sm:w-4 sm:h-4", style: { strokeWidth: 3 } }), "\uCE78\uBC18 \uCD94\uAC00"] }) })] })] }) }, column.id))) })) : (_jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center p-8", children: [_jsx(Briefcase, { className: "w-16 h-16 mb-4 text-gray-400" }), _jsx("h2", { className: `${theme.font.size.xl} ${theme.colors.text} mb-2`, children: "\uD504\uB85C\uC81D\uD2B8\uB97C \uC120\uD0DD\uD558\uC138\uC694" }), _jsx("p", { className: `${theme.colors.subText}`, children: "\uC67C\uCABD \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uBA54\uB274\uB97C \uD1B5\uD574 \uD504\uB85C\uC81D\uD2B8 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uACE0 \uC120\uD0DD\uD558\uC138\uC694." })] })) })] }), showUserMenu && (_jsxs("div", { ref: userMenuRef, 
                // 사이드바 옆, 하단 아바타 버튼 위에 위치하도록 조정
                className: `absolute bottom-16 left-12 sm:left-16 w-64 ${theme.colors.card} ${theme.effects.cardBorderWidth} ${theme.colors.border} z-50 ${theme.effects.borderRadius} shadow-2xl`, style: { boxShadow: theme.effects.shadow }, children: [_jsxs("div", { className: "p-3 pb-3 mb-2 border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-10 h-10 ${theme.colors.primary} flex items-center justify-center text-white text-base font-bold rounded-md`, children: userProfile.avatar }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg text-gray-900", children: userProfile.name }), _jsxs("div", { className: "flex items-center text-green-600 text-xs mt-1", children: [_jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full mr-1" }), "\uB300\uD654 \uAC00\uB2A5"] })] })] }), _jsxs("button", { 
                                // 이 버튼은 실제 UserProfileModal의 상태 업데이트 기능을 호출하지 않고, 메뉴 내의 액션만 시뮬레이션합니다.
                                onClick: () => console.log('상태 업데이트 모달 열기'), className: "w-full mt-4 flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 transition text-sm", children: [_jsx("span", { role: "img", "aria-label": "smiley", className: "mr-2 text-base", children: "\uD83D\uDE0A" }), "\uC0C1\uD0DC \uC5C5\uB370\uC774\uD2B8"] })] }), _jsx("div", { className: "space-y-1 pb-3 mb-2 border-b border-gray-200", children: _jsxs("button", { onClick: () => console.log('알림 일시 중지'), className: "w-full text-left flex items-center justify-between px-2 py-1.5 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded transition", children: ["\uC54C\uB9BC \uC77C\uC2DC \uC911\uC9C0", _jsx("span", { className: "text-gray-500 text-xs pt-1", children: "\uCF1C\uAE30 >" })] }) }), _jsxs("div", { className: "space-y-1 p-2 pt-0", children: [_jsx("button", { onClick: () => {
                                    setShowUserProfile(true); // 프로필 수정 모달 열기
                                    setShowUserMenu(false);
                                }, className: "w-full text-left px-2 py-1.5 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded transition font-semibold", children: "\uD504\uB85C\uD544" }), _jsx("button", { onClick: () => console.log('환경 설정 페이지/모달 열기'), className: "w-full text-left px-2 py-1.5 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded transition font-semibold", children: "\uD658\uACBD \uC124\uC815" })] }), _jsx("div", { className: "pt-2 pb-2 border-t border-gray-200 mx-2", children: _jsx("button", { onClick: onLogout, className: "w-full text-left px-2 py-1.5 text-sm text-gray-800 hover:bg-red-50 hover:text-red-700 rounded transition", children: "\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC5D0\uC11C \uB85C\uADF8\uC544\uC6C3" }) })] })), showUserProfile && userProfile && (_jsx(UserProfileModal, { user: userProfile, onClose: () => setShowUserProfile(false) })), selectedKanban && (_jsx(KanbanDetailModal, { kanban: selectedKanban, onClose: () => setSelectedKanban(null) })), showManangeModal === 'PROJECT' && selectedProject && (_jsx(ProjectManageModal, { mode: "PROJECT" // 💡 모드 지정
                , targetName: selectedProject.name, role: currentRole.current, onClose: () => setShowManageModal(false) })), showManangeModal === 'WORKSPACE' && selectedWorkspace && (_jsx(ProjectManageModal, { mode: "WORKSPACE" // 💡 모드 지정
                , targetName: selectedWorkspace.name, role: currentRole.current, onClose: () => setShowManageModal(false) }))] }));
};
export default MainDashboard;
