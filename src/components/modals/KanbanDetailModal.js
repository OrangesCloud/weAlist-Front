import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useCallback, useMemo } from 'react';
import { X, Calendar, Tag, User, Settings, Send, Trash, Plus } from 'lucide-react';
// =============================================================================
// MOCK TYPES & CONTEXTS (실제 앱에서는 별도 파일에 정의됨)
// =============================================================================
// 💡 Mock Theme Context (Tailwind CSS를 위한 최소한의 테마 정의)
const useTheme = () => ({
    theme: {
        font: {
            size: { xs: 'text-xs', sm: 'text-sm', base: 'text-lg' },
        },
        colors: {
            primary: 'bg-blue-600',
            primaryText: 'text-blue-600',
            primaryHover: 'hover:bg-blue-700',
            card: 'bg-white',
            border: 'border-gray-200',
            subText: 'text-gray-500',
            success: 'bg-green-500',
        },
        effects: {
            borderRadius: 'rounded-xl',
            cardBorderWidth: 'border',
        },
    },
});
const CustomFieldModal = ({ initialField, onSave, onClose }) => {
    const { theme } = useTheme();
    const [field, setField] = useState(initialField || {
        id: `cf-${Date.now()}`,
        name: '',
        type: 'TEXT',
        options: [],
    });
    const handleSave = () => {
        if (!field.name || !field.type) {
            alert('필드 이름과 타입을 지정해야 합니다.');
            return;
        }
        onSave(field);
        onClose();
    };
    const isSelect = field.type === 'SELECT';
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[60]", children: _jsxs("div", { className: `relative w-full max-w-lg ${theme.colors.card} p-6 ${theme.effects.borderRadius} shadow-2xl`, onClick: (e) => e.stopPropagation(), children: [_jsx("h2", { className: "text-xl font-bold mb-4 border-b pb-2", children: "\uC0AC\uC6A9\uC790 \uC815\uC758 \uD544\uB4DC \uC124\uC815" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: `${theme.font.size.sm} font-semibold mb-1 block`, children: "\uD544\uB4DC \uC774\uB984" }), _jsx("input", { type: "text", value: field.name, onChange: (e) => setField({ ...field, name: e.target.value }), className: "w-full px-3 py-2 border rounded", placeholder: "\uC608: \uC2A4\uD504\uB9B0\uD2B8 \uBC88\uD638, QA \uB2F4\uB2F9\uC790" })] }), _jsxs("div", { children: [_jsx("label", { className: `${theme.font.size.sm} font-semibold mb-1 block`, children: "\uD544\uB4DC \uD0C0\uC785" }), _jsxs("select", { value: field.type, onChange: (e) => {
                                        setField({ ...field, type: e.target.value });
                                    }, className: "w-full px-3 py-2 border rounded", children: [_jsx("option", { value: "TEXT", children: "\uD14D\uC2A4\uD2B8 (Text)" }), _jsx("option", { value: "NUMBER", children: "\uC22B\uC790 (Number)" }), _jsx("option", { value: "DATE", children: "\uB0A0\uC9DC (Date)" }), _jsx("option", { value: "PERSON", children: "\uB2F4\uB2F9\uC790 (Person)" }), _jsx("option", { value: "SELECT", children: "\uC120\uD0DD \uBAA9\uB85D (Select)" })] })] }), isSelect && (_jsxs("div", { className: "border p-3 rounded bg-gray-50", children: [_jsxs("h3", { className: "font-semibold mb-2", children: ["\uC120\uD0DD \uC635\uC158 (", field.options?.length || 0, ")"] }), field.options?.map((opt, index) => (_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("input", { type: "text", value: opt.value, onChange: (e) => {
                                                const newOptions = [...(field.options || [])];
                                                newOptions[index].value = e.target.value;
                                                setField({ ...field, options: newOptions });
                                            }, className: "flex-1 px-2 py-1 border rounded text-sm" }), _jsx("button", { onClick: () => setField({
                                                ...field,
                                                options: field.options?.filter((_, i) => i !== index),
                                            }), className: "text-red-500 hover:text-red-700 text-sm", children: _jsx(Trash, { className: "w-4 h-4" }) })] }, index))), _jsxs("button", { onClick: () => setField({
                                        ...field,
                                        options: [...(field.options || []), { value: '', isDefault: false }],
                                    }), className: "mt-2 text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1", children: [_jsx(Plus, { className: "w-4 h-4" }), " \uC635\uC158 \uCD94\uAC00"] })] })), (isSelect || field.type === 'PERSON') && (_jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", id: "allowMultipleSections", checked: field.allowMultipleSections || false, onChange: (e) => setField({ ...field, allowMultipleSections: e.target.checked }), className: "mr-2" }), _jsx("label", { htmlFor: "allowMultipleSections", className: `${theme.font.size.sm}`, children: "\uB2E4\uC911 \uAC12 \uD5C8\uC6A9 (\uC27C\uD45C\uB85C \uAD6C\uBD84)" })] }))] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: onClose, className: "bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition", children: "\uCDE8\uC18C" }), _jsx("button", { onClick: handleSave, className: `${theme.colors.primary} text-white py-2 px-4 rounded-lg ${theme.colors.primaryHover} transition`, children: "\uC800\uC7A5" })] })] }) }));
};
// =============================================================================
// MAIN MODAL COMPONENT
// =============================================================================
const KanbanDetailModal = ({ kanban, onClose }) => {
    const { theme } = useTheme();
    const isCreating = kanban.id === '';
    // 💡 Mock Custom Fields State
    const [customFields, setCustomFields] = useState([
        {
            id: 'cf-status',
            name: '커스텀 진행단계',
            type: 'SELECT',
            options: [
                { value: 'TO DO', isDefault: true },
                { value: 'IN PROGRESS', isDefault: false },
                { value: 'QA', isDefault: false },
            ],
            allowMultipleSections: false,
        },
        { id: 'cf-sprint', name: '스프린트 번호', type: 'NUMBER' },
    ]);
    // 💡 Mock Comments State
    const [comments, setComments] = useState(kanban.id
        ? [
            {
                id: 1,
                author: '김개발',
                authorId: 'kim1',
                content: '데이터 수집 범위에 대해 검토가 필요합니다.',
                timestamp: '2일 전',
            },
            {
                id: 2,
                author: '박기획',
                authorId: 'park2',
                content: '프론트 디자인 시안 초안 공유했습니다.',
                timestamp: '1일 전',
            },
        ]
        : []);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCustomFieldModal, setShowCustomFieldModal] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState(undefined);
    // 💡 Kanban State with Custom Field Values initialization
    const [currentKanban, setCurrentKanban] = useState(() => ({
        ...kanban,
        customFieldValues: kanban.customFieldValues || {},
        title: kanban.title || '',
        assignee: kanban.assignee || '사용자 본인',
        assignee_id: kanban.assignee_id || 'user_id_123',
        status: kanban.status || 'BACKLOG',
        dueDate: kanban.dueDate || '',
        priority: kanban.priority || 'MEDIUM',
        description: kanban.description || '',
    }));
    // =============================================================================
    // HANDLERS
    // =============================================================================
    const handleFieldChange = React.useCallback((field, value) => {
        setCurrentKanban((prev) => ({ ...prev, [field]: value }));
    }, [setCurrentKanban]);
    const handleCustomFieldChange = useCallback((fieldId, value) => {
        setCurrentKanban((prev) => ({
            ...prev,
            customFieldValues: {
                ...prev.customFieldValues,
                [fieldId]: value,
            },
        }));
    }, []);
    const handleSaveCustomField = useCallback((newField) => {
        setCustomFields((prev) => {
            const existingIndex = prev.findIndex((f) => f.id === newField.id);
            if (existingIndex > -1) {
                return prev.map((f, i) => (i === existingIndex ? newField : f));
            }
            return [...prev, newField];
        });
        setFieldToEdit(undefined);
    }, []);
    const handleAddComment = () => {
        if (!newComment.trim() || isLoading)
            return;
        const authorName = currentKanban.assignee || '익명 사용자';
        setComments((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                author: authorName,
                authorId: currentKanban.assignee_id,
                content: newComment,
                timestamp: '방금 전',
            },
        ]);
        setNewComment('');
    };
    const handleSave = () => {
        if (!currentKanban.title.trim()) {
            // alert() 대신 커스텀 모달을 사용해야 하지만, 여기서는 mock으로 alert을 사용합니다.
            alert('제목은 필수입니다.');
            return;
        }
        setIsLoading(true);
        // 🚧 [Mock API 호출]
        setTimeout(() => {
            // 부모 컴포넌트에 최종 데이터 전달 (추후 구현)
            // onSave(currentKanban);
            const action = isCreating ? '생성' : '수정 및 저장';
            alert(`[Mock] 칸반 '${currentKanban.title}' ${action} 완료!`);
            setIsLoading(false);
            onClose();
        }, 800);
    };
    const handleDelete = () => {
        if (window.confirm(`정말로 칸반 "${currentKanban.title}"을(를) 삭제하시겠습니까?`)) {
            alert(`[Mock] 칸반 삭제 처리 완료.`);
            onClose();
        }
    };
    // =============================================================================
    // RENDERING HELPERS
    // =============================================================================
    const priorityMap = useMemo(() => ({
        HIGH: '높음 (High)',
        MEDIUM: '보통 (Medium)',
        LOW: '낮음 (Low)',
        '': '선택 사항',
    }), []);
    // 💡 Custom Field 렌더링 함수
    const renderCustomField = (field) => {
        const currentValue = currentKanban.customFieldValues?.[field.id] || field.defaultValue || '';
        // 다중 선택 값을 쉼표로 분리하여 표시 (SELECT + allowMultipleSections)
        const displayValue = Array.isArray(currentValue) ? currentValue.join(', ') : currentValue;
        // 입력/선택 필드 렌더링 로직
        const inputField = () => {
            const baseClasses = `w-full px-3 py-2 border ${theme.colors.border} bg-gray-50 text-sm ${theme.effects.borderRadius} focus:ring-2 focus:ring-blue-500`;
            switch (field.type) {
                case 'TEXT':
                case 'PERSON':
                    return (_jsx("input", { type: "text", value: displayValue, onChange: (e) => handleCustomFieldChange(field.id, e.target.value), className: baseClasses, placeholder: field.type === 'PERSON' ? '담당자 이름 입력...' : '텍스트 입력' }));
                case 'NUMBER':
                    return (_jsx("input", { type: "number", value: displayValue, onChange: (e) => handleCustomFieldChange(field.id, Number(e.target.value)), className: baseClasses }));
                case 'DATE':
                    return (_jsx("input", { type: "date", value: displayValue, onChange: (e) => handleCustomFieldChange(field.id, e.target.value), className: baseClasses }));
                case 'SELECT':
                    if (field.allowMultipleSections) {
                        // 다중 선택 (Mock: 텍스트 입력 후 쉼표로 분리)
                        return (_jsx("input", { type: "text", value: displayValue, onChange: (e) => handleCustomFieldChange(field.id, e.target.value.split(',').map((v) => v.trim())), placeholder: "\uAC12\uB4E4\uC744 \uC27C\uD45C(,)\uB85C \uAD6C\uBD84\uD558\uC5EC \uC785\uB825", className: baseClasses }));
                    }
                    return (_jsxs("select", { value: displayValue, onChange: (e) => handleCustomFieldChange(field.id, e.target.value), className: baseClasses, children: [_jsx("option", { value: "", disabled: true, children: "\uC120\uD0DD\uD558\uC138\uC694" }), field.options?.map((opt) => (_jsxs("option", { value: opt.value, children: [opt.value, " ", opt.isDefault ? '(기본)' : ''] }, opt.value)))] }));
                default:
                    return null;
            }
        };
        return (_jsxs("div", { className: "w-full", children: [_jsx("label", { className: `${theme.font.size.xs} mb-2 ${theme.colors.subText} font-semibold block`, children: field.name }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex-1", children: inputField() }), _jsx("button", { onClick: () => {
                                setFieldToEdit(field);
                                setShowCustomFieldModal(true);
                            }, className: "p-1 text-gray-400 hover:text-blue-600 transition flex-shrink-0", title: "\uD544\uB4DC \uC124\uC815/\uC218\uC815", disabled: isLoading, children: _jsx(Settings, { className: "w-4 h-4" }) })] })] }, field.id));
    };
    // 💡 시스템 필드 렌더링 함수 (Assignee, DueDate, Priority)
    const renderSystemField = ({ id, label, icon: Icon, input, }) => (_jsxs("div", { className: "w-full", children: [_jsxs("label", { className: `flex items-center gap-1 ${theme.font.size.xs} mb-2 ${theme.colors.subText} font-semibold`, children: [_jsx(Icon, { className: "w-4 h-4" }), label] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex-1", children: input }), _jsx("button", { onClick: () => setShowCustomFieldModal(true), className: "p-1 text-gray-400 hover:text-red-500 transition flex-shrink-0", title: "\uC2DC\uC2A4\uD15C \uD544\uB4DC \uC124\uC815\uC744 \uBCC0\uACBD\uD558\uB824\uBA74 \uD504\uB85C\uC81D\uD2B8 \uC124\uC815\uC5D0\uC11C \uC9C4\uD589\uD558\uC138\uC694", disabled: isLoading, children: _jsx(Settings, { className: "w-4 h-4" }) })] })] }, id));
    // 💡 System Fields List
    const systemFields = useMemo(() => [
        // 1. 담당자 필드 (Assignee)
        {
            id: 'assignee',
            label: '담당자',
            icon: User,
            input: (_jsx("input", { type: "text", value: currentKanban.assignee || '', onChange: (e) => handleFieldChange('assignee', e.target.value), placeholder: "\uB2F4\uB2F9\uC790 \uC774\uB984 \uAC80\uC0C9...", className: `w-full px-3 py-2 border ${theme.colors.border} bg-gray-50 ${theme.font.size.sm} ${theme.effects.borderRadius} font-medium focus:outline-none focus:ring-2 focus:ring-blue-500`, disabled: isLoading })),
        },
        // 2. 중요도 필드 (Priority)
        {
            id: 'priority',
            label: '중요도 (우선 순위)',
            icon: Tag,
            input: (_jsx("select", { value: currentKanban.priority, onChange: (e) => handleFieldChange('priority', e.target.value), className: `w-full px-3 py-2 border ${theme.colors.border} bg-gray-50 ${theme.font.size.sm} ${theme.effects.borderRadius} font-bold focus:outline-none focus:ring-2 focus:ring-blue-500`, disabled: isLoading, children: Object.entries(priorityMap).map(([key, value]) => (_jsx("option", { value: key, children: value }, key))) })),
        },
        // 3. 마감일 필드 (DueDate)
        {
            id: 'dueDate',
            label: '마감일',
            icon: Calendar,
            input: (_jsx("input", { type: "date", value: currentKanban.dueDate, onChange: (e) => handleFieldChange('dueDate', e.target.value), className: `w-full px-3 py-2 border ${theme.colors.border} bg-gray-50 ${theme.font.size.sm} ${theme.effects.borderRadius} font-medium focus:outline-none focus:ring-2 focus:ring-blue-500`, disabled: isLoading })),
        },
    ], [
        currentKanban,
        handleFieldChange,
        isLoading,
        priorityMap,
        theme.colors.border,
        theme.effects.borderRadius,
        theme.font.size.sm,
    ]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto", onClick: onClose, children: _jsx("div", { className: "relative w-full max-w-2xl my-8", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: `relative ${theme.colors.card} ${theme.effects.cardBorderWidth} ${theme.colors.border} p-4 sm:p-6 max-h-[90vh] overflow-y-auto ${theme.effects.borderRadius} shadow-xl`, children: [_jsxs("div", { className: `flex items-start justify-between mb-4 pb-4`, children: [_jsx("div", { className: "flex-1 pr-4", children: _jsx("input", { type: "text", value: currentKanban.title, onChange: (e) => handleFieldChange('title', e.target.value), placeholder: isCreating ? '새 칸반 제목을 입력하세요 (필수)' : '제목', className: `w-full ${theme.font.size.base} font-bold mb-1 break-words focus:outline-none focus:ring-2 focus:ring-blue-500 ${isCreating ? 'border-b-2 border-blue-200' : 'bg-transparent'}`, disabled: isLoading }) }), _jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "space-y-4 mb-3 border-b border-gray-200 pb-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [systemFields.map(renderSystemField), customFields.map(renderCustomField)] }), _jsxs("button", { onClick: () => {
                                            setFieldToEdit(undefined); // 새 필드 추가
                                            setShowCustomFieldModal(true);
                                        }, className: "w-full text-blue-600 hover:text-blue-800 text-sm font-semibold border-dashed border-2 border-blue-200 hover:border-blue-400 p-2 rounded-lg mt-2 transition flex items-center justify-center gap-2", disabled: isLoading, children: [_jsx(Plus, { className: "w-4 h-4" }), " \uC0AC\uC6A9\uC790 \uC815\uC758 \uD544\uB4DC \uCD94\uAC00"] }), _jsxs("div", { className: "pt-4", children: [_jsx("label", { className: `${theme.font.size.xs} mb-2 ${theme.colors.subText} font-semibold block`, children: "\uC0C1\uC138 \uB0B4\uC6A9:" }), _jsx("textarea", { value: currentKanban.description, onChange: (e) => handleFieldChange('description', e.target.value), placeholder: "\uC0C1\uC138 \uB0B4\uC6A9 \uBC0F \uBAA9\uD45C\uB97C \uC785\uB825\uD558\uC138\uC694.", className: `w-full px-3 py-2 ${theme.effects.cardBorderWidth} ${theme.colors.border} bg-gray-50 ${theme.font.size.sm} min-h-24 ${theme.effects.borderRadius} resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`, disabled: isLoading })] })] }), !isCreating && (_jsxs("div", { className: "mb-6 space-y-4", children: [_jsxs("h3", { className: "font-bold text-gray-700 pb-2", children: ["\uB313\uAE00 (", comments.length, ")"] }), _jsx("div", { className: "max-h-60 overflow-y-auto space-y-3 pr-2", children: comments.length === 0 ? (_jsx("p", { className: `${theme.font.size.sm} ${theme.colors.subText}`, children: "\uC544\uC9C1 \uB313\uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uCCAB \uB313\uAE00\uC744 \uC791\uC131\uD574\uBCF4\uC138\uC694!" })) : (comments.map((comment) => (_jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: `w-8 h-8 ${theme.colors.primary} flex items-center justify-center text-white ${theme.font.size.xs} font-bold rounded-full flex-shrink-0`, children: comment.author[0] }), _jsxs("div", { className: "flex-1 p-3 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex justify-between items-center mb-1", children: [_jsx("span", { className: "font-semibold text-sm", children: comment.author }), _jsx("span", { className: `${theme.font.size.xs} ${theme.colors.subText}`, children: comment.timestamp })] }), _jsx("p", { className: theme.font.size.sm, children: comment.content })] })] }, comment.id)))) }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx("textarea", { value: newComment, onChange: (e) => setNewComment(e.target.value), placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694...", rows: 1, className: `flex-1 px-3 py-2 border ${theme.colors.border} bg-gray-50 ${theme.font.size.sm} ${theme.effects.borderRadius} resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`, disabled: isLoading }), _jsx("button", { onClick: handleAddComment, disabled: !newComment.trim() || isLoading, className: `${theme.colors.primary} text-white p-3 ${theme.colors.primaryHover} ${theme.effects.borderRadius} transition disabled:opacity-50 flex items-center justify-center`, children: _jsx(Send, { className: "w-4 h-4" }) })] })] })), _jsxs("div", { className: `flex gap-3 mt-6 pt-4`, children: [_jsx("button", { onClick: handleSave, disabled: isLoading || !currentKanban.title.trim(), className: `flex-1 ${theme.colors.primary} text-white py-3 font-bold ${theme.colors.primaryHover} transition ${theme.font.size.sm} ${theme.effects.borderRadius} disabled:opacity-50`, children: isLoading ? '처리 중...' : isCreating ? '생성' : '수정 및 저장' }), !isCreating && (_jsx("button", { onClick: handleDelete, className: `bg-red-500 text-white px-4 py-3 font-bold hover:bg-red-600 transition ${theme.font.size.sm} ${theme.effects.borderRadius} disabled:opacity-50`, disabled: isLoading, children: "\uC0AD\uC81C" }))] })] }) }) }), showCustomFieldModal && (_jsx(CustomFieldModal, { initialField: fieldToEdit, onSave: handleSaveCustomField, onClose: () => {
                    setShowCustomFieldModal(false);
                    setFieldToEdit(undefined);
                } }))] }));
};
export default KanbanDetailModal;
