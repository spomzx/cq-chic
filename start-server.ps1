# Simple HTTP Server

# Create HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:6060/")
$listener.Start()

# Show server info
Write-Host "Server started, visit http://localhost:6060/ to view the website"
Write-Host "Press Ctrl+C to stop the server"

try {
    while ($listener.IsListening) {
        # Get context
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Get requested file path
        $filePath = $request.Url.LocalPath
        if ($filePath -eq "/") {
            $filePath = "/index.html"
        }

        $fullPath = Join-Path (Get-Location) $filePath.Substring(1)

        # Check if file exists
        if (Test-Path $fullPath -PathType Leaf) {
            # Set correct Content-Type
            $extension = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $contentType = switch ($extension) {
                ".html" { "text/html; charset=utf-8" }
                ".css" { "text/css; charset=utf-8" }
                ".js" { "application/javascript; charset=utf-8" }
                ".svg" { "image/svg+xml" }
                default { "application/octet-stream" }
            }
            $response.ContentType = $contentType

            # Read and send file content
            $content = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            # File not found
            $response.StatusCode = 404
            $response.ContentType = "text/html; charset=utf-8"
            $content = [System.Text.Encoding]::UTF8.GetBytes("<html><body><h1>404 Page Not Found</h1></body></html>")
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        }

        $response.Close()
    }
} 
catch {
    Write-Host "Error occurred: $_"
} 
finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "Server stopped"
}