import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
    target: 'https://www.redacao.pr.gov.br',
    changeOrigin: true,
    pathRewrite: { '^/api/khan': '' },
    onProxyRes: (proxyRes) => {
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    },
});

export default function handler(req, res) {
    return proxy(req, res);
}
