# SobreMi

Página personal estática con mis proyectos de GitHub, publicada en **https://julio.biz**, servida desde mi propio servidor (nginx en Proxmox, detrás de un Cloudflare Tunnel).

- `index.html`: la página
- `css/estilo.css`: estilos (modo claro y oscuro automático)
- `js/repos.js`: carga mis repositorios públicos desde la API de GitHub

Sin dependencias ni compilación: el servidor trae los cambios de `main` cada 5 minutos.
