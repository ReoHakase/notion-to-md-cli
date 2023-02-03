import { z } from 'zod';
import { colors } from 'cliffy/colors';
import { fetchArgumentSchema } from './schema.ts';
import { Client } from 'notion-sdk';
import { NotionToMarkdown } from 'notion-to-md';
import { countGrapheme, countLine, hideSecret } from './string.ts';

export const fetchMarkdown = async (
  unsafeFetchArgument: z.infer<typeof fetchArgumentSchema>,
) => {
  try {
    // Parse the fetch argument
    const fetchArgument = fetchArgumentSchema.parse(unsafeFetchArgument);

    // Log the fetch argument
    console.info(
      colors.bold.yellow(' 👉 Fetching the page and converting to Markdown...'),
    );
    console.info('\tPage ID: \t', colors.gray(fetchArgument.pageId));
    console.info(
      '\tNotion Secret: \t',
      colors.gray(
        hideSecret(fetchArgument.notionSecret),
      ),
      '\n',
    );

    // Create Notion API client
    const notion = new Client({ auth: fetchArgument.notionSecret });

    // Check if the page exists in order to throw Error if it doesn't
    await notion.pages.retrieve({ page_id: fetchArgument.pageId });

    // Create notion-to-md instance
    const n2m = new NotionToMarkdown({
      notionClient: notion,
    });

    // Convert the page to Markdown
    const mdblocks = await n2m.pageToMarkdown(fetchArgument.pageId);
    const mdString = n2m.toMarkdownString(mdblocks);

    // Log the result
    console.log(
      colors.bold.green(' ✅ Successfully converted to Markdown!'),
      colors.gray(
        `${countLine(mdString)} lines, ${countGrapheme(mdString)} characters\n`,
      ),
    );

    return mdString;
  } catch (err: unknown) {
    console.error(
      colors.bold.red(
        ' 💥 Error: Failed to fetch data of the specified page.\n',
      ),
      colors.red(
        '\tPlease make sure that you have added the "Integretion" to the page or its ancester.\n',
      ),
    );
    throw err;
  }
};
