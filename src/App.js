import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { createWorkspace } from './api/KanbanService';
// Lazy load 페이지들
const AuthPage = lazy(() => import('./pages/Authpage'));
const SelectGroupPage = lazy(() => import('./components/SelectGroupPage'));
const MainDashboard = lazy(() => import('./pages/Dashboard'));
const LoadingScreen = () => (_jsx("div", { className: "text-center min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "p-8 bg-white rounded-xl shadow-lg", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" }), _jsx("h1", { className: "text-xl font-medium text-gray-800", children: "\uB85C\uB529 \uC911..." })] }) }));
const App = () => {
    const [appState, setAppState] = useState('AUTH');
    const [accessToken, setAccessToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [currentGroupId, setCurrentGroupId] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const handleAuthSuccess = (authData) => {
        setAccessToken(authData.accessToken);
        setUserId(authData.userId);
        localStorage.setItem('access_token', authData.accessToken);
        localStorage.setItem('user_id', authData.userId);
        setAppState('SELECT_GROUP');
    };
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        setAccessToken(null);
        setUserId(null);
        setCurrentGroupId(null);
        setAppState('AUTH');
    };
    const handleGroupSelectionSuccess = async (groupId) => {
        if (!accessToken || !userId) {
            alert('인증 정보가 유효하지 않습니다.');
            handleLogout();
            return;
        }
        setCurrentGroupId(groupId);
        setLoadingMessage('워크스페이스를 생성하고 초기 설정을 진행합니다...');
        setAppState('CREATE_WORKSPACE');
        try {
            const workspaceData = {
                name: 'My Kanban Workspace - ' + groupId.substring(0, 8),
                description: `Group ID ${groupId}를 위한 기본 공간`,
            };
            await createWorkspace(workspaceData, accessToken);
            setLoadingMessage(null);
            setAppState('KANBAN');
        }
        catch (error) {
            alert(`오류: ${error.message || '알 수 없는 오류'}`);
            setLoadingMessage(null);
            setAppState('SELECT_GROUP');
        }
    };
    const renderContent = () => {
        if (appState === 'AUTH') {
            return _jsx(AuthPage, { onLogin: handleAuthSuccess });
        }
        if (appState === 'SELECT_GROUP' && userId && accessToken) {
            return (_jsx(SelectGroupPage, { userId: userId, accessToken: accessToken, onGroupSelected: handleGroupSelectionSuccess }));
        }
        if (appState === 'CREATE_WORKSPACE') {
            return _jsx(LoadingScreen, {});
        }
        if (appState === 'KANBAN' && currentGroupId && accessToken) {
            return (_jsx(MainDashboard, { onLogout: handleLogout, currentGroupId: currentGroupId, accessToken: accessToken }));
        }
        return _jsx(AuthPage, { onLogin: handleAuthSuccess });
    };
    return (_jsx(ThemeProvider, { children: _jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: renderContent() }) }));
};
export default App;
