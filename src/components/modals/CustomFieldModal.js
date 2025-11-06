import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, ChevronDown, Trash2 } from 'lucide-react';
export const CustomFieldModal = ({ initialField, onSave, onClose, }) => {
    const [fieldData, setFieldData] = useState(initialField || {
        id: '',
        name: '',
        type: 'TEXT',
        options: [],
        allowMultipleSections: false,
    });
    const [newOptionValue, setNewOptionValue] = useState('');
    const isSelectType = fieldData.type === 'SELECT';
    // 필드 유형 옵션
    const fieldTypes = [
        { value: 'TEXT', label: '텍스트' },
        { value: 'SELECT', label: '선택' },
        { value: 'NUMBER', label: '숫자' },
        { value: 'DATE', label: '날짜' },
        { value: 'PERSON', label: '사람' },
    ];
    // 옵션 추가 핸들러 (엔터 및 토글 기반)
    const handleAddOption = () => {
        if (newOptionValue.trim() && isSelectType) {
            setFieldData((prev) => {
                const isDefault = prev.options?.length === 0; // 첫 번째 옵션은 기본값으로 설정
                return {
                    ...prev,
                    options: [
                        ...(prev.options || []).map((opt) => (isDefault ? { ...opt, isDefault: false } : opt)),
                        { value: newOptionValue.trim(), isDefault: isDefault },
                    ],
                };
            });
            setNewOptionValue('');
        }
    };
    // 기본값 설정 핸들러
    const handleSetDefault = (selectedValue) => {
        setFieldData((prev) => ({
            ...prev,
            options: prev.options?.map((opt) => ({
                ...opt,
                isDefault: opt.value === selectedValue,
            })),
        }));
    };
    // 최종 저장 핸들러
    const handleSave = () => {
        if (!fieldData.name.trim()) {
            alert('필드 이름을 입력해주세요.');
            return;
        }
        if (fieldData.type === 'SELECT' && fieldData.options?.length === 0) {
            alert('선택 필드는 옵션을 하나 이상 추가해야 합니다.');
            return;
        }
        onSave({ ...fieldData, id: fieldData.id || `cf-${Date.now()}` });
        onClose();
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]", onClick: onClose, children: _jsx("div", { className: "relative w-full max-w-sm", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "relative bg-white p-6 rounded-xl shadow-2xl", children: [_jsxs("div", { className: "flex justify-between items-center mb-4 pb-3 border-b", children: [_jsx("h3", { className: "text-lg font-bold", children: "\uC0AC\uC6A9\uC790 \uC815\uC758 \uD544\uB4DC \uCD94\uAC00" }), _jsx("button", { onClick: onClose, className: "p-1 rounded-full hover:bg-gray-100", children: _jsx(X, { className: "w-5 h-5 text-gray-500" }) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "\uD544\uB4DC \uC720\uD615" }), _jsxs("div", { className: "relative", children: [_jsx("select", { value: fieldData.type, onChange: (e) => setFieldData({
                                            ...fieldData,
                                            type: e.target.value,
                                            options: e.target.value !== 'SELECT' ? undefined : fieldData.options,
                                            allowMultipleSections: e.target.value !== 'SELECT' ? undefined : fieldData.allowMultipleSections,
                                        }), className: "w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 text-sm", children: fieldTypes.map((type) => (_jsx("option", { value: type.value, children: type.label }, type.value))) }), _jsx(ChevronDown, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "\uD544\uB4DC \uC774\uB984" }), _jsx("input", { type: "text", value: fieldData.name, onChange: (e) => setFieldData({ ...fieldData, name: e.target.value }), placeholder: "\uD544\uB4DC \uC774\uB984 (\uC120\uD0DD \uC0AC\uD56D)", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" })] }), isSelectType && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center mb-4 border-t pt-4", children: [_jsx("label", { className: "text-sm font-semibold text-gray-700", children: "\uC5EC\uB7EC \uC139\uC158 \uD5C8\uC6A9" }), _jsx("div", { onClick: () => setFieldData((prev) => ({
                                            ...prev,
                                            allowMultipleSections: !prev.allowMultipleSections,
                                        })), className: `relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${fieldData.allowMultipleSections ? 'bg-blue-600' : 'bg-gray-200'}`, children: _jsx("span", { className: `inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${fieldData.allowMultipleSections ? 'translate-x-6' : 'translate-x-1'}` }) })] }), _jsx("div", { className: "mb-4", children: _jsx("input", { type: "text", value: newOptionValue, onChange: (e) => setNewOptionValue(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleAddOption(), placeholder: "\uC785\uB825\uD558\uACE0 Enter\uB97C \uB20C\uB7EC \uCD94\uAC00", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" }) }), _jsx("div", { className: "max-h-24 overflow-y-auto mb-4 border rounded-lg p-2 bg-gray-50", children: fieldData.options?.length === 0 ? (_jsx("p", { className: "text-xs text-gray-500 text-center py-2", children: "\uC635\uC158\uC744 \uCD94\uAC00\uD558\uC138\uC694." })) : (fieldData.options?.map((opt, index) => (_jsxs("div", { className: "flex items-center justify-between p-1 hover:bg-white rounded", children: [_jsx("span", { className: "text-sm", children: opt.value }), _jsxs("div", { className: "flex items-center space-x-2", children: [opt.isDefault && (_jsx("span", { className: "text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full", children: "\uAE30\uBCF8\uAC12" })), _jsx("button", { onClick: () => {
                                                        setFieldData((prev) => ({
                                                            ...prev,
                                                            options: prev.options?.filter((o) => o.value !== opt.value),
                                                        }));
                                                    }, className: "text-gray-400 hover:text-red-500 p-1", children: _jsx(Trash2, { className: "w-3 h-3" }) })] })] }, index)))) })] })), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "\uAE30\uBCF8\uAC12" }), _jsxs("div", { className: "relative", children: [isSelectType ? (_jsx(_Fragment, { children: fieldData.options && fieldData.options.length > 0 ? (_jsxs("select", { value: fieldData.options.find((opt) => opt.isDefault)?.value || '', onChange: (e) => handleSetDefault(e.target.value), className: "w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 text-sm", children: [_jsx("option", { value: "", disabled: true, children: "\uC635\uC158\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694." }), fieldData.options.map((opt) => (_jsx("option", { value: opt.value, children: opt.value }, opt.value)))] })) : (_jsx("div", { className: "w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 text-sm", children: "\uC635\uC158\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694." })) })) : (
                                    // 💡 SELECT 타입이 아닐 때의 기본값 입력 필드 (TEXT/NUMBER/DATE)
                                    _jsx("input", { type: fieldData.type === 'NUMBER'
                                            ? 'number'
                                            : fieldData.type === 'DATE'
                                                ? 'date'
                                                : 'text', value: fieldData.defaultValue || '', onChange: (e) => setFieldData({ ...fieldData, defaultValue: e.target.value }), placeholder: `기본 ${fieldData.type === 'TEXT'
                                            ? '텍스트'
                                            : fieldData.type === 'NUMBER'
                                                ? '숫자'
                                                : '값'} 입력`, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" })), isSelectType && (_jsx(ChevronDown, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" }))] })] }), _jsxs("div", { className: "flex justify-end space-x-3 pt-3 border-t", children: [_jsx("button", { onClick: onClose, className: "px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold", children: "\uCDE8\uC18C" }), _jsx("button", { onClick: handleSave, className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold", children: "\uC800\uC7A5" })] })] }) }) }));
};
