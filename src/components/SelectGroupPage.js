import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Search } from 'lucide-react';
//  Mock 데이터 정의 (조직 검색을 위한 더미 데이터)
const MOCK_GROUPS = [
    { groupId: '1111-a', name: 'Wealist Dev Team (Mock)', companyName: 'Wealist Inc.' },
    { groupId: '2222-b', name: 'Orange Cloud Design (Mock)', companyName: 'KT Cloud' },
    { groupId: '3333-c', name: 'Project Kanban Alpha (Mock)', companyName: 'Self-Employed' },
    { groupId: '4444-d', name: 'Data Engineer Study (Mock)', companyName: 'Personal' },
];
const SelectGroupPage = ({ 
// userId,
accessToken, onGroupSelected, }) => {
    const { theme } = useTheme();
    const [groups, setGroups] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreatingNewGroup, setIsCreatingNewGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newCompany, setNewCompany] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    // 1. 그룹 목록 조회 및 초기화 (MOCK)
    useEffect(() => {
        const mockFetchGroups = () => {
            setIsLoading(true);
            setError(null);
            setTimeout(() => {
                // [Mock] 미리 정의된 조직 목록을 반환합니다. (사용자가 속한 그룹이 있다면 목록에 나타납니다.)
                // 현재는 '처음 접속한 사용자' 시나리오에 맞게 빈 목록을 반환하는 대신
                // 선택할 수 있는 조직 목록을 Mock으로 제공합니다.
                setGroups(MOCK_GROUPS);
                setIsLoading(false);
            }, 500);
        };
        mockFetchGroups();
    }, [accessToken]);
    // 2. 조직 검색 필터링 로직 (useMemo로 성능 최적화)
    const availableGroups = useMemo(() => {
        if (!groups)
            return [];
        const query = searchQuery.toLowerCase().trim();
        // 💡 변경된 로직: 검색어가 없으면 (false) groups 배열 전체를 반환합니다.
        if (!query) {
            return groups;
        }
        // 이름, 회사 이름으로 필터링합니다.
        return groups.filter((group) => group.name.toLowerCase().includes(query) || group.companyName.toLowerCase().includes(query));
    }, [searchQuery, groups]);
    // 3. 새로운 그룹 생성 및 등록 핸들러 (MOCK)
    const handleCreateAndSelectGroup = async () => {
        if (!newGroupName.trim()) {
            setError('그룹 이름을 입력해 주세요.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            const newGroupId = 'mock-new-group-' + Math.random().toString(36).substring(2, 9);
            alert(`[Mock] 조직 '${newGroupName}' 생성 완료!`);
            setIsLoading(false);
            onGroupSelected(newGroupId);
        }, 1500);
    };
    // 4. 기존 그룹 선택 핸들러 (MOCK)
    const handleSelectExistingGroup = async (group) => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            setIsLoading(false);
            alert(`[Mock] 그룹 '${group.name}' 선택 완료!`);
            // 🚀 최종 핸들러 호출 -> Workspace 생성 단계로 이동
            onGroupSelected(group.groupId);
        }, 500);
    };
    // --- 로딩 화면 ---
    if (isLoading || groups === null) {
        return (_jsx("div", { className: `min-h-screen ${theme.colors.background} flex items-center justify-center p-4`, children: _jsx("div", { className: "p-8", children: _jsx("p", { className: `${theme.font.size.lg} ${theme.colors.text}`, children: "\uC870\uC9C1 \uC815\uBCF4\uB97C \uD655\uC778 \uC911..." }) }) }));
    }
    // --- 메인 렌더링 ---
    return (_jsx("div", { className: `min-h-screen ${theme.colors.background} flex items-center justify-center p-4`, children: _jsxs("div", { className: `${theme.colors.card} ${theme.effects.borderRadius} p-6 sm:p-8 w-full max-w-lg relative z-10 shadow-xl ${theme.effects.cardBorderWidth} ${theme.colors.border}`, children: [_jsx("h2", { className: `${theme.font.size.xl} font-extrabold ${theme.colors.text} mb-2 text-center`, children: isCreatingNewGroup ? '새로운 조직 만들기 🏗️' : '워크스페이스 조직 선택' }), _jsxs("p", { className: `text-center mb-6 ${theme.font.size.sm} ${theme.colors.subText}`, children: [_jsx("span", { className: `${theme.colors.text} font-bold mr-1`, children: "\uC18C\uC18D\uB41C \uC870\uC9C1\uC5D0 \uCC38\uC5EC\uD558\uAC70\uB098," }), "\uC0C8 \uC870\uC9C1\uC744 \uC0DD\uC131\uD558\uC5EC \uC2DC\uC791\uD574 \uBCF4\uC138\uC694."] }), error && (_jsx("p", { className: `${theme.colors.danger} text-center mb-4 ${theme.font.size.sm} border border-red-300 p-2 rounded-md bg-red-50`, children: error })), isCreatingNewGroup ? (
                /* ------------------- 조직 생성 폼 ------------------- */
                _jsxs("div", { className: "space-y-4", children: [_jsx("input", { type: "text", placeholder: "\uADF8\uB8F9 \uC774\uB984 (\uC608: Orange Cloud \uAC1C\uBC1C\uD300)", value: newGroupName, onChange: (e) => setNewGroupName(e.target.value), className: `w-full px-4 py-3 ${theme.colors.secondary} ${theme.font.size.sm} rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition`, disabled: isLoading }), _jsx("input", { type: "text", placeholder: "\uD68C\uC0AC \uC774\uB984 (\uC120\uD0DD \uC0AC\uD56D)", value: newCompany, onChange: (e) => setNewCompany(e.target.value), className: `w-full px-4 py-3 ${theme.colors.secondary} ${theme.font.size.sm} rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition`, disabled: isLoading }), _jsx("button", { onClick: handleCreateAndSelectGroup, disabled: isLoading || !newGroupName.trim(), className: `w-full ${theme.colors.success} text-white py-3 font-bold rounded-lg ${theme.colors.successHover} transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md`, children: isLoading ? '생성 및 등록 중...' : '새 조직 생성 및 시작 (Mock)' }), _jsx("button", { onClick: () => setIsCreatingNewGroup(false), className: `w-full ${theme.colors.info} py-2 mt-2 hover:text-blue-700 underline ${theme.font.size.sm}`, disabled: isLoading, children: "\u2190 \uB3CC\uC544\uAC00\uC11C \uAE30\uC874 \uC870\uC9C1 \uAC80\uC0C9\uD558\uAE30" })] })) : (
                /* ------------------- 조직 검색/선택 UI ------------------- */
                _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "\uC870\uC9C1 \uC774\uB984 \uB610\uB294 \uCF54\uB4DC\uB85C \uAC80\uC0C9", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: `w-full px-4 pl-10 py-3 ${theme.colors.secondary} ${theme.font.size.sm} rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition`, disabled: isLoading }), _jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" })] }), _jsx("div", { className: `max-h-60 overflow-y-auto border-2 ${theme.colors.border} rounded-lg`, children: availableGroups.length > 0 ? (availableGroups.map((group) => (_jsxs("button", { onClick: () => handleSelectExistingGroup(group), className: `w-full text-left p-3 hover:bg-blue-50 border-b border-gray-100 ${theme.colors.text} ${theme.font.size.sm} transition flex justify-between items-center last:border-b-0`, disabled: isLoading, children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold", children: group.name }), _jsx("p", { className: `${theme.colors.subText} ${theme.font.size.xs}`, children: group.companyName })] }), _jsx("span", { className: `${theme.colors.info} ${theme.font.size.xs} px-2 py-1 border border-blue-200 rounded`, children: "\uC120\uD0DD" })] }, group.groupId)))) : (_jsx("p", { className: `p-4 text-center ${theme.colors.subText} ${theme.font.size.sm}`, children: searchQuery.trim()
                                    ? '검색 결과가 없습니다. 이름을 확인하거나 새로 생성해 보세요.'
                                    : '소속된 조직이 없습니다. 아래 버튼으로 새로 생성하거나, 이름을 검색하세요.' })) }), _jsx("div", { className: "mt-6 pt-4 border-t border-gray-100", children: _jsxs("button", { onClick: () => setIsCreatingNewGroup(true), className: `w-full ${theme.colors.primary} text-white py-3 font-bold rounded-lg ${theme.colors.primaryHover} transition disabled:opacity-50 shadow-lg`, disabled: isLoading, children: [_jsx("span", { className: "text-xl mr-2", children: "+" }), " \uC0C8 \uC870\uC9C1 \uC0DD\uC131\uD558\uAE30"] }) })] }))] }) }));
};
export default SelectGroupPage;
