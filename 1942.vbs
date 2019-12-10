'
'
'

PY_SERVER = "python2 -m SimpleHTTPServer"
FFOX = """C:\Program Files\Mozilla Firefox\firefox.exe"" http://localhost:8000"
KILL_PY = "taskkill /im python2.exe /t /f"

Set shell = WScript.CreateObject("WScript.Shell")

shell.Run PY_SERVER, 1, False
shell.Run FFOX, 1, True

strComputer = "."
Set oWMI = GetObject("winmgmts:\\" & strComputer & "\root\cimv2")
Set colEvents = oWMI.ExecNotificationQuery( _
    "SELECT * FROM __InstanceDeletionEvent WITHIN 1 " &_
    "WHERE TargetInstance ISA 'Win32_Process' " &_
    "AND TargetInstance.Name = 'firefox.exe'")
Set oEvent = colEvents.NextEvent

shell.Run KILL_PY, 0, False

'
'
'