# Script de configuration automatique de la cle API TMDB
# Usage: .\configurer-tmdb.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Configuration Cle API TMDB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifier si le fichier .env.local existe
if (-not (Test-Path .env.local)) {
    Write-Host "ERREUR: Le fichier .env.local n'existe pas!" -ForegroundColor Red
    Write-Host "   Creez d'abord le fichier .env.local avec vos variables Supabase." -ForegroundColor Yellow
    exit 1
}

# Lire le contenu actuel
$envContent = Get-Content .env.local -Raw

# Verifier si NEXT_PUBLIC_TMDB_API_KEY existe deja
if ($envContent -match 'NEXT_PUBLIC_TMDB_API_KEY') {
    Write-Host "Cle API TMDB actuelle trouvee dans .env.local" -ForegroundColor Yellow
    
    # Extraire la cle actuelle
    if ($envContent -match 'NEXT_PUBLIC_TMDB_API_KEY=(.+)') {
        $currentKey = $matches[1].Trim()
        if ($currentKey -ne 'your_tmdb_api_key_here' -and $currentKey -ne '') {
            $keyPreview = $currentKey.Substring(0, [Math]::Min(20, $currentKey.Length))
            Write-Host "   Cle actuelle: $keyPreview..." -ForegroundColor Gray
            Write-Host ""
            Write-Host "ATTENTION: Une cle API est deja configuree." -ForegroundColor Yellow
            $replace = Read-Host "   Voulez-vous la remplacer? (O/N)"
            if ($replace -ne 'O' -and $replace -ne 'o' -and $replace -ne 'Y' -and $replace -ne 'y') {
                Write-Host ""
                Write-Host "Configuration annulee." -ForegroundColor Green
                exit 0
            }
        }
    }
}

Write-Host ""
Write-Host "Instructions pour obtenir votre cle API TMDB (GRATUITE):" -ForegroundColor Cyan
Write-Host "   1. Allez sur https://www.themoviedb.org" -ForegroundColor White
Write-Host "   2. Creez un compte gratuit (Sign Up)" -ForegroundColor White
Write-Host "   3. Allez dans Settings > API > Request an API Key" -ForegroundColor White
Write-Host "   4. Choisissez 'Developer' (gratuit)" -ForegroundColor White
Write-Host "   5. Remplissez le formulaire et copiez votre cle API" -ForegroundColor White
Write-Host ""
Write-Host "Votre cle API ressemble a: abc123def456ghi789jkl012mno345pq" -ForegroundColor Gray
Write-Host ""

# Demander la cle API
$apiKey = Read-Host "Entrez votre cle API TMDB"

# Valider la cle
if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host ""
    Write-Host "ERREUR: La cle API ne peut pas etre vide!" -ForegroundColor Red
    exit 1
}

if ($apiKey.Length -lt 20) {
    Write-Host ""
    Write-Host "ATTENTION: La cle API semble trop courte. Etes-vous sur qu'elle est correcte?" -ForegroundColor Yellow
    $confirm = Read-Host "   Continuer quand meme? (O/N)"
    if ($confirm -ne 'O' -and $confirm -ne 'o' -and $confirm -ne 'Y' -and $confirm -ne 'y') {
        Write-Host ""
        Write-Host "Configuration annulee." -ForegroundColor Green
        exit 0
    }
}

# Remplacer ou ajouter la cle API
if ($envContent -match 'NEXT_PUBLIC_TMDB_API_KEY') {
    # Remplacer la ligne existante
    $newContent = $envContent -replace 'NEXT_PUBLIC_TMDB_API_KEY=.*', "NEXT_PUBLIC_TMDB_API_KEY=$apiKey"
} else {
    # Ajouter la ligne a la fin
    $newContent = $envContent.TrimEnd() + "`nNEXT_PUBLIC_TMDB_API_KEY=$apiKey"
}

# Sauvegarder
try {
    $newContent | Set-Content .env.local -NoNewline
    Write-Host ""
    Write-Host "Cle API TMDB configuree avec succes!" -ForegroundColor Green
    Write-Host "   Fichier: .env.local" -ForegroundColor Gray
    $keyPreview = $apiKey.Substring(0, [Math]::Min(20, $apiKey.Length))
    Write-Host "   Cle: $keyPreview..." -ForegroundColor Gray
    
    Write-Host ""
    Write-Host "Prochaines etapes:" -ForegroundColor Cyan
    Write-Host "   1. Redemarrez votre serveur de developpement" -ForegroundColor White
    Write-Host "      (Arretez avec Ctrl+C, puis relancez: npm run dev)" -ForegroundColor Gray
    Write-Host "   2. Rechargez votre page web" -ForegroundColor White
    Write-Host "   3. Les films devraient maintenant afficher de vraies images!" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "ERREUR lors de l'ecriture du fichier: $_" -ForegroundColor Red
    exit 1
}
