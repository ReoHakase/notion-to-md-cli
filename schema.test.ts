import {
  assertEquals,
  assertThrows,
} from 'https://deno.land/std@0.65.0/testing/asserts.ts';

import { fetchArgumentSchema } from './schema.ts';

Deno.test('fetchArgumentSchema.pageId can parse uuid without hyphens correctly', () => {
  const input = '327ca25ae4354ca1847bed64475d3f7a';
  const parsedInput = fetchArgumentSchema.shape.pageId.parse(input);
  assertEquals(parsedInput, '327ca25ae4354ca1847bed64475d3f7a');
});

Deno.test('fetchArgumentSchema.pageId can parse uuid with hyphens correctly', () => {
  const input = '327ca25a-e435-4ca1-847b-ed64475d3f7a';
  const parsedInput = fetchArgumentSchema.shape.pageId.parse(input);
  assertEquals(parsedInput, '327ca25ae4354ca1847bed64475d3f7a');
});

Deno.test('fetchArgumentSchema.pageId can parse uuid with uppercase characters correctly', () => {
  const input = '327CA25A-E435-4CA1-847B-ED64475D3F7A';
  const parsedInput = fetchArgumentSchema.shape.pageId.parse(input);
  assertEquals(parsedInput, '327ca25ae4354ca1847bed64475d3f7a');
});

Deno.test('fetchArgumentSchema.pageId can parse a page url to uuid correctly', () => {
  {
    const input =
      'https://www.notion.so/Example-19870dc0ab4941ab9dd70d8ea533ad9f';
    const parsedInput = fetchArgumentSchema.shape.pageId.parse(input);
    assertEquals(parsedInput, '19870dc0ab4941ab9dd70d8ea533ad9f');
  }
  {
    const input = 'www.notion.so/PageTitle-19870dc0ab4941ab9dd70d8ea533ad9f';
    const parsedInput = fetchArgumentSchema.shape.pageId.parse(input);
    assertEquals(parsedInput, '19870dc0ab4941ab9dd70d8ea533ad9f');
  }
  {
    const input = 'notion.so/FooBar-19870dc0ab4941ab9dd70d8ea533ad9f';
    const parsedInput = fetchArgumentSchema.shape.pageId.parse(input);
    assertEquals(parsedInput, '19870dc0ab4941ab9dd70d8ea533ad9f');
  }
});

Deno.test('fetchArgumentSchema.pageId throws ZodError if non-uuid string passed', () => {
  const input = 'not-a-uuid-327bed64475d3f7a';
  assertThrows(() => {
    fetchArgumentSchema.shape.pageId.parse(input);
  });
});

Deno.test('fetchArgumentSchema.notionSecret can parse Notion secret correctly', () => {
  const input =
    'secret_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
  const parsedInput = fetchArgumentSchema.shape.notionSecret.parse(input);
  assertEquals(parsedInput, input);
});

Deno.test('fetchArgumentSchema.notionSecret throws ZodError if non-Notion-secret string passed', () => {
  const input =
    'not-a-notion-secret-1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
  assertThrows(() => {
    fetchArgumentSchema.shape.notionSecret.parse(input);
  });
});
