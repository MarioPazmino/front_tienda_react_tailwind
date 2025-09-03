Resumen del trabajo realizado
=============================

Este documento registra, de forma literal y compacta, todo lo que se ha implementado o tocado hasta ahora en el frontend `front_tienda_react_tailwind` y las partes del backend relacionadas que se han modificado durante la sesión.

Propósito
- Mejorar la experiencia de administración (crear/editar/eliminar admins) con UX consistente, validación inline y toasts.
- Reemplazar confirmaciones nativas por un modal reutilizable.
- Añadir y centralizar un toggle de tema (claro/oscuro) como componente reutilizable y persistente.
- Corregir problemas de CORS y RBAC en funciones serverless del backend para que el frontend no tenga bloqueos en navegador.

Tecnologías y dependencias principales
- React (CRA)
- Tailwind CSS (darkMode: 'class')
- react-icons
- Node.js (backend Serverless Framework - AWS Lambda + API Gateway)
- Mongoose, JWT (backend)

Archivos importantes creados / editados (frontend)
- `src/components/DarkModeToggle.jsx` (nuevo)
  - Componente reutilizable para alternar tema.
  - Props: `position`, `size`.
  - Persiste preferencia en `localStorage` con la key `theme_dark`.
  - Añade/remueve la clase `dark` al elemento `<html>`.
  - Usa `FiMoon` / `FiSun` de `react-icons`.
  - Posición responsive: en móvil usa `bottom-20` para evitar cubrir la nav inferior (md:bottom-6).

- `src/components/ConfirmModal.jsx` (nuevo o editado)
  - Modal reutilizable para confirmaciones (Eliminar, acciones críticas).
  - Props: `open`, `title`, `description`, `confirmLabel`, `cancelLabel`, `loading`, `onConfirm`, `onCancel`.
  - Z-index/backdrop ajustados para compatibilidad con toasts.

- `src/components/Notification.jsx` (nuevo o editado)
  - Contenedor de toasts en la parte superior-derecha.
  - Z-index alto (`z-[100000]`) para mostrarse por encima de modales.
  - Animaciones y auto-hide comportadas.

- `src/admin/usuarios/AdminList.jsx` (editado)
  - Reemplazo de `window.confirm` por `ConfirmModal` en flujo de eliminar.
  - UI responsiva: tabla en md+ y tarjetas apiladas en móvil.
  - Mejoras móviles: avatar más grande, truncado de id con tooltip, icon-only buttons (editar/eliminar), eliminación de badges duplicadas.
  - Integración con `Notification` para mostrar toasts.

- `src/admin/usuarios/CreateAdminForm.jsx` / `EditAdminForm.jsx` (ediciones)
  - Inline username checks (existencia), show/hide password, mapeo amigable de errores duplicados.

- `src/services/admin.service.js` (editado)
  - Añade header `Authorization: Bearer <token>` (lee `localStorage.admin_token`).
  - Mapea el error Mongo E11000 a un mensaje legible en español.

- `src/App.js` (editado)
  - Reemplazado el inline toggle por `<DarkModeToggle />` importado.

Notas sobre backend (repositorio `Backend_Tienda` / `Backend_Tienda_Serverless`)
- Se han aplicado cambios para mitigar CORS y RBAC en varias funciones Lambda:
  - `src/functions/admin/delete.js`: ahora retorna CORS headers en todas las respuestas y maneja `OPTIONS`.
  - `src/functions/admin/update.js` y `changePassword.js`: se añadió manejo CORS y `OPTIONS`.
  - `src/functions/admin/listAdmins.js`: se endureció verificación JWT y se añadieron logs temporales para depurar 401/filtrado.
  - `src/functions/admin/getById.js`: handler nuevo añadido.
- `serverless.yml` fue editado para exponer endpoints (remover `private:true` donde bloqueaba el acceso desde navegador).

Comportamiento y contratos (pequeño contrato)
- Input: JWT en `Authorization: Bearer <token>` (localStorage `admin_token` en frontend).
- Output: JSON API con código HTTP y mensajes; en errores duplicados el cliente muestra mensaje traducido.
- Error modes: 401/403 cuando JWT inválido o RBAC no permite la acción; 409/400 para datos duplicados/invalidos.

Cómo ejecutar el frontend localmente (development)
1. Instalar dependencias:
   npm install
2. Iniciar en modo desarrollo:
   npm start
3. Si quieres probar desde un teléfono en la misma LAN (recomendado para validar el solapamiento con nav inferior):
   - En PowerShell desde la carpeta del frontend:
     $env:HOST="0.0.0.0"; npm start
   - Obtener la IP de la PC (IPv4) y visitar desde el móvil: http://<IP_PC>:3000
   - Si no carga revisa el firewall de Windows (puerto 3000) o temporalmente desactívalo para pruebas.

Probar en Chrome DevTools (rápido)
- Abrir `npm start` en el PC, luego F12 → Ctrl+Shift+M para activar Device Toolbar → seleccionar dispositivo.
- Nota: la emulación no replica problemas de red ni barras nativas del teléfono.

Probar con ngrok (https / remoto)
- ngrok http 3000 -> te dará una URL pública HTTPS para abrir en el móvil o compartir con pruebas externas.

Comandos útiles de backend (deploy / logs)
- Desde `Backend_Tienda_Serverless`:
  - `sls deploy` (deploy a AWS)
  - `sls logs -f <functionName> -s dev --tail` (revisar CloudWatch logs en tiempo real)

Keys y localStorage
- `admin_token` — JWT usado para llamadas admin.
- `theme_dark` — '1' o '0' para persistir tema.

Mobile-specific notes
- El `DarkModeToggle` ya usa `bottom-20 md:bottom-6` para evitar tapar la navegación inferior; aumentar a `bottom-28` si la nav ocupa más espacio o integrar el toggle dentro del `Navbar`/footer en móviles para eliminar solapamiento.
- Si se necesita un ajuste más fino en iPhone con safe-area, usar CSS env() variables: `bottom: calc(env(safe-area-inset-bottom) + 1.25rem)`.

Accesibilidad y UX
- `DarkModeToggle` tiene `aria-label` y título; `ConfirmModal` y `Notification` usan roles/labels básicos.
- Sugerencia: añadir focus-trap y Escape-to-close en `ConfirmModal` para accesibilidad completa.

Pruebas mínimas añadidas
- Se añadió verificación rápida (get_errors) tras cada edición para chequear errores de sintaxis en archivos modificados.

Notas de seguimiento y próximos pasos sugeridos
- Verificar deploy del backend y reproducir las peticiones que fallaban (capturar headers de preflight OPTIONS y respuesta para validar CORS).
- Pulir color-by-role para badges de admin en `AdminList.jsx`.
- Agregar test unitarios para `DarkModeToggle` (persistencia localStorage) y para `admin.service` mapping de errores.
- Mover toggle al `Navbar` en mobile si prefieres — puedo implementarlo.

Registro de cambios rápido (lo que hicimos en orden aproximado)
1. Reemplazo de confirm native por `ConfirmModal` y adaptación en `AdminList.jsx`.
2. Añadido `Notification` con z-index alto para mostrarse sobre modales.
3. Reescritura parcial de `AdminList.jsx` para vista responsive (tabla / tarjetas), icon buttons y correcciones de badges duplicadas.
4. Mejoras en formularios Create/Edit (inline validation, show/hide password).
5. `admin.service.js` para manejar Authorization header y mapear E11000.
6. Creación de `DarkModeToggle.jsx` y sustitución en `App.js`.
7. Cambios backend: CORS/OPTIONS en `delete.js`, `update.js`, `changePassword.js`, logs en `listAdmins.js`, `getById.js` añadido.

