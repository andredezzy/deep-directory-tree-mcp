# Deep Directory Tree MCP 🌳

<span class="badge-smithery">
  <a href="https://smithery.ai/server/deep-directory-tree-mcp">
    <img src="https://smithery.ai/badge/deep-directory-tree-mcp" alt="Smithery Tool Calls" />
  </a>
</span>

<span class="badge-npm-version">
  <a href="https://npmjs.org/package/deep-directory-tree-mcp" title="View this project on NPM">
    <img src="https://img.shields.io/npm/v/deep-directory-tree-mcp.svg" alt="NPM Version" />
  </a>
</span>

<span class="badge-npm-downloads">
  <a href="https://npmjs.org/package/deep-directory-tree-mcp" title="View this project on NPM">
    <img src="https://img.shields.io/npm/dm/deep-directory-tree-mcp.svg" alt="NPM Downloads" />
  </a>
</span>

<br />

A powerful Model Context Protocol (MCP) implementation for visualizing and analyzing directory structures. Why? Now you can let AI assistants understand and navigate your project structure efficiently, enabling smarter code navigation and project organization insights.

Built with:

- [Bun Runtime](https://bun.sh)
- [Anthropic MCP](https://docs.anthropic.com/claude/docs/mcp-getting-started)
- [Cursor](https://cursor.sh)

## Features

- 🔍 Deep directory tree visualization
- ⚙️ Configurable depth-based tree generation
- 🚫 Smart pattern-based file/directory exclusion
- 📊 Clean and readable tree output format
- 🔄 Real-time directory structure updates
- 🎯 Targeted directory analysis

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- [Bun Runtime](https://bun.sh) (required)

### Option 1: Smithery Installation (Recommended)

The easiest way to get started is using [Smithery](https://smithery.ai/server/deep-directory-tree-mcp):

```bash
npx -y @smithery/cli install deep-directory-tree-mcp --client cursor
```

### Option 2: Manual Installation

```bash
# Clone the repository
git clone https://github.com/andredezzy/deep-directory-tree-mcp.git
cd deep-directory-tree-mcp

# Install dependencies
bun install

# Build the project
bun run build
```

## Configuration

### Cursor IDE Setup

1. Open Cursor Settings → MCP → Add new MCP server
2. Configure with these settings:

   ```json
   {
     "@andredezzy/deep-directory-tree-mcp": {
       "command": "npx",
       "args": ["-y", "@andredezzy/deep-directory-tree-mcp"]
     }
   }
   ```

### Claude Desktop Setup

Add the following to your MCP configuration:

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

## Usage

Common commands for AI assistants:

- "Show me the directory structure"
- "Visualize project tree up to depth 4"
- "Show files excluding test directories"

## Development

```bash
# Install dependencies
bun install

# Build for production
bun run build
```

## Project Structure

```
deep-directory-tree-mcp/
├── src/              # Source code
│   └── index.ts      # Main entry point
├── bin/              # Binary executables
├── dist/             # Compiled output
├── .vscode/          # VS Code configuration
└── [Configuration files]
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

Need help? Try these resources:

- [Open an issue](https://github.com/andredezzy/deep-directory-tree-mcp/issues)
- [FAQ Wiki](https://github.com/andredezzy/deep-directory-tree-mcp/wiki/FAQ)
- [Documentation](https://github.com/andredezzy/deep-directory-tree-mcp/wiki)

## License

MIT License - see [LICENSE](LICENSE) file for details.
