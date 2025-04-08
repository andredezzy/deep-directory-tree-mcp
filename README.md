# Deep Directory Tree MCP

[![smithery badge](https://smithery.ai/badge/deep-directory-tree-mcp)](https://smithery.ai/server/deep-directory-tree-mcp)

A Model Context Protocol (MCP) implementation that provides deep directory tree visualization capabilities. This tool enables efficient visualization of complex directory structures, enhancing development workflows with AI-powered file system structure analysis. Compatible with any MCP-enabled client or AI assistant.

<a href="https://glama.ai/mcp/servers/deep-directory-tree"><img width="380" height="200" src="https://glama.ai/mcp/servers/deep-directory-tree/badge" alt="Deep Directory Tree MCP server" /></a>

## Quick Start

### Installing via Smithery

To install Deep Directory Tree MCP automatically via [Smithery](https://smithery.ai/server/deep-directory-tree-mcp):

```bash
npx -y @smithery/cli install deep-directory-tree-mcp --client claude
```

### Installing Manually

1. **Prerequisites**

   - [Bun](https://bun.sh) runtime

2. **Installation**

   ```bash
   # Install globally
   bun install -g deep-directory-tree-mcp

   # Or install locally
   git clone https://github.com/andredezzy/deep-directory-tree-mcp.git
   cd deep-directory-tree-mcp
   bun install
   ```

3. **Add to Claude's MCP Configuration**
   Add the following to your Claude configuration:

   ```json
   {
     "name": "deep-directory-tree",
     "type": "mcp",
     "config": {
       "server": "https://glama.ai/mcp/servers/deep-directory-tree"
     }
   }
   ```

4. **Start the Server**

   ```bash
   # If installed globally
   deep-directory-tree-mcp

   # If installed locally
   bun start
   ```

## Features

- Deep directory tree visualization
- Configurable depth-based tree generation
- Pattern-based file/directory exclusion
- Clean and readable tree output format

## Detailed Setup

### Local Development Setup

1. Clone and install:

   ```bash
   git clone https://github.com/andredezzy/deep-directory-tree-mcp.git
   cd deep-directory-tree-mcp
   bun install
   ```

2. Build and run:

   ```bash
   # Development mode with hot reload
   bun dev

   # Production mode
   bun build
   bun start
   ```

### Troubleshooting

1. **Tree Visualization Issues**

   - Ensure proper file permissions
   - Check workspace path configuration
   - Verify file system event listeners are active

2. **Permission Issues**

   - Run with appropriate user permissions
   - Check file system access rights
   - Verify workspace directory permissions

3. **Runtime Issues**
   - Make sure Bun is installed and up to date:
     ```bash
     curl -fsSL https://bun.sh/install | bash
     bun upgrade
     ```

## Project Structure

```
deep-directory-tree-mcp/
├── src/              # Source code
│   └── index.ts      # Main application entry point
├── .gitignore        # Git ignore rules
├── bun.lock          # Bun lock file
├── eslint.config.js  # ESLint configuration
├── index.ts          # Root entry point
├── package.json      # Project configuration and dependencies
├── smithery.yaml     # Smithery configuration
└── tsconfig.json     # TypeScript configuration
```

## Scripts

- `bun build` - Build the project
- `bun start` - Run production server
- `bun dev` - Start development server with hot-reload

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

For support:

- Open an issue in the GitHub repository
- Check the [FAQ](https://github.com/andredezzy/deep-directory-tree-mcp/wiki/FAQ)
