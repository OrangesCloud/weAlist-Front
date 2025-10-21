# 🎯 칸반 프로젝트 관리 도구

React 기반의 
드래그 앤 드롭 기능을 지원하는 칸반 보드 프로젝트 관리 도구입니다.

### 주요 기능

- ✅ 사용자 인증 (이메일, Google, GitHub, Kakao)
- ✅ 보드 생성 및 관리
- ✅ 칸반 컬럼 관리
- ✅ 작업 카드 드래그 앤 드롭
- ✅ 실시간 협업 (예정)

## 🛠 기술 스택

### Frontend
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Axios** - HTTP 클라이언트
- **Tailwind CSS** - 스타일링
- **React Beautiful DnD** - 드래그 앤 드롭 (예정)

### Backend
- **Java (Spring Boot)** - 사용자 관리 서비스
- **Python (FastAPI)** - 보드 관리 서비스

### Infrastructure
- **AWS EC2** - 백엔드 서버 호스팅

## 🏗 아키텍처

### 마이크로서비스 구조

```
┌─────────────────┐
│  React Frontend │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌──────────┐
│  Java  │ │  Python  │
│  API   │ │   API    │
│ :8080  │ │  :8000   │
└────────┘ └──────────┘
    │           │
    │           │
 [User DB]  [Board DB]
```

### 서비스 분리

**Java 서비스 (User Service)**
- 사용자 인증 및 관리
- JWT 토큰 발급/검증
- 사용자 프로필 관리

**Python 서비스 (Board Service)**
- 보드 CRUD
- 칸반 컬럼 관리
- 작업 카드 관리
- 드래그 앤 드롭 로직

## 📁 프로젝트 구조

```
kanban-project/
├── src/
│   ├── types/
│   │   └── index.ts              # TypeScript 타입 정의
│   ├── services/
│   │   ├── api.ts                # Axios 인스턴스 설정
│   │   ├── userService.ts        # Java API 호출
│   │   └── boardService.ts       # Python API 호출
│   ├── pages/
│   │   ├── Login.tsx             # 로그인 페이지
│   │   ├── Dashboard.tsx         # 메인 대시보드
│   │   └── Board.tsx             # 칸반 보드
│   ├── components/
│   │   ├── Header.tsx            # 헤더 컴포넌트
│   │   ├── Column.tsx            # 칸반 컬럼
│   │   └── TaskCard.tsx          # 작업 카드
│   └── App.tsx
├── .env                          # 개발 환경 변수
├── .env.production              # 프로덕션 환경 변수
├── .env.example                 # 환경 변수 템플릿
├── package.json
└── README.md
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn
- Java 백엔드 서버 (Port 8080)
- Python 백엔드 서버 (Port 8000)

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/your-username/kanban-project.git
cd kanban-project
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
```bash
cp .env.example .env
```

`.env` 파일을 열어 API URL 설정:
```env
REACT_APP_JAVA_API_URL=http://localhost:8080/api
REACT_APP_PYTHON_API_URL=http://localhost:8000/api
```

4. **개발 서버 실행**
```bash
npm start
```

브라우저에서 `http://localhost:3000` 접속

## 📡 API 문서

### User Service (Java - Port 8080)

#### 인증
```typescript
// 로그인
POST /api/auth/login
Body: { email: string, password: string }
Response: { success: boolean, data: { accessToken, refreshToken, user } }

// 회원가입
POST /api/auth/register
Body: { email: string, password: string, name: string }

// 토큰 갱신
POST /api/auth/refresh
Body: { refreshToken: string }

// 토큰 검증
GET /api/auth/verify
```

#### 사용자
```typescript
// 프로필 조회
GET /api/users/:userId

// 프로필 수정
PUT /api/users/:userId
Body: { name?: string, profileImage?: string }
```

### Board Service (Python - Port 8000)

#### 보드
```typescript
// 보드 목록
GET /api/boards

// 보드 생성
POST /api/boards
Body: { title: string, description?: string }

// 보드 상세
GET /api/boards/:boardId

// 보드 수정
PUT /api/boards/:boardId

// 보드 삭제
DELETE /api/boards/:boardId
```

#### 컬럼
```typescript
// 컬럼 목록
GET /api/boards/:boardId/columns

// 컬럼 생성
POST /api/boards/:boardId/columns
Body: { title: string, order: number }

// 컬럼 수정
PUT /api/columns/:columnId

// 컬럼 삭제
DELETE /api/columns/:columnId
```

#### 작업
```typescript
// 작업 목록
GET /api/columns/:columnId/tasks

// 작업 생성
POST /api/columns/:columnId/tasks
Body: { title: string, description?: string, order: number }

// 작업 수정
PUT /api/tasks/:taskId

// 작업 삭제
DELETE /api/tasks/:taskId

// 작업 이동 (드래그 앤 드롭)
PUT /api/tasks/:taskId/move
Body: { columnId: number, order: number }
```

## 💻 개발 가이드

### 서비스 사용 예시

```typescript
import { userService } from './services/userService';
import { boardService } from './services/boardService';

// 로그인
const loginUser = async () => {
  try {
    const response = await userService.login('user@example.com', 'password');
    console.log('Logged in:', response.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// 보드 조회
const loadBoards = async () => {
  try {
    const boards = await boardService.getBoards();
    console.log('Boards:', boards);
  } catch (error) {
    console.error('Failed to load boards:', error);
  }
};

// 작업 이동
const moveTask = async (taskId: number, columnId: number, order: number) => {
  try {
    await boardService.moveTask(taskId, columnId, order);
    console.log('Task moved successfully');
  } catch (error) {
    console.error('Failed to move task:', error);
  }
};
```

### CORS 설정

#### Java (Spring Boot)
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

#### Python (FastAPI)
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🚢 배포

### AWS EC2 배포 가이드

1. **환경 변수 설정 (프로덕션)**
```bash
# .env.production
REACT_APP_JAVA_API_URL=http://your-java-ec2.compute.amazonaws.com:8080/api
REACT_APP_PYTHON_API_URL=http://your-python-ec2.compute.amazonaws.com:8000/api
NODE_ENV=production
```

2. **프로덕션 빌드**
```bash
npm run build
```

3. **정적 파일 서빙**
```bash
# serve 설치
npm install -g serve

# 실행
serve -s build -l 3000
```

### 백엔드 서버 구성

**Java 서비스 (EC2)**
- Port: 8080
- 사용자 인증 및 관리
- JWT 토큰 처리

**Python 서비스 (EC2)**
- Port: 8000
- 보드 및 칸반 관리
- 작업 데이터 처리

### 보안 그룹 설정

```
Java EC2:
- Inbound: 8080 (HTTP)
- Inbound: 22 (SSH, 관리용)

Python EC2:
- Inbound: 8000 (HTTP)
- Inbound: 22 (SSH, 관리용)

Frontend (S3 + CloudFront 또는 EC2):
- Inbound: 80 (HTTP)
- Inbound: 443 (HTTPS)
```

## 🔮 향후 계획

- [ ] API Gateway 도입
- [ ] WebSocket을 통한 실시간 협업
- [ ] 파일 첨부 기능
- [ ] 알림 시스템
- [ ] 다크 모드
- [ ] 모바일 반응형 개선
- [ ] Docker 컨테이너화
- [ ] CI/CD 파이프라인 구축

## 📝 라이선스

MIT License

## 👥 기여

Pull Request는 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
