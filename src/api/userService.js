// src/api/userService.ts
import axios from 'axios';
const USER_API_URL = import.meta.env.VITE_REACT_APP_JAVA_API_URL || 'http://localhost:8081';
const userService = axios.create({
    baseURL: USER_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// 💡 그룹 API 함수 정의
// 사용자가 속한 모든 활성 그룹을 조회합니다. (GET /api/groups)
export const getGroups = async (token) => {
    // User Service의 /api/groups는 MessageApiResponse를 반환할 수 있으므로, data.data를 반환하도록 처리 필요
    const response = await userService.get('/api/groups', {
        headers: { Authorization: `Bearer ${token}` },
    });
    // NOTE: User Service의 GET /api/groups 스펙에 따라 MessageApiResponse의 'data' 필드에서
    // Group 배열을 추출해야 할 수 있습니다. (현재 스펙은 MessageApiResponse<any>를 반환함)
    return response.data.data || [];
};
// 새로운 그룹을 생성합니다. (POST /api/groups)
export const createGroup = async (data, token) => {
    const response = await userService.post('/api/groups', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    // NOTE: 성공 시 그룹 객체를 반환한다고 가정합니다. (스펙은 MessageApiResponse)
    return response.data.data;
};
// 사용자 정보를 그룹에 등록/업데이트합니다. (UserInfo 생성: POST /api/userinfo)
export const createUserInfo = async (userId, groupId, token, role = 'MEMBER') => {
    const data = {
        userId: userId,
        groupId: groupId,
        role: role,
    };
    const response = await userService.post('/api/userinfo', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
};
