#!/bin/bash
# docker.sh

NETWORK_NAME="wealist-net"

echo "🚀 Starting WeAlist Frontend Development Environment..."

# ==========================================
# 1. 필수 파일 검사 (.env)
# ==========================================
if [ ! -f .env ]; then
    echo "🚨 Error: .env file not found! Please create one in the root directory."
    exit 1
fi

# ==========================================
# 2. 공통 네트워크 검사 및 생성 (핵심)
# ==========================================
# 네트워크가 존재하지 않을 경우에만 생성합니다.
if [ -z "$(docker network ls -q -f name=^${NETWORK_NAME}$)" ]; then
    echo "🔗 Creating common network: ${NETWORK_NAME}..."
    docker network create ${NETWORK_NAME}
else
    echo "🔗 Common network ${NETWORK_NAME} already exists."
fi

# ==========================================
# 3. Docker Compose 실행
# ==========================================
echo "📦 Running frontend container..."
# -d (detached mode)를 사용하면 백그라운드에서 실행되고 터미널을 돌려줍니다.
# 개발 로그를 보려면 -d를 제거하세요.

docker compose up 

echo "✅ Frontend container is running and connected to ${NETWORK_NAME}."