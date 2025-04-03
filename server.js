const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors()); // Habilita requisições de qualquer origem

// Proxy para a Khan Academy
app.use('/khan', createProxyMiddleware({
    target: 'https://www.khanacademy.org',
    changeOrigin: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://www.khanacademy.org',
    },
    onProxyRes: (proxyRes) => {
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    },
    pathRewrite: { '^/khan': '' },
}));

app.listen(3000, () => {
    console.log('Proxy rodando em http://localhost:3000');
});