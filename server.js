const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite requisições de qualquer origem

// Proxy para redacao.pr.gov.br
app.use('/redacao', createProxyMiddleware({
    target: 'https://redacao.pr.gov.br',
    changeOrigin: true,
    onProxyRes: (proxyRes) => {
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    },
    pathRewrite: { '^/redacao': '' }, // Remove "/redacao" da URL final
}));

app.listen(3000, () => {
    console.log('Proxy rodando em http://localhost:3000');
});
