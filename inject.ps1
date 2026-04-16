$content = Get-Content "Zagor.html"

$injection = @"
<script src="js/audio.js"></script>
<script src="js/input.js"></script>
<script src="js/main.js"></script>
"@

$content = $content -replace "</body>", "$injection`n</body>"

Set-Content "Zagor.html" $content