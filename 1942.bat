start "1942" python2 -m SimpleHTTPServer
rem "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:8000 &
start "C:\Program Files\Mozilla Firefox\firefox.exe" http://localhost:8000
pause
taskkill /im python2.exe /t /f /fi "WINDOWTITLE eq 1942*"