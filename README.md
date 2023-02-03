# 📝 Notion to Markdown CLI

✨ **Simple, yet user-friendly CLI to convert a Notion page to Markdown.** ✨

[![asciicast](https://asciinema.org/a/N56rYh3JI1q04Gs9hgOZowbHD.svg)](https://asciinema.org/a/N56rYh3JI1q04Gs9hgOZowbHD)

- 🏃‍♂️ Executable **without any installation** (thanks to Deno)
- ✅ **Easy-to-use interactive mode** available
- 😊 **Lovely UI**

---

## Getting Started

Just type the below command:

```bash
deno run --allow-net=api.notion.com --allow-env=N2MD_NOTION_SECRET --allow-write --allow-read main.ts
```

It requires Deno to be installed.

## Usage

```bash
notion-to-md-cli [pageId] [dest]
```

### Description

Simple yet user-friendly CLI to convert a Notion page to Markdown.
Both interactive mode (with no arguments specified) or non-interactive mode are available.

- `[pageId:string]` You can specify an URL or id of the page to `[pageId]`, in order to skip the prompt.
- `[dest:file]` You can specify a destination file path to `[dest]`, in order to skip the prompt.

### Options

- `-h`, `--help` - Show this help.
- `-V`, `--version` - Show the version number for this program.
- `-s`, `--notion-secret` `<notionSecret>` - Specify a Notion secret via a command option. If specified, it will be used over the environment variable.

### Environment variables

- `N2MD_NOTION_SECRET` `<value>` - A Notion secret used to fetch the specified page.
