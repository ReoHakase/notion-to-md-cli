import { colors, Command } from './deps.ts';

import { getExportArgument, getFetchArgument } from './prompt.ts';
import { fetchMarkdown } from './fetch.ts';
import { writeMarkdown } from './export.ts';

const { args, options } = await new Command()
  .name('notion-to-md-cli')
  .version('0.1.0')
  .description(
    `Simple yet user-friendly CLI to convert a Notion page to Markdown.
Both interactive mode (with no arguments specified) or non-interactive mode are available.

[pageId:string]\t You can specify an URL or id of the page to [pageId], in order to skip the prompt.
[dest:file]\t You can specify a destination file path to [dest], in order to skip the prompt.`,
  )
  .env(
    'N2MD_NOTION_SECRET=<value:string>',
    'A Notion secret used to fetch the specified page.',
    {
      prefix: 'N2MD_',
    },
  )
  .arguments('[pageId:string] [dest:file]')
  .option(
    '-s, --notion-secret <notionSecret:string>',
    'Specify a Notion secret via a command option. If specified, it will be used over the environment variable.',
  )
  .parse(Deno.args);

try {
  // Print the title
  console.info(
    '\n',
    colors.bold.magenta('📝 notion-to-md-cli\n'),
    colors.italic(
      '\tSimple yet user-friendly CLI to convert a Notion page to Markdown.\n',
    ),
  );

  // Resolve fetch argument from command arguments and options, and environment variables
  const fetchArgument = await getFetchArgument({
    commandArgs: {
      pageId: args[0],
    },
    commandOptions: {
      notionSecret: options.notionSecret,
    },
    env: {
      notionSecret: Deno.env.get('N2MD_NOTION_SECRET'),
    },
  });

  // Fetch the page and convert it to Markdown
  const mdString = await fetchMarkdown(fetchArgument);

  // Resolve export argument from command arguments and options
  const exportArgument = await getExportArgument({
    commandArgs: {
      path: args[1],
    },
  });
  // Write the Markdown to the destination file
  await writeMarkdown(exportArgument.path, mdString);
} catch (err: unknown) {
  if (err instanceof Error) {
    // Print stack trace
    console.error('\n', colors.gray(`Error stack trace: ${err.stack}`), '\n');
  } else {
    console.error('\n', colors.gray(`Error message: ${String(err)}`), '\n');
  }
}
