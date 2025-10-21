import React, { useState } from 'react';
// styles
import { ThemeProvider } from './contexts/ThemeContext';
// components
import AuthPage from './pages/Authpage';
import MainDashboard from './pages/Dashboard';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <ThemeProvider>
      <div>
        {!isLoggedIn ? (
          <AuthPage onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <MainDashboard />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;