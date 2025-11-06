import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Calendar, Tag, MessageSquare, Send } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
const TaskDetailModal = ({ task, // 💡 이제 task는 항상 존재합니다 (생성 시에는 불완전한 Mock 객체)
onClose, }) => {
    const { theme } = useTheme();
    // 💡 모드 판단: task.id가 비어있으면 생성 모드로 판단합니다.
    const isCreating = task.id === '';
    // 💡 상태 초기화: 전달받은 task 객체를 기반으로 현재 상태를 설정합니다.
    const initialTask = {
        id: task.id,
        title: task.title,
        assignee: task.assignee,
        assignee_id: task.assignee_id,
        status: task.status,
        dueDate: task.dueDate || '',
        priority: task.priority || 'MEDIUM',
        description: task.description || '',
    };
    const [currentTask, setCurrentTask] = useState(initialTask);
    const [comments, setComments] = useState(isCreating
        ? []
        : [
            {
                id: 1,
                author: '김개발',
                content: '백엔드 API 설계 리뷰 완료했습니다. 👍',
                timestamp: '2시간 전',
            },
            {
                id: 2,
                author: '최데브옵스',
                content: 'K8s 환경에서 배포 테스트가 필요합니다.',
                timestamp: '1시간 전',
            },
        ]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // 💡 목표일과 우선순위에 대한 Mock 데이터 및 상태 매핑 (한글화)
    const priorityMap = { HIGH: '높음', MEDIUM: '보통', LOW: '낮음' };
    const statusColorMap = {
        BACKEND: 'bg-blue-600',
        FRONTEND: 'bg-yellow-600',
        DEVOPS: 'bg-purple-600',
        DONE: 'bg-green-600',
        HIGH: 'bg-red-500',
        MEDIUM: 'bg-orange-500',
        LOW: 'bg-gray-500', // 우선순위 색상 재활용
    };
    const handleFieldChange = (field, value) => {
        setCurrentTask((prev) => ({ ...prev, [field]: value }));
    };
    const handleAddComment = () => {
        if (newComment.trim()) {
            const authorName = currentTask.assignee || '사용자 본인';
            setComments([
                ...comments,
                {
                    id: comments.length + 1,
                    author: authorName,
                    content: newComment,
                    timestamp: '방금 전',
                },
            ]);
            setNewComment('');
        }
    };
    const handleSave = () => {
        if (!currentTask.title.trim()) {
            alert('제목은 필수입니다.');
            return;
        }
        setIsLoading(true);
        // 🚧 [Mock API 호출]
        setTimeout(() => {
            alert(isCreating
                ? `[Mock] 태스크 '${currentTask.title}' 생성 완료! (컬럼: ${currentTask.status})`
                : `[Mock] 태스크 '${currentTask.title}' 수정 완료!`);
            // onSave(currentTask); // 부모 컴포넌트에 최종 데이터 전달 (추후 구현)
            setIsLoading(false);
            onClose();
        }, 800);
    };
    const handleDelete = () => {
        if (window.confirm(`정말로 태스크 "${currentTask.title}"을(를) 삭제하시겠습니까?`)) {
            alert(`[Mock] 태스크 삭제 처리 완료.`);
            onClose();
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto", onClick: onClose, children: _jsx("div", { className: "relative w-full max-w-2xl my-8", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: `relative ${theme.colors.card} ${theme.effects.borderWidth} ${theme.colors.border} p-4 sm:p-6 max-h-[90vh] overflow-y-auto ${theme.effects.borderRadius} shadow-xl`, children: [_jsxs("div", { className: `flex items-start justify-between mb-4 pb-4 border-b border-gray-200`, children: [_jsxs("div", { className: "flex-1 pr-4", children: [_jsx("input", { type: "text", value: currentTask.title, onChange: (e) => handleFieldChange('title', e.target.value), placeholder: isCreating ? '새 태스크 제목을 입력하세요 (필수)' : '제목', className: `w-full ${theme.font.size.base} font-bold mb-2 break-words focus:outline-none focus:ring-2 focus:ring-blue-500 ${isCreating ? 'border-b-2 border-blue-200' : 'bg-transparent'}`, disabled: isLoading }), _jsxs("div", { className: "flex items-center gap-2 mt-3", children: [_jsx("div", { className: `w-8 h-8 ${theme.colors.primary} ${theme.effects.cardBorderWidth} ${theme.colors.border} flex items-center justify-center text-white ${theme.font.size.xs} font-bold ${theme.effects.borderRadius}`, children: currentTask.assignee ? currentTask.assignee[0] : '?' }), _jsx("input", { type: "text", value: currentTask.assignee || '', onChange: (e) => handleFieldChange('assignee', e.target.value), placeholder: "\uB2F4\uB2F9\uC790 \uC9C0\uC815", className: `${theme.font.size.sm} border-b border-gray-300 focus:outline-none focus:border-blue-500`, disabled: isLoading })] })] }), _jsx("button", { onClick: onClose, className: `bg-red-500 ${theme.effects.cardBorderWidth} ${theme.colors.border} p-2 hover:bg-red-600 flex-shrink-0 ${theme.effects.borderRadius} transition`, disabled: isLoading, children: _jsx(X, { className: "w-4 h-4 text-white" }) })] }), _jsxs("div", { className: "space-y-4 mb-6 border-b border-gray-200 pb-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: `flex items-center gap-2 ${theme.font.size.xs} mb-2 ${theme.colors.subText} font-semibold`, children: [_jsx(Calendar, { className: "w-4 h-4" }), "\uB9C8\uAC10\uC77C :"] }), _jsx("input", { type: "date", value: currentTask.dueDate, onChange: (e) => handleFieldChange('dueDate', e.target.value), className: `w-full px-3 py-2 ${theme.effects.cardBorderWidth} ${theme.colors.border} bg-gray-50 ${theme.font.size.sm} ${theme.effects.borderRadius} font-medium focus:outline-none focus:ring-2 focus:ring-blue-500`, disabled: isLoading })] }), _jsxs("div", { children: [_jsxs("label", { className: `flex items-center gap-2 ${theme.font.size.xs} mb-2 ${theme.colors.subText} font-semibold`, children: [_jsx(Tag, { className: "w-4 h-4" }), "\uC6B0\uC120 \uC21C\uC704 :"] }), _jsx("select", { value: currentTask.priority, onChange: (e) => handleFieldChange('priority', e.target.value), className: `w-full px-3 py-2 ${theme.effects.cardBorderWidth} ${theme.colors.border} bg-gray-50 ${theme.font.size.sm} ${theme.effects.borderRadius} font-bold focus:outline-none focus:ring-2 focus:ring-blue-500`, disabled: isLoading, children: Object.keys(priorityMap).map((key) => (_jsx("option", { value: key, children: priorityMap[key] }, key))) })] })] }), _jsxs("div", { children: [_jsx("label", { className: `block ${theme.font.size.xs} mb-2 ${theme.colors.subText} font-semibold`, children: isCreating ? '생성될 컬럼 상태:' : '현재 컬럼 상태:' }), _jsx("span", { className: `inline-block px-3 py-2 ${theme.effects.cardBorderWidth} ${theme.colors.border} text-white ${theme.font.size.sm} ${statusColorMap[currentTask.status] || theme.colors.primary} font-bold shadow-sm ${theme.effects.borderRadius}`, children: currentTask.status })] }), _jsxs("div", { children: [_jsx("label", { className: `${theme.font.size.xs} mb-2 ${theme.colors.subText} font-semibold block`, children: "\uC0C1\uC138 \uC124\uBA85:" }), _jsx("textarea", { value: currentTask.description, onChange: (e) => handleFieldChange('description', e.target.value), placeholder: "\uC0C1\uC138 \uB0B4\uC6A9 \uBC0F \uBAA9\uD45C\uB97C \uC785\uB825\uD558\uC138\uC694.", className: `w-full px-3 py-2 ${theme.effects.cardBorderWidth} ${theme.colors.border} bg-gray-50 ${theme.font.size.sm} min-h-24 ${theme.effects.borderRadius} resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`, disabled: isLoading })] })] }), !isCreating && (_jsxs("div", { className: "pt-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(MessageSquare, { className: "w-5 h-5 text-gray-700" }), _jsxs("h3", { className: `${theme.font.size.base} font-bold ${theme.colors.text}`, children: ["\uB313\uAE00 (", comments.length, "\uAC1C)"] })] }), _jsx("div", { className: "space-y-3 mb-4 max-h-60 overflow-y-auto", children: comments.map((comment) => (_jsx("div", { className: `${theme.colors.card} ${theme.effects.cardBorderWidth} ${theme.colors.border} p-3 ${theme.effects.borderRadius} bg-gray-100`, children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx("div", { className: `w-6 h-6 ${theme.colors.primary} ${theme.effects.cardBorderWidth} ${theme.colors.border} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${theme.effects.borderRadius}`, children: comment.author[0] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: `${theme.font.size.xs} font-bold`, children: comment.author }), _jsx("span", { className: `text-[10px] ${theme.colors.subText}`, children: comment.timestamp })] }), _jsx("p", { className: `${theme.font.size.sm} break-words ${theme.colors.text}`, children: comment.content })] })] }) }, comment.id))) }), _jsxs("div", { className: `border-t border-gray-200 pt-3 flex gap-2`, children: [_jsx("input", { type: "text", value: newComment, onChange: (e) => setNewComment(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleAddComment(), placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694...", className: `flex-1 px-3 py-2 border ${theme.font.size.sm} ${theme.effects.borderRadius} focus:outline-none focus:ring-2 focus:focus:ring-blue-500`, disabled: isLoading }), _jsxs("button", { onClick: handleAddComment, disabled: isLoading || !newComment.trim(), className: `${theme.colors.primary} text-white px-4 py-2 ${theme.colors.primaryHover} transition flex items-center justify-center gap-1 ${theme.effects.borderRadius} disabled:bg-gray-400`, children: [_jsx(Send, { className: "w-4 h-4" }), _jsx("span", { className: theme.font.size.xs, children: "\uB4F1\uB85D" })] })] })] })), _jsxs("div", { className: `flex gap-3 mt-6 pt-4 border-t border-gray-300`, children: [_jsx("button", { onClick: handleSave, disabled: isLoading || !currentTask.title.trim(), className: `flex-1 ${theme.colors.primary} text-white py-3 font-bold ${theme.colors.primaryHover} transition ${theme.font.size.sm} ${theme.effects.borderRadius} disabled:opacity-50`, children: isLoading ? '처리 중...' : isCreating ? '태스크 생성' : '태스크 수정 및 저장' }), !isCreating && (_jsx("button", { onClick: handleDelete, className: `bg-red-500 text-white px-4 py-3 font-bold hover:bg-red-600 transition ${theme.font.size.sm} ${theme.effects.borderRadius} disabled:opacity-50`, disabled: isLoading, children: "\uD0DC\uC2A4\uD06C \uC0AD\uC81C" }))] })] }) }) }));
};
export default TaskDetailModal;
