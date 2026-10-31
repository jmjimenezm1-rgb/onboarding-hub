# **Onboarding Hub**

A continuación tienes un prompt diseñado específicamente para Lovable. Está pensado para que construya únicamente los módulos de Aprovisionamiento y Portal del Cliente, pero dejándolos completamente preparados para integrarse posteriormente con el resto de la plataforma (CRM, Suscripciones, Facturación, Contabilidad, etc.). El enfoque es el de una arquitectura modular, desacoplada y orientada a eventos.



Prompt para Lovable

Contexto general

Actúa como un arquitecto de software senior especializado en aplicaciones SaaS B2B multiempresa (multi-tenant).

Estoy desarrollando una plataforma completa de gestión empresarial para una empresa que comercializa aplicaciones web mediante un modelo de suscripción y pago por uso.

La plataforma completa estará formada por numerosos módulos independientes (CRM, Gestión de Clientes, Catálogo de Aplicaciones, Suscripciones, Usuarios, Facturación, Cobros, Contabilidad, Soporte, Auditoría, BI, etc.), pero en esta fase solo debes desarrollar los módulos de Aprovisionamiento y Portal del Cliente.

El diseño debe contemplar que los demás módulos se integrarán posteriormente mediante APIs REST, eventos, webhooks o colas de mensajes, sin necesidad de modificar estos dos módulos.

No implementes lógica propia de facturación, CRM o contabilidad; simplemente deja definidos los puntos de integración necesarios.



Objetivos

Desarrollar dos módulos completamente funcionales:

Módulo de Aprovisionamiento.

Portal del Cliente.

Ambos deberán compartir autenticación, permisos, auditoría y configuración común, pero ser independientes funcionalmente.

La aplicación debe ser responsive, segura, escalable y preparada para miles de clientes.



Arquitectura

Diseña una arquitectura modular basada en servicios.

Cada módulo deberá disponer de:

API REST documentada.

Base de datos propia o esquema independiente.

Componentes reutilizables.

Permisos independientes.

Auditoría.

Registro de eventos.

Integración mediante APIs y eventos.

Todo debe diseñarse para que posteriormente pueda separarse incluso como microservicio.



MÓDULO 1: APROVISIONAMIENTO

Objetivo

Automatizar completamente la activación y desactivación de los servicios contratados por un cliente.

Este módulo será el encargado de convertir una contratación realizada en otros módulos en una cuenta operativa lista para utilizar.

No gestiona la contratación; únicamente ejecuta el aprovisionamiento.



Funciones principales

Recepción de solicitudes

Debe poder recibir solicitudes procedentes de:

CRM

Gestión de Clientes

Suscripciones

API externa

Integraciones

Automatizaciones

Las solicitudes podrán ser:

Alta

Baja

Modificación

Suspensión

Reactivación

Ampliación

Reducción



Aprovisionamiento automático

Cuando llegue una solicitud deberá poder:

Crear organización.

Crear tenant.

Asignar identificadores.

Crear espacios de trabajo.

Crear usuarios iniciales.

Asignar licencias.

Asignar aplicaciones.

Asignar permisos.

Generar credenciales.

Crear claves API si procede.

Configurar idioma.

Configurar zona horaria.

Aplicar configuración inicial.

Asignar plan contratado.

Asignar límites de consumo.

Asignar almacenamiento.

Asignar cuota de usuarios.

Crear recursos iniciales.

Enviar información al cliente.

Registrar toda la operación.



Aprovisionamiento manual

Permitir que un administrador pueda ejecutar manualmente:

Reintentos.

Sincronizaciones.

Reparaciones.

Actualizaciones.

Reaprovisionamientos.



Gestión del estado

Cada solicitud tendrá estados:

Pendiente

En proceso

Esperando validación

Completado

Completado parcialmente

Error

Cancelado

Revertido



Gestión de errores

Registrar:

Motivo.

Código.

Sistema afectado.

Reintentos realizados.

Tiempo empleado.

Posibilidad de reintentar.



Integraciones

Preparar conectores para:

REST API

Webhooks

OAuth

OpenID

LDAP

Active Directory

Google Workspace

Microsoft 365

SAML

SCIM

Stripe

PayPal



Motor de reglas

Crear un motor configurable que permita definir reglas como:

Si cliente contrata Aplicación X

→ crear automáticamente grupo X

→ crear usuario administrador

→ asignar permisos

→ enviar correo

→ asignar almacenamiento

Todo configurable.

Sin modificar código.



Historial

Registrar todas las operaciones realizadas.

Poder consultar:

Quién solicitó.

Qué aplicación.

Qué cliente.

Qué usuarios.

Qué cambios.

Duración.

Resultado.



Dashboard

Mostrar:

Solicitudes pendientes.

Solicitudes en proceso.

Errores.

Tiempo medio.

Reintentos.

Aplicaciones más aprovisionadas.



MÓDULO 2: PORTAL DEL CLIENTE

Objetivo

Crear un área privada desde la que cada cliente pueda autogestionar todos los aspectos de su relación con la empresa, sin acceder a los módulos internos.

Cada cliente únicamente podrá visualizar y gestionar su propia información.



Inicio

Mostrar un dashboard con:

Aplicaciones contratadas.

Estado de los servicios.

Usuarios.

Consumo.

Facturas recientes.

Próximas renovaciones.

Incidencias abiertas.

Avisos.

Notificaciones.



Gestión de usuarios

Permitir:

Crear usuarios.

Modificar usuarios.

Desactivar usuarios.

Asignar aplicaciones.

Asignar roles.

Restablecer contraseña.

Invitar usuarios.

Ver último acceso.

Activar MFA.



Gestión de aplicaciones

Consultar:

Aplicaciones contratadas.

Estado.

Versión.

Fecha contratación.

Fecha renovación.

Licencias utilizadas.

Licencias disponibles.

Consumo.

Solicitar ampliaciones.

Solicitar nuevas aplicaciones.

Solicitar bajas.

Estas solicitudes deberán enviarse al futuro módulo de Suscripciones mediante una API de integración.



Consumo

Consultar en tiempo real:

Usuarios activos.

Consumo mensual.

Consumo diario.

Histórico.

Gráficas.

Límites.

Alertas.



Facturación

Aunque el módulo de facturación no existe todavía, el portal deberá incluir una sección preparada para consumir sus datos mediante API y mostrar:

Facturas emitidas.

Facturas pendientes.

Histórico.

Descarga de PDF.

Estado del pago.

Método de pago.

No implementes la lógica de facturación; únicamente diseña la interfaz y los contratos de integración.



Documentación

Permitir consultar:

Contratos.

Facturas.

Licencias.

Manuales.

Documentación.

Condiciones del servicio.



Soporte

Permitir:

Crear incidencias.

Consultar incidencias.

Responder.

Adjuntar archivos.

Consultar estado.

Integración preparada con el futuro módulo de soporte.



Perfil de empresa

Editar:

Datos de contacto.

Persona responsable.

Correos.

Teléfonos.

Preferencias.

Idioma.

Zona horaria.

Configuraciones permitidas.



Seguridad

Permitir:

Cambio de contraseña.

MFA.

Sesiones activas.

Historial de accesos.

Dispositivos autorizados.

Revocar sesiones.



Notificaciones

Consultar:

Mensajes.

Alertas.

Renovaciones.

Cambios.

Incidencias.

Avisos.

Configurar preferencias de notificación.



Gestión de permisos

El portal deberá soportar diferentes perfiles dentro del cliente:

Administrador de empresa.

Administrador técnico.

Administrador financiero.

Responsable de usuarios.

Usuario estándar.

Usuario solo lectura.

Los permisos deberán ser completamente configurables.



Integración futura

Diseña todos los puntos de integración mediante contratos de API bien definidos, documentando para cada uno:

Objetivo del endpoint.

Método HTTP.

Parámetros de entrada.

Respuesta esperada.

Códigos de error.

Eventos emitidos y consumidos.

Prepara interfaces para integrarse con los módulos de CRM, Gestión de Clientes, Suscripciones, Facturación, Cobros, Contabilidad, Soporte, Auditoría y BI, utilizando adaptadores o interfaces para evitar dependencias directas.



Requisitos técnicos

Arquitectura multiempresa (multi-tenant) con aislamiento estricto de datos.

Diseño “API First”.

Componentes reutilizables.

Responsive para ordenador, tablet y móvil.

Búsqueda global.

Filtros avanzados.

Auditoría de todas las acciones.

Soft delete donde proceda.

Soporte multidioma.

Accesibilidad (WCAG 2.2 AA).

Cumplimiento del RGPD.

Preparado para incorporar autenticación SSO (OAuth2, OpenID Connect y SAML).



Resultado esperado

Genera una primera versión completamente funcional de estos dos módulos, con datos de ejemplo y una interfaz moderna y coherente con el resto de la futura plataforma. Además:

Crea un modelo de datos normalizado.

Diseña el flujo de navegación de cada módulo.

Define claramente los contratos de integración con los módulos que aún no existen.

Incluye una capa de simulación (mock services) para los módulos externos, de forma que Aprovisionamiento y Portal del Cliente puedan desarrollarse, probarse y demostrarse de manera independiente antes de integrarse con la plataforma completa. Esto permitirá sustituir posteriormente los servicios simulados por las implementaciones reales sin modificar la lógica interna de estos dos módulos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a8ac9f9c-723e-4ebb-8a19-641a0b4c2445).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
