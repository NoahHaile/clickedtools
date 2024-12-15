@echo off
REM A batch file to send multiple POST requests to localhost:8080/api/lines with Authorization

REM Endpoint URL
set URL=http://localhost:8080/api/lines

REM Authorization Token
set AUTH_HEADER=Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiMTExODY2Mjg2NjMwMDAxNjk5MjUxIiwiZXhwIjoxNzM2MzM2MzU4LCJpYXQiOjE3MzM3NDQzNTgsInNjb3BlIjoidXNlciJ9.gMxxzZeiewRpAYzsG4tzl2c06sQS-s_BK_JwKQ5_Cm6CiGxbK6j8ALDbw8XDaTpHl1jnJ6qusY82JIWLueDMBQ
set ADMIN_HEADER=APP_KEY: YvwxG92aQs7lfhiel1RsKDe59MLotfgD

REM JSON Data Variations
set DATA1={\"opening\":\"If you could live anywhere in the world, where would it be?\",\"bestUsed\":\"Travel-related discussions or casual meetups\",\"demonstrationUrl\":\"https://www.youtube.com/watch?v=vVkfxIlZFY0\"}
set DATA2={\"opening\":\"What’s the most adventurous thing you’ve ever done?\",\"bestUsed\":\"Outdoor events or adventure-themed settings\",\"demonstrationUrl\":\"https://www.youtube.com/watch?v=vVkfxIlZFY0\"}
set DATA3={\"opening\":\"Do you believe in fate or free will?\",\"bestUsed\":\"Philosophical conversations or quieter settings\",\"demonstrationUrl\":\"https://www.youtube.com/watch?v=vVkfxIlZFY0\"}
set DATA4={\"opening\":\"What’s the one skill you’ve always wanted to learn?\",\"bestUsed\":\"Skill-based workshops or creative spaces\",\"demonstrationUrl\":\"https://www.youtube.com/watch?v=vVkfxIlZFY0\"}
set DATA5={\"opening\":\"What’s a movie or TV show you could rewatch forever?\",\"bestUsed\":\"Movie nights or entertainment-related gatherings\",\"demonstrationUrl\":\"https://www.youtube.com/watch?v=vVkfxIlZFY0\"}
set DATA6={\"opening\":\"What’s the best piece of advice you’ve ever received?\",\"bestUsed\":\"Networking events or professional meetups\",\"demonstrationUrl\":\"https://www.youtube.com/watch?v=vVkfxIlZFY0\"}
set DATA7={\"opening\":\"If you had to delete all but three apps on your phone, which ones would you keep?\",\"bestUsed\":\"Tech meetups or casual conversations\",\"demonstrationUrl\":\"https://www.youtube.com/watch?v=vVkfxIlZFY0\"}
set DATA8={\"opening\":\"What’s one thing you’re really proud of but rarely get to share?\",\"bestUsed\":\"One-on-one conversations or personal storytelling moments\",\"demonstrationUrl\":\"https://www.youtube.com/watch?v=vVkfxIlZFY0\"}

REM Send POST requests
curl -X POST -H "Content-Type: application/json" -H "%AUTH_HEADER%" -H "%ADMIN_HEADER%" -d "%DATA1%" %URL%
curl -X POST -H "Content-Type: application/json" -H "%AUTH_HEADER%" -H "%ADMIN_HEADER%" -d "%DATA2%" %URL%
curl -X POST -H "Content-Type: application/json" -H "%AUTH_HEADER%" -H "%ADMIN_HEADER%" -d "%DATA3%" %URL%
curl -X POST -H "Content-Type: application/json" -H "%AUTH_HEADER%" -H "%ADMIN_HEADER%" -d "%DATA4%" %URL%
curl -X POST -H "Content-Type: application/json" -H "%AUTH_HEADER%" -H "%ADMIN_HEADER%" -d "%DATA5%" %URL%
curl -X POST -H "Content-Type: application/json" -H "%AUTH_HEADER%" -H "%ADMIN_HEADER%" -d "%DATA6%" %URL%
curl -X POST -H "Content-Type: application/json" -H "%AUTH_HEADER%" -H "%ADMIN_HEADER%" -d "%DATA7%" %URL%
curl -X POST -H "Content-Type: application/json" -H "%AUTH_HEADER%" -H "%ADMIN_HEADER%" -d "%DATA8%" %URL%

echo All requests sent.
pause
