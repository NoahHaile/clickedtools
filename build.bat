echo -----------------------------------------------
echo Building auth/backend...
cd auth/backend
start /wait cmd /c "mvn -DskipTests clean package"

echo -----------------------------------------------
echo Building icebreaker-backend...
cd "../Project IceBreaker/icebreaker-backend"
start /wait cmd /c "mvn -DskipTests clean package"

echo -----------------------------------------------
echo Installing npm dependencies...
cd "../icebreaker-frontend"
start /wait cmd /c "npm install && npm run build"

echo -----------------------------------------------
echo Starting Docker Compose...
start /wait cmd /c "docker-compose up --build"

echo -----------------------------------------------
pause
