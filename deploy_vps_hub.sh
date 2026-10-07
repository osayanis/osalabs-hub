#!/bin/bash
# Déploiement du Hub sur le VPS.
# Auth par clé SSH — plus aucun mot de passe en dur.
# Prérequis (une seule fois) : ssh-copy-id "$VPS"
set -euo pipefail

VPS="${VPS:-root@141.11.103.154}"

scp -r src public "$VPS:/var/www/osalabs-hub-next/"
ssh "$VPS" 'cd /var/www/osalabs-hub-next && npm run build && pm2 restart hub'
