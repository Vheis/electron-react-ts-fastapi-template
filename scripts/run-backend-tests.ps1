$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $false

$projectRoot = Split-Path -Parent $PSScriptRoot
$backendRoot = Join-Path $projectRoot "backend"
$venvPython = Join-Path $backendRoot "venv\Scripts\python.exe"
$venvConfig = Join-Path $backendRoot "venv\pyvenv.cfg"
$testArgs = @("-m", "unittest", "discover", "-s", "backend/app", "-p", "test_*.py", "-v")

function Invoke-TestCommand {
  param(
    [string]$Command,
    [string[]]$Arguments
  )

  & $Command @Arguments
  return $LASTEXITCODE
}

function Test-Interpreter {
  param(
    [string]$Command,
    [string[]]$Arguments
  )

  $previousErrorPreference = $ErrorActionPreference
  $ErrorActionPreference = "SilentlyContinue"

  try {
    $null = & $Command @Arguments "-c" "import sys; print(sys.executable)" 2>$null
    return $LASTEXITCODE -eq 0
  } catch {
    return $false
  } finally {
    $ErrorActionPreference = $previousErrorPreference
  }
}

function Test-PathSafe {
  param(
    [string]$Path
  )

  try {
    return Test-Path $Path
  } catch {
    return $false
  }
}

$venvBroken = $false

if (Test-Path $venvPython) {
  $venvBaseInterpreter = $null

  if (Test-Path $venvConfig) {
    $venvBaseInterpreter = Get-Content $venvConfig |
      Where-Object { $_ -like "executable = *" } |
      Select-Object -First 1

    if ($venvBaseInterpreter) {
      $venvBaseInterpreter = $venvBaseInterpreter -replace "^executable = ", ""
    }
  }

  if ($venvBaseInterpreter -and -not (Test-PathSafe -Path $venvBaseInterpreter)) {
    $venvBroken = $true
  } elseif (Test-Interpreter -Command $venvPython -Arguments @()) {
    exit (Invoke-TestCommand -Command $venvPython -Arguments $testArgs)
  } else {
    $venvBroken = $true
  }
}

$fallbackInterpreters = @(
  @{ Command = "py"; Arguments = @("-3") },
  @{ Command = "python"; Arguments = @() }
)

foreach ($candidate in $fallbackInterpreters) {
  $command = $candidate.Command
  $arguments = $candidate.Arguments

  if (-not (Get-Command $command -ErrorAction SilentlyContinue)) {
    continue
  }

  if (-not (Test-Interpreter -Command $command -Arguments $arguments)) {
    continue
  }

  $env:PYTHONPATH = $backendRoot
  exit (Invoke-TestCommand -Command $command -Arguments ($arguments + $testArgs))
}

$message = @(
  "Unable to run backend tests because no usable Python interpreter was found."
  "Expected one of: backend\\venv\\Scripts\\python.exe, py -3, or python."
)

if ($venvBroken) {
  $message += "The checked-in backend virtual environment appears to point to a missing base Python installation."
  $message += "Recreate backend\\venv with a local Python install, then reinstall backend\\requirements.txt."
}

Write-Host ($message -join " ")
exit 1
