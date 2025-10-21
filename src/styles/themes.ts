export interface Theme {
  name: string;
  cssClass: string; // 전역 CSS 클래스명 추가
  colors: {
    primary: string;
    primaryHover: string;
    primaryDark: string;
    secondary: string;
    background: string;
    card: string;
    border: string;
    text: string;
    textSecondary: string;
  };
  effects: {
    shadow: string;
    headerShadow: string;
    borderWidth: string;
    cardBorderWidth: string;
    borderRadius: string;
  };
}

// 레트로 픽셀 테마
export const retroTheme: Theme = {
  name: 'retro',
  cssClass: 'theme-retro',
  colors: {
    primary: 'bg-orange-500',
    primaryHover: 'hover:bg-orange-600',
    primaryDark: 'bg-orange-700',
    secondary: 'bg-white',
    background: 'bg-gray-100',
    card: 'bg-white',
    border: 'border-black',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
  },
  effects: {
    shadow: '4px 4px 0 #000',
    headerShadow: '0 4px 0 #000',
    borderWidth: 'border-4',
    cardBorderWidth: 'border-2 sm:border-4',
    borderRadius: 'rounded-none',
  },
};

// 모던 깔끔한 테마
export const modernTheme: Theme = {
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
    textSecondary: 'text-gray-500',
  },
  effects: {
    shadow: '0 1px 3px rgba(0,0,0,0.1)',
    headerShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderWidth: 'border',
    cardBorderWidth: 'border',
    borderRadius: 'rounded-lg',
  },
};

// 다크 모드 테마
export const darkTheme: Theme = {
  name: 'dark',
  cssClass: 'theme-dark',
  colors: {
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    primaryDark: 'bg-purple-800',
    secondary: 'bg-gray-800',
    background: 'bg-gray-900',
    card: 'bg-gray-800',
    border: 'border-purple-500',
    text: 'text-gray-100',
    textSecondary: 'text-gray-400',
  },
  effects: {
    shadow: '0 4px 6px rgba(0,0,0,0.5)',
    headerShadow: '0 2px 8px rgba(0,0,0,0.3)',
    borderWidth: 'border-2',
    cardBorderWidth: 'border',
    borderRadius: 'rounded-xl',
  },
};

export const themes = {
  retro: retroTheme,
  modern: modernTheme,
  dark: darkTheme,
};

export type ThemeName = keyof typeof themes;