/**
 * libs/server.js
 * Isolated dev server runner on port 3000 for AI Studio environment.
 * Pure Node.js (0 npm dependencies). Does not interfere with src/core.
 */

import http from 'node:http';

const PORT = 3000;

const server = http.createServer( ( req, res ) => {
	res.writeHead( 200, { 'Content-Type': 'text/html; charset=utf-8' } );
	res.end( `<!doctype html>
<html>
<head><title>EventBus Library</title></head>
<body style="font-family: monospace; background: #0a0a0c; color: #e2e8f0; padding: 2rem;">
  <h2>EventBus Core Library</h2>
  <p>Status: Active (Port ${PORT})</p>
  <p>Library Location: <code>src/core/</code></p>
</body>
</html>` );
} );

server.listen( PORT, '0.0.0.0', () => {
	console.log( `[libs] Isolated dev server running on http://0.0.0.0:${PORT}` );
} );
