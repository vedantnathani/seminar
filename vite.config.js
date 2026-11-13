import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
export default defineConfig({base:'./',server:{watch:{ignored:['**/.taste-skill/**','**/shots/**','**/docs/**']}},build:{rollupOptions:{input:{main:fileURLToPath(new URL('./index.html',import.meta.url)),presenter:fileURLToPath(new URL('./presenter.html',import.meta.url))}}}});
