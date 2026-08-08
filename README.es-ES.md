

# Deep Directory Tree MCP 🌳

[![Smithery Tool Calls](https://smithery.ai/badge/deep-directory-tree-mcp)](https://smithery.ai/server/deep-directory-tree-mcp)
[![NPM Version](https://img.shields.io/npm/v/%40andredezzy%2Fdeep-directory-tree-mcp.svg)](https://npmjs.org/package/@andredezzy/deep-directory-tree-mcp)
[![NPM Downloads](https://img.shields.io/npm/dm/%40andredezzy%2Fdeep-directory-tree-mcp)](https://npmjs.org/package/@andredezzy/deep-directory-tree-mcp)

Una poderosa implementación del Protocolo de Contexto de Modelo (MCP) para visualizar y analizar estructuras de directorios. ¿Por qué? Ahora puedes permitir que los asistentes de IA comprendan y naveguen por la estructura de tu proyecto de manera eficiente, facilitando una navegación más inteligente por el código y obteniendo información valiosa sobre la organización del proyecto.

Desarrollado con:

- [Anthropic MCP](https://docs.anthropic.com/claude/docs/mcp-getting-started)
- [Cursor](https://cursor.sh)

## Características

- Visualización profunda de árboles de directorios
- Generación de árboles configurable basada en profundidad
- Exclusión inteligente de archivos/directorios basada en patrones
- Formato de salida de árbol limpio y legible
- Actualizaciones en tiempo real de la estructura de directorios
- Análisis de directorios específico

**DEMO:**

![Cursor + Deep Directory Tree MCP Demo](./cursor-demo.mp4)

## Inicio rápido

### Requisitos previos

- [Node.js](https://nodejs.org) (v18 o superior)

### Instalación con Smithery

La forma más fácil de comenzar es usando [Smithery](https://smithery.ai/server/deep-directory-tree-mcp):

```bash
npx -y @smithery/cli install @andredezzy/deep-directory-tree-mcp --client cursor
```

### Instalación manual

#### Configuración en Cursor IDE

1. Abre Configuración de Cursor → MCP → Agregar nuevo servidor MCP
2. Configura con estas opciones:

   ```json
   {
     "deep-directory-tree": {
       "command": "npx",
       "args": ["-y", "@andredezzy/deep-directory-tree-mcp"]
     }
   }
   ```

#### Configuración en Claude Desktop

Agrega lo siguiente a tu configuración de MCP:

```json
{
  "mcpServers": {
    "deep-directory-tree": {
      "command": "npx",
      "args": ["-y", "@andredezzy/deep-directory-tree-mcp"]
    }
  }
}
```

## Uso

Comandos comunes para asistentes de IA:

- "Muéstrame la estructura de directorios"
- "Visualiza el árbol del proyecto hasta la profundidad 4"
- "Muestra archivos excluyendo directorios de prueba"

## Desarrollo

### Requisitos previos

- [Bun Runtime](https://bun.sh) (requerido)

```bash
# Clona el repositorio
git clone https://github.com/andredezzy/deep-directory-tree-mcp.git
cd deep-directory-tree-mcp

# Instala las dependencias
bun install

# Construye el proyecto
bun run build
```

### Instalación manual para desarrollo

#### Configuración en Cursor IDE

1. Abre Configuración de Cursor → MCP → Agregar nuevo servidor MCP
2. Configura con estas opciones:

   ```json
   {
     "deep-directory-tree": {
       "command": "node",
       "args": ["ABSOLUTE_PATH_TO_MCP_SERVER/bin/deep-directory-tree.js"]
     }
   }
   ```

#### Configuración en Claude Desktop

Agrega lo siguiente a tu configuración de MCP:

```json
{
  "mcpServers": {
    "deep-directory-tree": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO_MCP_SERVER/bin/deep-directory-tree.js"]
    }
  }
}
```

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama de características (`git checkout -b feature/amazing-feature`)
3. Realiza commit de los cambios (`git commit -m 'Add feature'`)
4. Sube a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Soporte

¿Necesitas ayuda? Prueba estos recursos:

- [Abrir un issue](https://github.com/andredezzy/deep-directory-tree-mcp/issues)
- [Wiki de preguntas frecuentes (FAQ)](https://github.com/andredezzy/deep-directory-tree-mcp/wiki/FAQ)
- [Documentación](https://github.com/andredezzy/deep-directory-tree-mcp/wiki)

## Licencia

Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
