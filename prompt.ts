import { colors, Input, Secret, z } from './deps.ts';
import {
  exportArgumentSchema,
  fetchArgumentSchema,
  unwrapSafelyParsedResult,
  zodSchemaFieldValidatorFactory,
} from './schema.ts';

type GetFetchArgumentProps = {
  commandArgs: Partial<z.infer<typeof fetchArgumentSchema>>;
  commandOptions: Partial<z.infer<typeof fetchArgumentSchema>>;
  env: Partial<z.infer<typeof fetchArgumentSchema>>;
};

export const getFetchArgument = async (
  { commandArgs, commandOptions, env }: GetFetchArgumentProps,
) => {
  const fetchArgument = fetchArgumentSchema.parse({
    pageId: unwrapSafelyParsedResult(
      fetchArgumentSchema.shape.pageId.safeParse(
        commandArgs.pageId,
      ),
    ) || await Input.prompt({
      message: 'What\'s the page id?',
      validate: zodSchemaFieldValidatorFactory(
        fetchArgumentSchema.shape.pageId,
      ),
      hint:
        'Enter id of the page that you want to convert from.\nc.f. `https://notion.so/<page-slug>-<page-id>`',
    }),
    notionSecret: unwrapSafelyParsedResult(
      fetchArgumentSchema.shape.notionSecret.safeParse(
        commandOptions.notionSecret,
      ),
    ) ||
      unwrapSafelyParsedResult(
        fetchArgumentSchema.shape.notionSecret.safeParse(
          env.notionSecret,
        ),
      ) ||
      await Secret.prompt({
        message: 'What\'s the Notion secret?',
        validate: zodSchemaFieldValidatorFactory(
          fetchArgumentSchema.shape.notionSecret,
        ),
        hint: 'Enter the Notion secret connected to the target page.',
      }),
  });
  return fetchArgument;
};

type GetExportArgumentProps = {
  commandArgs: Partial<z.infer<typeof exportArgumentSchema>>;
};
export const getExportArgument = async (
  { commandArgs }: GetExportArgumentProps,
) => {
  try {
    // Prompt the user to enter the export file path if it's not specified via command arguments
    const enteredPath = unwrapSafelyParsedResult(
      exportArgumentSchema.shape.path.safeParse(
        commandArgs.path,
      ),
    ) || await Input.prompt({
      message: 'What\'s the export file path?',
      validate: zodSchemaFieldValidatorFactory(
        exportArgumentSchema.shape.path,
      ),
      hint:
        'Enter the path where you want to export the converted Markdown.\ne.g. `article.md` `./misc/example.md`',
    });

    // Validate the entered path
    const exportArgument = exportArgumentSchema.parse({
      path: enteredPath,
    });

    return exportArgument;
  } catch (err: unknown) {
    console.error(
      colors.bold.red(
        ' 💥 Error: Failed to resolve the specified path.\n',
      ),
    );
    throw err;
  }
};
