$ErrorActionPreference = "Stop"

$root = Get-Location
$outputDir = Join-Path $root "data\generated"
$outputFile = Join-Path $outputDir "git.json"

function Get-GitData {
  $count = [int](git rev-list --count HEAD)
  $format = "%H%x1f%h%x1f%s%x1f%cI%x1e"
  $rawLog = ((git log --max-count=8 --date=iso-strict "--pretty=format:$format") -join "`n")

  $commits = @()
  foreach ($entry in ($rawLog -split [char]0x1e)) {
    if ([string]::IsNullOrWhiteSpace($entry)) { continue }
    $parts = $entry -split [char]0x1f
    $hash = if ($parts.Length -gt 0) { $parts[0].Trim() } else { "" }
    $shortHash = if ($parts.Length -gt 1) { $parts[1].Trim() } else { "" }
    $subject = if ($parts.Length -gt 2) { $parts[2].Trim() } else { "" }
    $committedAt = if ($parts.Length -gt 3) { $parts[3].Trim() } else { "" }

    $commits += [ordered]@{
      hash = $hash
      shortHash = $shortHash
      subject = $subject
      body = ""
      committedAt = $committedAt
    }
  }

  return [ordered]@{
    count = $count
    commits = $commits
  }
}

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
$data = Get-GitData
$json = $data | ConvertTo-Json -Depth 4
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($outputFile, $json, $utf8NoBom)
