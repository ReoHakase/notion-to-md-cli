import { assertEquals } from 'https://deno.land/std@0.65.0/testing/asserts.ts';
import { countGrapheme, countLine, hideSecret } from './string.ts';

Deno.test('countGrapheme can count grapheme correctly', () => {
  assertEquals(countGrapheme('0123456789abcdef'), 16);
  assertEquals(countGrapheme('👨‍👩‍👧‍👦'), 1);
  assertEquals(countGrapheme('💕💥'), 2);
  assertEquals(countGrapheme('x\ny\nz\n'), 3);
  assertEquals(countGrapheme('Hello world'), 11);
  assertEquals(countGrapheme('あいうえお漢字'), 7);
});

Deno.test('countLine can count line correctly', () => {
  assertEquals(countLine('0123456789abcdef'), 1);
  assertEquals(countLine('👨‍👩‍👧‍👦'), 1);
  assertEquals(countLine('💕\n💥'), 2);
  assertEquals(countLine('x\ny\nz\n'), 4);
  assertEquals(countLine('Hello world'), 1);
  assertEquals(countLine('あいうえお漢字'), 1);
});

Deno.test('hideSecret can hide secret correctly', () => {
  assertEquals(hideSecret('secret_000verysecret000'), 'secret_...');
  assertEquals(
    hideSecret(
      'secret_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    ),
    'secret_1234567890abcdef...',
  );
});
