import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { X, Camera, MessageSquare } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
const UserProfileModal = ({ user, onClose }) => {
    const { theme } = useTheme();
    // Ref for file input
    const fileInputRef = useRef(null);
    const mockUserId = 'user-c4t9x-d2e8y-p6r0s';
    const isGoogleConnected = true;
    // 상태 관리
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    // 💡 프로필 이미지 미리보기 URL 상태
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
    // --- 프로필 사진 변경 로직 ---
    // 💡 파일 입력 필드 클릭 트리거
    const handleAvatarChangeClick = () => {
        fileInputRef.current?.click();
    };
    // 💡 파일 선택 시 미리보기 처리
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // 이전에 생성된 URL이 있다면 해제 (메모리 누수 방지)
            if (avatarPreviewUrl) {
                URL.revokeObjectURL(avatarPreviewUrl);
            }
            // 새 파일의 URL 생성 및 상태 업데이트
            setAvatarPreviewUrl(URL.createObjectURL(file));
            console.log(`[File] 새로운 프로필 사진 파일 선택됨: ${file.name}`);
            // TODO: 파일 객체를 상태에 저장하거나, base64로 변환하여 서버에 업로드할 준비를 해야 합니다.
        }
    };
    // --- DM 및 저장 로직 ---
    // DM 버튼 클릭 핸들러 (Mock)
    const handleDmClick = () => {
        console.log(`[DM] ${user.name} 님에게 DM 보내기 요청`);
        // TODO: 실제 DM 기능(채팅 모듈) 구현 필요
        onClose();
    };
    // 저장 버튼 클릭 핸들러 (Mock)
    const handleSave = () => {
        console.log(`[저장] 사용자 정보 업데이트: ${name}, ${email}`);
        if (avatarPreviewUrl) {
            console.log(`[저장] 새 프로필 사진을 서버에 업로드해야 합니다.`);
            // TODO: 여기서 실제 파일 업로드 API 호출 및 DB 업데이트 로직 구현
        }
        onClose();
    };
    // --- 모달 닫힐 때 정리 ---
    // 💡 모달이 닫힐 때 객체 URL을 해제하여 메모리 정리
    const handleClose = () => {
        if (avatarPreviewUrl) {
            URL.revokeObjectURL(avatarPreviewUrl);
        }
        onClose();
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", onClick: handleClose, children: _jsx("div", { className: "relative w-full max-w-md", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: `relative ${theme.colors.card} ${theme.effects.borderWidth} ${theme.colors.border} p-6 ${theme.effects.borderRadius} shadow-xl`, children: [_jsxs("div", { className: `flex items-center justify-between mb-6 pb-4 ${theme.effects.borderWidth} ${theme.colors.border} border-t-0 border-l-0 border-r-0`, children: [_jsx("h2", { className: `${theme.font.size.base} font-bold text-gray-800`, children: "\uC0AC\uC6A9\uC790 \uC815\uBCF4 \uC218\uC815" }), _jsx("button", { onClick: handleClose, className: `bg-red-500 ${theme.effects.cardBorderWidth} ${theme.colors.border} p-2 hover:bg-red-600 ${theme.effects.borderRadius} transition`, children: _jsx(X, { className: "w-4 h-4 text-white" }) })] }), _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "flex flex-col items-center mb-6", children: [_jsxs("div", { className: "relative", children: [avatarPreviewUrl ? (_jsx("img", { src: avatarPreviewUrl, alt: "\uD504\uB85C\uD544 \uBBF8\uB9AC\uBCF4\uAE30", className: `w-28 h-28 object-cover ${theme.effects.borderWidth} ${theme.colors.border} rounded-full` })) : (_jsx("div", { className: `w-28 h-28 ${theme.colors.primary} ${theme.effects.borderWidth} ${theme.colors.border} flex items-center justify-center text-white text-4xl font-bold ${theme.effects.borderRadius} rounded-full`, children: user.name[0] })), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileChange, accept: "image/*", className: "hidden" }), _jsx("button", { onClick: handleAvatarChangeClick, className: "absolute bottom-0 right-0 p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full transition shadow-md", title: "\uD504\uB85C\uD544 \uC0AC\uC9C4 \uBCC0\uACBD", children: _jsx(Camera, { className: "w-4 h-4" }) })] }), _jsxs("button", { onClick: handleDmClick, className: `mt-3 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition shadow-md`, children: [_jsx(MessageSquare, { className: "w-4 h-4" }), "DM \uBCF4\uB0B4\uAE30"] })] }), _jsxs("div", { children: [_jsx("label", { className: `block ${theme.font.size.xs} mb-2 text-gray-500 font-medium`, children: "\uC0AC\uC6A9\uC790 ID (\uACE0\uC720 \uC2DD\uBCC4\uC790):" }), _jsx("input", { type: "text", readOnly: true, disabled: true, value: mockUserId, className: `w-full px-3 py-2 border border-gray-300 text-gray-700 text-xs rounded-md 
              disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed focus:outline-none` })] }), _jsxs("div", { children: [_jsx("label", { className: `block ${theme.font.size.xs} mb-2 text-gray-500 font-medium`, children: "\uC774\uB984:" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), className: `w-full px-3 py-2 ${theme.effects.cardBorderWidth} ${theme.colors.border} ${theme.colors.card} ${theme.font.size.xs} ${theme.effects.borderRadius} focus:outline-none focus:ring-2 focus:ring-blue-500` })] }), _jsxs("div", { children: [_jsx("label", { className: `block ${theme.font.size.xs} mb-2 text-gray-500 font-medium`, children: "\uC774\uBA54\uC77C:" }), _jsxs("div", { className: "relative", children: [_jsx("input", { disabled: true, type: "email", value: email, readOnly: true, onChange: (e) => setEmail(e.target.value), className: `w-full px-3 py-2 border border-gray-300 text-gray-700 text-xs rounded-md 
              disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed focus:outline-none` }), isGoogleConnected && (_jsx("span", { className: "absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full", children: "Google \uC5F0\uB3D9" }))] })] }), _jsxs("div", { className: "flex gap-2 pt-4", children: [_jsx("button", { onClick: handleSave, className: `flex-1 ${theme.colors.primary} text-white py-3 ${theme.effects.cardBorderWidth} ${theme.colors.border} ${theme.colors.primaryHover} transition ${theme.font.size.xs} ${theme.effects.borderRadius} font-semibold`, children: "\uC800\uC7A5" }), _jsx("button", { onClick: handleClose, className: `flex-1 bg-gray-300 py-3 ${theme.effects.cardBorderWidth} ${theme.colors.border} text-gray-800 hover:bg-gray-400 transition ${theme.font.size.xs} ${theme.effects.borderRadius} font-semibold`, children: "\uCDE8\uC18C" })] })] })] }) }) }));
};
export default UserProfileModal;
