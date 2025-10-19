import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const dist = 'dist';

// limpa e recria a pasta dist
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// copia os arquivos principais da extensão
for (const f of ['manifest.json', 'popup.html', 'popup.js', 'styles.css']) {
  if (fs.existsSync(f)) {
    fs.copyFileSync(f, path.join(dist, f));
  }
}

// cria o arquivo .zip (ignorando o próprio zip)
const zipPath = path.join(dist, 'extension.zip');
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

await new Promise((resolve, reject) => {
  output.on('close', resolve);
  archive.on('error', reject);
  archive.pipe(output);
  archive.glob('**/*', { cwd: dist, ignore: ['extension.zip'] });
  archive.finalize();
});

console.log('✅ Pasta "dist/" pronta e extensão zipada com sucesso!');
