// 모던 깔끔한 테마
export const modernTheme = {
    name: 'modern',
    cssClass: 'theme-modern',
    colors: {
        primary: 'bg-blue-600',
        primaryHover: 'hover:bg-blue-700',
        primaryDark: 'bg-blue-800',
        secondary: 'bg-white',
        background: 'bg-gray-50',
        card: 'bg-white',
        border: 'border-gray-200',
        text: 'text-gray-900',
        subText: 'text-gray-500',
        textSecondary: 'text-gray-500',
        success: 'bg-green-600',
        successHover: 'hover:bg-green-700',
        info: 'text-blue-600',
        danger: 'text-red-500',
    },
    effects: {
        shadow: '0 1px 3px rgba(0,0,0,0.1)',
        headerShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderWidth: 'border',
        cardBorderWidth: 'border',
        borderRadius: 'rounded-lg',
    },
    font: {
        family: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', sans-serif",
        size: {
            xs: 'text-xs font-semibold',
            sm: 'text-sm font-semibold',
            base: 'text-base font-semibold',
            lg: 'text-lg font-bold',
            xl: 'text-2xl font-bold',
            xxl: 'text-3xl font-bold',
            '3xl': 'text-4xl font-extrabold',
        },
    },
};
// 모든 테마 export
export const themes = {
    modern: modernTheme,
};
