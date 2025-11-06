const API_BASE_URL = 'http://localhost:8000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzYxMTQwMTQyLCJpYXQiOjE3NjEwNTM3NDJ9.hLA-qgb4RfyEkSUM1Iymivp1GdxWzlRst34SNbAhznU';
class HealthService {
    static checkHealth() {
        throw new Error('Method not implemented.');
    }
    getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        };
    }
    async checkHealth() {
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'GET',
            headers: this.getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error(`Failed to list workspaces: ${response.statusText}`);
        }
        return response.json();
    }
}
export const healthService = new HealthService();
export default healthService;
