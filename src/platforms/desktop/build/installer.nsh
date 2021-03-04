!macro customInstall
  DetailPrint "Register maha URI Handler"
  DeleteRegKey HKCR "maha"
  WriteRegStr HKCR "maha" "" "URL:maha"
  WriteRegStr HKCR "maha" "URL Protocol" ""
  WriteRegStr HKCR "maha\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCR "maha\shell" "" ""
  WriteRegStr HKCR "maha\shell\Open" "" ""
  WriteRegStr HKCR "maha\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend
