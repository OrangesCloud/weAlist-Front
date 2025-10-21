// ==========================================
// src/services/boardService.ts
import { Board, Column, Task } from "../types";
import { ApiResponse } from "../types/api";
import { pythonApi } from "./common";

interface CreateBoardRequest {
  title: string;
  description?: string;
}

interface CreateColumnRequest {
  title: string;
  order: number;
}

interface CreateTaskRequest {
  title: string;
  description?: string;
  order: number;
  assigneeId?: number;
}

interface MoveTaskRequest {
  columnId: number;
  order: number;
}

export const boardService = {
  // 보드 목록 조회
  getBoards: async (): Promise<Board[]> => {
    const response = await pythonApi.get<ApiResponse<Board[]>>('/boards');
    return response.data.data;
  },

  // 보드 생성
  createBoard: async (title: string, description?: string): Promise<Board> => {
    const response = await pythonApi.post<ApiResponse<Board>>('/boards', {
      title,
      description,
    } as CreateBoardRequest);
    return response.data.data;
  },

  // 보드 상세 조회
  getBoard: async (boardId: number): Promise<Board> => {
    const response = await pythonApi.get<ApiResponse<Board>>(`/boards/${boardId}`);
    return response.data.data;
  },

  // 보드 수정
  updateBoard: async (boardId: number, data: Partial<Board>): Promise<Board> => {
    const response = await pythonApi.put<ApiResponse<Board>>(`/boards/${boardId}`, data);
    return response.data.data;
  },

  // 보드 삭제
  deleteBoard: async (boardId: number): Promise<void> => {
    await pythonApi.delete(`/boards/${boardId}`);
  },

  // 컬럼 목록 조회
  getColumns: async (boardId: number): Promise<Column[]> => {
    const response = await pythonApi.get<ApiResponse<Column[]>>(`/boards/${boardId}/columns`);
    return response.data.data;
  },

  // 컬럼 생성
  createColumn: async (boardId: number, title: string, order: number): Promise<Column> => {
    const response = await pythonApi.post<ApiResponse<Column>>(
      `/boards/${boardId}/columns`,
      { title, order } as CreateColumnRequest
    );
    return response.data.data;
  },

  // 컬럼 수정
  updateColumn: async (columnId: number, data: Partial<Column>): Promise<Column> => {
    const response = await pythonApi.put<ApiResponse<Column>>(`/columns/${columnId}`, data);
    return response.data.data;
  },

  // 컬럼 삭제
  deleteColumn: async (columnId: number): Promise<void> => {
    await pythonApi.delete(`/columns/${columnId}`);
  },

  // 작업 목록 조회
  getTasks: async (columnId: number): Promise<Task[]> => {
    const response = await pythonApi.get<ApiResponse<Task[]>>(`/columns/${columnId}/tasks`);
    return response.data.data;
  },

  // 작업 생성
  createTask: async (columnId: number, data: CreateTaskRequest): Promise<Task> => {
    const response = await pythonApi.post<ApiResponse<Task>>(`/columns/${columnId}/tasks`, data);
    return response.data.data;
  },

  // 작업 수정
  updateTask: async (taskId: number, data: Partial<Task>): Promise<Task> => {
    const response = await pythonApi.put<ApiResponse<Task>>(`/tasks/${taskId}`, data);
    return response.data.data;
  },

  // 작업 삭제
  deleteTask: async (taskId: number): Promise<void> => {
    await pythonApi.delete(`/tasks/${taskId}`);
  },

  // 작업 이동 (드래그 앤 드롭)
  moveTask: async (taskId: number, columnId: number, order: number): Promise<Task> => {
    const response = await pythonApi.put<ApiResponse<Task>>(
      `/tasks/${taskId}/move`,
      { columnId, order } as MoveTaskRequest
    );
    return response.data.data;
  },
};