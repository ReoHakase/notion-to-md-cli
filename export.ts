import { z } from 'zod';
import { basename, dirname, resolve } from 'path';
import { colors } from 'cliffy/colors';
import { exportArgumentSchema } from './schema.ts';

export const writeMarkdown = async (
  path: z.infer<typeof exportArgumentSchema.shape.path>,
  mdString: string,
) => {
  try {
    console.info(
      colors.bold.yellow(' 👉 Exporting converted Markdown...'),
    );

    // Resolve the entered path to absolute path
    const absolutePath = resolve(path);

    // Log the entered path and the absolute path
    console.info('\tSpecified path: ', colors.gray(path));
    console.info('\tAbsolute path: ', colors.gray(absolutePath), '\n');
    // Make sure that the directory exists
    const dir = dirname(path);
    await Deno.mkdir(dir, { recursive: true });

    // Write the Markdown file
    await Deno.writeTextFile(path, mdString);

    console.log(
      colors.bold.green(` 📁 Successfully written to the file!`),
      colors.underline.green(basename(path)),
    );
  } catch (err: unknown) {
    console.error(
      colors.bold.red(
        ' 💥 Error: Failed to write to the file\n',
      ),
      colors.underline.red(path),
    );
    throw err;
  }
};
