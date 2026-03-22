# MIKE.SHOP | E-COMMERCE CORE ARCHITECTURE
> **Desarrollado por:** Miguel Angel Prado
> **Estado:** Producción Local (Simulación Full-Stack)

---

## RESUMEN TÉCNICO
Mike.Shop es una plataforma de comercio electrónico diseñada bajo el concepto de **Offline-First**. Implementa una arquitectura robusta que desacopla la lógica de persistencia del usuario, permitiendo que la aplicación funcione como un sistema distribuido real, pero gestionado íntegramente por un motor ORM sobre el almacenamiento local del navegador.

---

## STACK TECNOLÓGICO

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework** | React 18 + TS | Base de la interfaz y tipado estricto. |
| **Data Fetching** | TanStack Query v5 | Gestión de caché, estados de carga y sincronización. |
| **Formularios** | Formik + Yup | Manejo de estados complejos y esquemas de validación. |
| **Estilos** | Tailwind CSS | Diseño responsivo y sistema de diseño personalizado. |
| **Persistencia** | Custom ORM | Abstracción de CRUD sobre LocalStorage. |
| **Routing** | React Router v6 | Navegación protegida y layouts anidados. |

---

## ARQUITECTURA DE DATOS
El proyecto utiliza un patrón de **Servicio-Repositorio**. Los componentes no acceden a los datos directamente; en su lugar, consumen "Hooks" que se comunican con un "Servicio", el cual finalmente opera sobre el "ORM".



### Capacidades del ORM Local:
- **Tablas Relacionales:** Manejo de entidades Users, Products y Purchases.
- **Relaciones 1:N:** El historial de compras vincula IDs de usuario con IDs de producto.
- **Persistencia Atómica:** Cada acción de escritura asegura la integridad del JSON en disco local.
- **Validación de Unicidad:** Control de registros duplicados en tiempo real.

---

## FUNCIONALIDADES CLAVE

### Gestión de Sesión
- Registro de nuevos usuarios con validación de existencia.
- Login persistente mediante tokens codificados en Base64.
- Protección de rutas (Route Guarding) para prevenir acceso no autorizado.

### Operaciones de Inventario
- Buscador inteligente con filtrado por texto y categorías.
- Sistema de edición mediante modales dinámicos controlados por Formik.
- Eliminación de registros con actualización reactiva de la interfaz.

### Dashboard de Métricas
- Cálculo automático de gasto total por sesión de usuario.
- Monitor de pedidos totales y ticket promedio de compra.
- Feedback visual mediante Skeletons y sistema de notificaciones Toast.

---

## ESTRUCTURA DEL SISTEMA

```text
src/
  ├── api/          # Abstracción de peticiones asíncronas
  ├── components/   # UI Reutilizable (Inputs, Modals, Stats)
  ├── context/      # Proveedores de Auth y Notificaciones
  ├── core/         # Motor ORM, Validaciones y Tipos
  ├── hooks/        # Lógica de Queries y Mutations
  ├── layouts/      # Estructura visual de la App
  └── pages/        # Vistas de negocio (Store, Profile, etc.)