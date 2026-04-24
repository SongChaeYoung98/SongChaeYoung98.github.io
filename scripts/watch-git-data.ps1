$ErrorActionPreference = "Continue"

$root = Get-Location
$scriptPath = Join-Path $root "scripts\generate-git-data.ps1"
$lastHead = ""

function Get-Head {
  try {
    return (git rev-parse HEAD).Trim()
  } catch {
    return ""
  }
}

while ($true) {
  try {
    $head = Get-Head
    if ($head -and $head -ne $lastHead) {
      & $scriptPath
      $lastHead = $head
    }
  } catch {
  }

  Start-Sleep -Seconds 2
}
