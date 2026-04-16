$content = Get-Content "index.html"

$injection = @"
<script src="Js/audio.js"></script>
<script src="Js/input.js"></script>
<script src="Js/main.js"></script>
"@

$content = $content -replace "</body>", "$injection`n</body>"

Set-Content "index.html" $content