import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";
import { EventEmitter } from "node:events";

// Create server instance
const mcp = new McpServer({
  name: "deep-filesystem-tree",
  version: "1.0.0",
});

interface TreeOptions {
  depth: number;
  excludePatterns: string[];
}

/**
 * Get the filesystem tree
 * @param depth - The depth of the filesystem tree
 * @returns The filesystem tree as a string with each level on a new line
 * @example
 * // Returns " |-- Level 0\n |-- Level 1\n |-- Level 2"
 * getFilesystemTree(3)
 */
function getFilesystemTree(
  rootPath: string,
  options: TreeOptions = { depth: 3, excludePatterns: ["node_modules"] }
) {
  const tree: string[] = [];

  function shouldExclude(file: string): boolean {
    return options.excludePatterns.some((pattern) => {
      if (pattern.includes("*")) {
        const regexPattern = pattern.replace(/\*/g, ".*");
        return new RegExp(regexPattern).test(file);
      }
      return file === pattern;
    });
  }

  function traverse(dir: string, currentDepth: number = 0) {
    if (currentDepth >= options.depth) return;

    const files = fs.readdirSync(dir);
    const filteredFiles = files.filter((file) => !shouldExclude(file));

    filteredFiles.forEach((file, index) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      const isLast = index === filteredFiles.length - 1;
      const prefix = isLast ? "└── " : "├── ";

      if (stats.isDirectory()) {
        tree.push(`${"  ".repeat(currentDepth)}${prefix}${file}`);
        traverse(filePath, currentDepth + 1);
      } else {
        tree.push(`${"  ".repeat(currentDepth)}${prefix}${file}`);
      }
    });
  }

  traverse(rootPath);
  return tree.join("\n");
}

mcp.tool(
  "get-deep-filesystem-tree",
  "Get deep filesystem tree",
  {
    path: z.string().describe("Path to the filesystem tree"),
    options: z
      .object({
        depth: z
          .number()
          .default(3)
          .describe("Depth of the filesystem structure"),
        excludePatterns: z
          .array(z.string())
          .default(["node_modules"])
          .describe(
            "Patterns to exclude from the tree (e.g., ['node_modules', '*.log'])"
          ),
      })
      .default({ depth: 3, excludePatterns: ["node_modules"] })
      .describe("Tree generation options"),
  },
  async ({ path, options }) => {
    try {
      const filesystemStructure = getFilesystemTree(path, options);
      return {
        content: [
          {
            type: "text",
            text: filesystemStructure,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

async function main() {
  try {
    const transport = new StdioServerTransport();
    const emitter = new EventEmitter();

    emitter.on("error", (error: Error) => {
      console.error("Transport error:", error);
    });

    emitter.on("close", () => {
      console.error("Transport closed");
      process.exit(0);
    });

    await mcp.connect(transport);
    console.error("Deep Filesystem Structure MCP Server started successfully");

    // Keep the process alive
    process.on("SIGINT", () => {
      console.error("Received SIGINT, shutting down...");
      process.exit(0);
    });

    process.on("SIGTERM", () => {
      console.error("Received SIGTERM, shutting down...");
      process.exit(0);
    });

    process.on("uncaughtException", (error: Error) => {
      console.error("Uncaught exception:", error);
      process.exit(1);
    });

    process.on("unhandledRejection", (reason: unknown) => {
      console.error("Unhandled rejection:", reason);
      process.exit(1);
    });
  } catch (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
  }
}

main();
