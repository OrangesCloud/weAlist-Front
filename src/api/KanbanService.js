// src/api/kanbanService.ts
// 💡 API 함수 정의
// 💡 새로운 Mock API 함수: Workspace 생성 Mock
export const mockCreateWorkspace = async (data, token) => {
    console.log(token);
    // 1초 딜레이 (네트워크 효과)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // 성공했다고 가정하고 더미 응답 반환
    const mockWorkspace = {
        id: `ws-${Math.random().toString(36).substring(2, 10)}`, // 랜덤 ID
        name: data.name,
        created_by: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Mock User ID
    };
    return mockWorkspace;
};
// 새로운 워크스페이스를 생성합니다. (POST /api/workspaces/)
// export const createWorkspace = async (
//   data: WorkspaceCreate,
//   token: string,
// ): Promise<WorkspaceResponse> => {
//   const response = await kanbanService.post('/api/workspaces/', data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   // FastAPI는 생성 시 201 응답과 함께 생성된 객체를 반환합니다.
//   return response.data;
// };
export const createWorkspace = mockCreateWorkspace;
