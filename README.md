## 🐳 Запуск проекта через Docker Compose

Перед запуском убедитесь, что порты `3000`, `3001` и `5432` свободны:

### 🔥 Освобождение портов (если заняты)

```bash
# Linux/macOS
sudo lsof -i :3000 | awk 'NR!=1 {print $2}' | xargs kill -9
sudo lsof -i :3001 | awk 'NR!=1 {print $2}' | xargs kill -9
sudo lsof -i :5432 | awk 'NR!=1 {print $2}' | xargs kill -9

# Windows (PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess -Force
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5432).OwningProcess -Force
```

### 🚀 Запуск проекта
```bash
# Перейти в корень проекта
cd forum

# Запустить контейнеры
docker-compose up

# Или для фонового режима:
docker-compose up -d
```

### 🌐 Доступные сервисы
```bash
Frontend: http://localhost:3000

Backend: http://localhost:3001

PostgreSQL: localhost:5432
```

### ⚠️ Устранение проблем
```bash
# Проверить процессы на портах
sudo lsof -i :3000

# Проверить работающие контейнеры
docker ps
```