# Sitio de Diego Román

1. Edita `js/config.js` (WhatsApp, redes, precios) y pon tus fotos en `images/` (portada.jpg, diego.jpg, foto1-6.jpg, deporte1-3.jpg, sesion1-3.jpg).
2. Abre la carpeta en Visual Studio Code, `git init`, súbela a un repositorio de GitHub.
3. En vercel.com: Add New > Project > importa el repositorio > Deploy.
4. En Vercel: Storage > Create > Blob > conéctalo al proyecto (crea BLOB_READ_WRITE_TOKEN solo).
5. En Settings > Environment Variables agrega ADMIN_PASSWORD con tu contraseña. Haz Redeploy.
6. Entra a tudominio.vercel.app/admin.html para crear galerías.

Galería pública: aparece en /galerias.html. Privada: no se lista; solo quien tenga el enlace puede verla y descargar.
