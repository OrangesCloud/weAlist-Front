import { javaApi } from "./common";
export const userService = {
    // 로그인
    login: async (email, password) => {
        const response = await javaApi.post('/auth/login', {
            email,
            password,
        });
        const { accessToken, refreshToken, user } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        return response.data.data;
    },
    // 회원가입
    register: async (email, password, name) => {
        const response = await javaApi.post('/auth/register', {
            email,
            password,
            name,
        });
        return response.data.data;
    },
    // 로그아웃
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },
    // 현재 사용자 정보
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },
    // 사용자 프로필 조회
    getUserProfile: async (userId) => {
        const response = await javaApi.get(`/users/${userId}`);
        return response.data.data;
    },
    // 사용자 프로필 수정
    updateUserProfile: async (userId, data) => {
        const response = await javaApi.put(`/users/${userId}`, data);
        return response.data.data;
    },
    // 토큰 검증
    verifyToken: async () => {
        try {
            const response = await javaApi.get('/auth/verify');
            return response.data.data.valid;
        }
        catch {
            return false;
        }
    },
};
