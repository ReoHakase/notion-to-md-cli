const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });

// Counts the number of graphemes in a string naturally.
export const countGrapheme = (str: string): number => {
  const count = [...segmenter.segment(str.replace(/\n/g, ''))].length;
  return count;
};

// Counts the number of lines in a string.
export const countLine = (str: string): number => {
  const line = str.split('\n').length;
  return line;
};

// Hides the secret part of a string to keep the secret safe.
export const hideSecret = (str: string): string => {
  const hiddenString = str.substring(0, str.length / 3) + '...';
  return hiddenString;
};
