#!/bin/bash
rm -rf /var/www/osalabs-hub-next
mkdir -p /var/www/osalabs-hub-next
cd /var/www/osalabs-hub-next
git clone https://github.com/osayanis/osalabs-hub.git .
npm install
npm run build
pm2 delete hub || true
pm2 start npm --name "hub" -- start -- -p 3001
pm2 save

cat > /etc/nginx/sites-available/osalabs << 'EOF'
server { 
    server_name osalabs.fr www.osalabs.fr; 
    listen 443 ssl; 
    ssl_certificate /etc/letsencrypt/live/www.osalabs.fr/fullchain.pem; 
    ssl_certificate_key /etc/letsencrypt/live/www.osalabs.fr/privkey.pem; 
    include /etc/letsencrypt/options-ssl-nginx.conf; 
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; 

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
server {
    if ($host = www.osalabs.fr) {
        return 301 https://$host$request_uri;
    } 
    listen 80; 
    server_name osalabs.fr www.osalabs.fr;
    return 301 https://www.osalabs.fr$request_uri;
}
EOF

systemctl restart nginx
