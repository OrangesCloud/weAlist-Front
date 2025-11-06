import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Plus, X, Search, UserCheck, Users, Briefcase, LayoutGrid } from 'lucide-react';
// 💡 Mock 데이터: 프로젝트 현황 리스트 (워크스페이스 모드에서 일반 설정에 통합)
const getMockProjectStatus = () => {
    return [
        {
            id: 'prj-1',
            name: 'Wealist 서비스 개발',
            memberCount: 4,
            taskCount: 22,
            lastUpdated: '2025-10-31',
        },
        {
            id: 'prj-2',
            name: 'Orange Cloud 디자인 시스템',
            memberCount: 2,
            taskCount: 15,
            lastUpdated: '2025-10-28',
        },
        {
            id: 'prj-3',
            name: '내부 인프라 구축 (EKS)',
            memberCount: 3,
            taskCount: 8,
            lastUpdated: '2025-11-01',
        },
        {
            id: 'prj-4',
            name: '마케팅 컨텐츠 기획',
            memberCount: 1,
            taskCount: 4,
            lastUpdated: '2025-10-15',
        },
        {
            id: 'prj-5',
            name: '신규 채용 프로세스',
            memberCount: 5,
            taskCount: 10,
            lastUpdated: '2025-11-02',
        },
        {
            id: 'prj-6',
            name: '백엔드 서비스 확장',
            memberCount: 3,
            taskCount: 30,
            lastUpdated: '2025-10-20',
        },
    ];
};
export const ProjectManageModal = ({ mode, targetName, role, onClose, }) => {
    const { theme } = useTheme();
    const isWorkspaceMode = mode === 'WORKSPACE';
    const isManager = role === 'ORGANIZER' || role === 'OPERATOR';
    // 💡 탭 상태: GENERAL과 MEMBERSHIP 두 가지로만 유지
    const initialTab = 'GENERAL';
    const [activeTab, setActiveTab] = useState(initialTab);
    // 💡 Mock 데이터 상태
    const getMockMembers = () => {
        if (isWorkspaceMode) {
            return [
                { id: 'user-1', name: '김조직장', role: 'ORGANIZER', canBeManager: true },
                { id: 'user-2', name: '박운영자', role: 'OPERATOR', canBeManager: true },
                { id: 'user-3', name: '이일반인', role: 'VIEWER', canBeManager: true },
                { id: 'user-4', name: '최초대필요', role: 'VIEWER', canBeManager: false },
            ];
        }
        else {
            return [
                { id: 'user-1', name: '김개발 (조직장)', role: 'ORGANIZER', isProjectMember: true },
                { id: 'user-2', name: '박보안 (운영자)', role: 'OPERATOR', isProjectMember: true },
                { id: 'user-3', name: '이디자인', role: 'VIEWER', isProjectMember: false },
                { id: 'user-4', name: '최데브옵스', role: 'VIEWER', isProjectMember: true },
            ];
        }
    };
    const [members, setMembers] = useState(getMockMembers());
    const [searchQuery, setSearchQuery] = useState('');
    // 💡 프로젝트 현황 상태는 useRef로 유지
    const projectStatus = useRef(getMockProjectStatus());
    const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()));
    // 역할 변경 및 팀원 추가/제거 로직 (변경 없음)
    const toggleRole = (memberId, currentRole) => {
        if (role !== 'ORGANIZER')
            return;
        setMembers((prev) => prev.map((member) => {
            if (member.id === memberId) {
                const newRole = currentRole === 'OPERATOR' ? 'VIEWER' : 'OPERATOR';
                console.log(`[Mock] ${member.name} 역할을 ${newRole}로 변경 요청`);
                return { ...member, role: newRole };
            }
            return member;
        }));
    };
    const toggleProjectMembership = (memberId, currentStatus) => {
        if (!isManager)
            return;
        setMembers((prev) => prev.map((member) => {
            if (member.id === memberId) {
                const newStatus = !currentStatus;
                console.log(`[Mock] ${member.name}을(를) 프로젝트 팀원에서 ${newStatus ? '추가' : '제거'} 요청`);
                return { ...member, isProjectMember: newStatus };
            }
            return member;
        }));
    };
    const getRoleLabel = (memberRole) => {
        switch (memberRole) {
            case 'ORGANIZER':
                return { text: '조직장', color: 'bg-red-500 text-white font-semibold' };
            case 'OPERATOR':
                return { text: '운영자', color: 'bg-yellow-300 text-yellow-900 font-medium' };
            case 'VIEWER':
            default:
                return { text: '팀원', color: 'bg-blue-100 text-blue-700 font-medium' };
        }
    };
    // 💡 멤버 목록 렌더링 컴포넌트 (스크롤 영역 최적화)
    const MemberListContent = () => (_jsxs(_Fragment, { children: [_jsx("h3", { className: "text-sm font-semibold text-gray-600 mb-2", children: isWorkspaceMode
                    ? `전체 조직원 (${filteredMembers.length}명)`
                    : `워크스페이스 멤버 (${filteredMembers.length}명)` }), _jsx("div", { className: "max-h-80 overflow-y-auto space-y-1 p-1 -m-1", children: filteredMembers.length > 0 ? (filteredMembers.map((member) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold", children: member.name[0] }), _jsxs("div", { children: [_jsx("span", { className: "text-sm font-medium text-gray-800", children: member.name }), _jsxs("div", { className: "flex items-center mt-0.5 space-x-2", children: [_jsx("span", { className: `text-xs px-2 py-0.5 rounded-full ${getRoleLabel(member.role).color}`, children: getRoleLabel(member.role).text }), !isWorkspaceMode && (_jsx("span", { className: `text-xs font-medium px-2 py-0.5 rounded-full ${member.isProjectMember
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'}`, children: member.isProjectMember ? '프로젝트 참여 중' : '미참여' }))] })] })] }), isManager && (_jsxs("div", { className: "flex items-center gap-2", children: [isWorkspaceMode && member.role !== 'ORGANIZER' && (_jsx("button", { onClick: () => toggleRole(member.id, member.role), className: `text-xs px-3 py-1 rounded-full transition ${member.role === 'OPERATOR'
                                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'}`, children: member.role === 'OPERATOR' ? '팀원 지정' : '운영자 지정' })), !isWorkspaceMode && (_jsx("button", { onClick: () => toggleProjectMembership(member.id, member.isProjectMember || false), className: `text-xs px-3 py-1 rounded-full transition ${member.isProjectMember
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-green-500 text-white hover:bg-green-600'}`, children: member.isProjectMember ? '제거' : '추가' }))] })), !isManager && !isWorkspaceMode && member.isProjectMember && (_jsx(UserCheck, { className: "w-5 h-5 text-green-500" }))] }, member.id)))) : (_jsx("p", { className: "text-center py-4 text-gray-500", children: "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) })] }));
    // 💡 일반 설정 탭 내용 (통합 로직 반영 및 UI 정리)
    const GeneralSettingsContent = () => {
        // 프로젝트 모드일 때의 칸반 현황 Mock 데이터 (일반 설정 탭 내에서만 사용)
        const mockKanbanSummary = [
            { status: '백엔드 (Backend)', count: 4, color: 'bg-blue-500' },
            { status: '프론트엔드 (Frontend)', count: 3, color: 'bg-yellow-500' },
            { status: '인프라 (DevOps)', count: 1, color: 'bg-purple-500' },
            { status: '완료 (Done)', count: 22, color: 'bg-green-500' },
        ];
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border space-y-4", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: isWorkspaceMode ? '워크스페이스 이름' : '프로젝트 이름' }), _jsx("input", { type: "text", defaultValue: targetName, className: "w-full px-3 py-2 border rounded-lg text-sm" }), _jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: isWorkspaceMode ? '기본 URL' : '프로젝트 설명' }), _jsx("input", { type: "text", defaultValue: isWorkspaceMode ? 'mock.wealist.com' : '칸반 보드를 위한 설정', className: "w-full px-3 py-2 border rounded-lg text-sm" })] }), isWorkspaceMode ? (
                /* 워크스페이스 모드: 프로젝트 현황 목록 */
                _jsxs("div", { className: "pt-4", children: [_jsxs("h3", { className: "text-md font-bold text-gray-800 mb-3", children: [_jsx(Briefcase, { className: "w-5 h-5 inline mr-2 text-blue-500" }), "\uD504\uB85C\uC81D\uD2B8 \uD604\uD669 (\uCD1D ", projectStatus.current.length, "\uAC1C)"] }), _jsxs("div", { className: "max-h-80 overflow-y-auto space-y-3 p-1 -m-1", children: [' ', projectStatus.current.map((project) => (_jsxs("div", { className: "p-3 bg-white border border-gray-200 rounded-lg shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "text-sm font-semibold text-gray-800 truncate", children: project.name }), _jsxs("span", { className: "text-xs text-gray-500", children: [project.lastUpdated.slice(5), " \uC5C5\uB370\uC774\uD2B8"] })] }), _jsxs("div", { className: "flex gap-4 mt-2 text-sm", children: [_jsxs("span", { className: "text-gray-700 font-medium", children: ["\uD300\uC6D0: ", project.memberCount, "\uBA85"] }), _jsxs("span", { className: "text-gray-700 font-medium", children: ["\uD0DC\uC2A4\uD06C: ", project.taskCount, "\uAC1C"] })] })] }, project.id)))] })] })) : (
                /* 프로젝트 모드: 칸반 현황 (컬럼별 태스크 개수) */
                _jsxs("div", { className: "pt-4", children: [_jsxs("h3", { className: "text-md font-bold text-gray-800 mb-3", children: [_jsx(LayoutGrid, { className: "w-5 h-5 inline mr-2 text-blue-500" }), "\uD604\uC7AC \uCE78\uBC18 \uD604\uD669 (\uCEEC\uB7FC\uBCC4 \uD0DC\uC2A4\uD06C \uAC1C\uC218)"] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: mockKanbanSummary.map((summary, index) => (_jsx("div", { className: "p-4 bg-white border border-gray-200 rounded-lg shadow-sm", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: summary.status }), _jsx("span", { className: `text-xl font-bold text-white px-3 py-1 rounded-full ${summary.color}`, children: summary.count })] }) }, index))) })] })), _jsx("div", { className: "pt-6 border-t border-gray-200", children: _jsx("button", { className: "w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition", children: isWorkspaceMode ? '워크스페이스 저장' : '프로젝트 저장' }) })] }));
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[90]", onClick: onClose, children: _jsx("div", { className: "relative w-full max-w-lg", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: `relative ${theme.colors.card} ${theme.effects.borderWidth} ${theme.colors.border} p-6 ${theme.effects.borderRadius} shadow-xl`, children: [_jsxs("div", { className: "flex items-center justify-between mb-4 border-b border-gray-200 -mt-4 -mx-6 px-6 pt-4", children: [' ', _jsxs("div", { className: "flex", children: [_jsx("button", { onClick: () => setActiveTab('GENERAL'), className: `py-2 px-4 text-sm font-semibold transition ${activeTab === 'GENERAL'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'}`, children: "\uC77C\uBC18 \uC124\uC815 & \uD604\uD669" }), _jsx("button", { onClick: () => setActiveTab('MEMBERSHIP'), className: `py-2 px-4 text-sm font-semibold transition ${activeTab === 'MEMBERSHIP'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'}`, children: isWorkspaceMode ? '조직원/역할 관리' : '회원 관리' })] }), _jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "space-y-4", children: [' ', activeTab === 'GENERAL' && _jsx(GeneralSettingsContent, {}), activeTab === 'MEMBERSHIP' && (_jsxs("div", { className: "space-y-4", children: [isManager && (_jsxs("div", { className: "flex gap-3", children: [_jsxs("div", { className: "relative flex-grow", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx("input", { type: "text", placeholder: `${isWorkspaceMode ? '조직원' : '팀원'} 검색...`, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" })] }), _jsxs("button", { className: `flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition shadow-md ${isManager
                                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                    : 'bg-gray-300 text-gray-700 cursor-default'}`, disabled: !isManager, children: [_jsx(Plus, { className: "w-4 h-4" }), isWorkspaceMode ? '조직원 초대' : '팀원 추가'] })] })), _jsx(MemberListContent, {}), !isManager && !isWorkspaceMode && (_jsxs("p", { className: "text-sm text-gray-500 mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200", children: [_jsx(Users, { className: "w-4 h-4 inline mr-1 text-blue-500" }), "\uBE44\uC6B4\uC601\uC790\uB294 \uD300\uC6D0 \uBAA9\uB85D\uB9CC \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uD300\uC6D0 \uCD94\uAC00/\uC81C\uAC70 \uAD8C\uD55C\uC740 \uC6B4\uC601\uC790\uC5D0\uAC8C \uC788\uC2B5\uB2C8\uB2E4."] }))] }))] })] }) }) }));
};
