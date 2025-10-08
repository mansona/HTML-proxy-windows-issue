import { describe, it, expect } from 'vitest';
import { stripVTControlCharacters } from 'util';
import { execa } from 'execa';
import { join } from 'path';

describe('running the app in dev mode', () => {
  it('should work', { timeout: 50000  }, async () => {
    const viteExecaProcess = execa({
      cwd: join(__dirname, '..'),
    })`pnpm vite --force --clearScreen false`;
    viteExecaProcess.stdout.setEncoding('utf8');

    const HOST = await new Promise((resolve) => {
      viteExecaProcess.stdout.on('data', (chunk) => {
        const matches = /Local:\s+(https?:\/\/.*)\//g.exec(stripVTControlCharacters(chunk));

        if (matches) {
          resolve(matches[1]);
        }
      });
    });

    expect(HOST).toContain('localhost')

    const result = await fetch(HOST);

    const html = await result.text();

    expect(html).toContain("Hi bob")
  })
})
