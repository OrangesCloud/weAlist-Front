import { jsx as _jsx } from "react/jsx-runtime";
import { Palette } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
const ThemeSelector = () => {
    const { theme, themeName, setTheme } = useTheme();
    const themeOptions = [
        { name: 'modern', label: 'MODERN', color: 'bg-blue-600' },
    ];
    return (_jsx("div", { className: "relative inline-block", children: _jsx("div", { className: `relative flex gap-1 sm:gap-2 p-1 ${theme.colors.secondary} ${theme.effects.cardBorderWidth} ${theme.colors.border} ${theme.effects.borderRadius}`, style: theme.name === 'retro' ? { boxShadow: theme.effects.shadow } : { boxShadow: theme.effects.shadow }, children: themeOptions.map((option) => (_jsx("button", { onClick: () => setTheme(option.name), className: `px-2 py-2 ${theme.effects.cardBorderWidth} ${theme.colors.border} transition ${theme.effects.borderRadius} ${themeName === option.name
                    ? `${option.color} text-white`
                    : `${theme.colors.secondary} ${theme.colors.text} hover:bg-gray-100`}`, title: `${option.label} Theme`, children: themeName === option.name ? (_jsx("div", { className: `w-4 h-4 ${option.color} ${theme.effects.cardBorderWidth} ${theme.colors.border}` })) : (_jsx(Palette, { className: "w-4 h-4" })) }, option.name))) }) }));
};
export default ThemeSelector;
