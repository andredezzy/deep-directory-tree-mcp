import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";

// Create server instance
const mcp = new McpServer({
  name: "deep-directory-tree",
  version: "1.0.0",
});

interface TreeOptions {
  depth: number;
  excludePatterns: string[];
}

/**
 * Get the directory tree
 * @param depth - The depth of the directory tree
 * @returns The directory tree as a string with each level on a new line
 * @example
 * // Returns " |-- Level 0\n |-- Level 1\n |-- Level 2"
 * getDirectoryTree(3)
 */
function getDirectoryTree(
  rootPath: string,
  options: TreeOptions = { depth: 3, excludePatterns: ["node_modules", ".git"] }
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
  "get_deep_directory_tree",
  "Get deep directory tree",
  {
    path: z
      .string()
      .describe("Path to get the directory tree (preferably absolute path)"),
    options: z
      .object({
        depth: z.number().default(3).describe("Depth of the directory tree"),
        excludePatterns: z
          .array(z.string())
          .default(["node_modules", ".git"])
          .describe(
            "Patterns to exclude from the tree (e.g., ['node_modules', '*.log'])"
          ),
      })
      .default({ depth: 3, excludePatterns: ["node_modules", ".git"] })
      .describe("Tree generation options"),
  },
  async ({ path, options }) => {
    const directoryStructure = getDirectoryTree(path, options);

    return {
      content: [
        {
          type: "text",
          text: directoryStructure,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();

  await mcp.connect(transport);

  console.error("Deep Directory Tree MCP Server started successfully");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
