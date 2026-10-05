#!/bin/bash
sshpass -p 'wF^f9C:G5yQ*' scp -r -o StrictHostKeyChecking=no /Users/yanisb/Documents/osalabs-hub/src root@141.11.103.154:/var/www/osalabs-hub-next/
sshpass -p 'wF^f9C:G5yQ*' scp -r -o StrictHostKeyChecking=no /Users/yanisb/Documents/osalabs-hub/public root@141.11.103.154:/var/www/osalabs-hub-next/
sshpass -p 'wF^f9C:G5yQ*' ssh -o StrictHostKeyChecking=no root@141.11.103.154 'cd /var/www/osalabs-hub-next && npm run build && pm2 restart hub'
