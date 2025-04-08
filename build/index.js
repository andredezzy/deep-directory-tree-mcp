import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";
import path from "path";
// Create server instance
const mcp = new McpServer({
    name: "deep-filesystem-tree",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {
            "get-deep-filesystem-tree": {
                description: "Get deep filesystem tree",
                parameters: {
                    path: {
                        type: "string",
                        description: "Path to the filesystem tree",
                    },
                    options: {
                        type: "object",
                        description: "Tree generation options",
                        properties: {
                            depth: {
                                type: "number",
                                description: "Depth of the filesystem structure",
                                default: 3,
                            },
                            excludePatterns: {
                                type: "array",
                                items: { type: "string" },
                                description: "Patterns to exclude from the tree (e.g., ['node_modules', '*.log'])",
                                default: ["node_modules"],
                            },
                        },
                    },
                },
            },
        },
    },
});
/**
 * Get the filesystem tree
 * @param depth - The depth of the filesystem tree
 * @returns The filesystem tree as a string with each level on a new line
 * @example
 * // Returns " |-- Level 0\n |-- Level 1\n |-- Level 2"
 * getFilesystemTree(3)
 */
function getFilesystemTree(rootPath, options = { depth: 3, excludePatterns: ["node_modules"] }) {
    const tree = [];
    function shouldExclude(file) {
        return options.excludePatterns.some((pattern) => {
            if (pattern.includes("*")) {
                const regexPattern = pattern.replace(/\*/g, ".*");
                return new RegExp(regexPattern).test(file);
            }
            return file === pattern;
        });
    }
    function traverse(dir, currentDepth = 0) {
        if (currentDepth >= options.depth)
            return;
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
            }
            else {
                tree.push(`${"  ".repeat(currentDepth)}${prefix}${file}`);
            }
        });
    }
    traverse(rootPath);
    return tree.join("\n");
}
mcp.tool("get-deep-filesystem-tree", "Get deep filesystem tree", {
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
            .describe("Patterns to exclude from the tree (e.g., ['node_modules', '*.log'])"),
    })
        .default({ depth: 3, excludePatterns: ["node_modules"] })
        .describe("Tree generation options"),
}, async ({ path, options }) => {
    const filesystemStructure = getFilesystemTree(path, options);
    return {
        content: [
            {
                type: "text",
                text: filesystemStructure,
            },
        ],
    };
});
async function main() {
    const transport = new StdioServerTransport();
    await mcp.connect(transport);
    console.error("Deep Filesystem Structure MCP Server started successfully");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
