import { fileURLToPath } from 'url';
import { dirname } from 'path';

  export function getDirname() {
    const __filename = fileURLToPath(import.meta.url);
    return dirname(__filename);
  }