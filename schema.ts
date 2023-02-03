import { z } from 'zod';

export const zodSchemaFieldValidatorFactory = (
  schema: z.ZodType,
) => {
  const validator = <T>(input: T): boolean | string => {
    try {
      schema.parse(input);
      return true;
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        return err.issues.map((issue) => issue.message).join('\n');
      } else {
        return String(err);
      }
    }
  };
  return validator;
};

export const unwrapSafelyParsedResult = <T>(
  result: z.SafeParseReturnType<unknown, T>,
): T | false => {
  if (result.success) {
    return result.data;
  } else {
    return false;
  }
};

export const fetchArgumentSchema = z.object({
  // Using custom regex parser instead of zod's built-in uuid parser, in order to accept non-hyphenated uuids.
  pageId: z.string().regex(
    /^(((https:\/\/)?www\.)?notion\.so\/[0-9a-z]+-)?[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i,
    {
      message:
        'Page id must be a valid UUID.\nIt accepts both lowercase and uppercase characters, and with or without hyphens.',
    },
  ).transform((string) => {
    // Extract uuid from the string.
    const uuid = string.replace(
      /.*?([0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}).*/i,
      '$1',
    );
    const loweredUuidWithoutHyphens = uuid.replace(/-/g, '').toLowerCase();
    return loweredUuidWithoutHyphens;
  }),
  notionSecret: z.string().regex(/^secret_[0-9a-z]+$/i, {
    message:
      'Notion API secret must be a valid secret key starting with "secret_".',
  }),
});

export const exportArgumentSchema = z.object({
  path: z.string().min(1, {
    message: 'Destination file path must be a non-empty string.',
  }),
});
