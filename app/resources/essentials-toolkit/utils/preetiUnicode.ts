/**
 * Preeti <-> Unicode Nepali Font Converter
 * Standard mapping for traditional Nepali Preeti keyboard and modern Unicode.
 */

// Preeti to Unicode mapping rules
const PREETI_TO_UNICODE_MAP: [string, string][] = [
  // Compound / special characters
  ["qm", "फ"],
  ["s\\", "क्"],
  ["v\\", "ख्"],
  ["u\\", "ग्"],
  ["3\\", "घ्"],
  ["r\\", "च्"],
  ["5\\", "छ्"],
  ["h\\", "ज्"],
  ["¹\\", "झ्"],
  ["t\\", "त्"],
  ["y\\", "थ्"],
  ["b\\", "द्"],
  ["w\\", "ध्"],
  ["g\\", "न्"],
  ["k\\", "प्"],
  ["a\\", "ब्"],
  ["e\\", "भ्"],
  ["d\\", "म्"],
  ["o\\", "य्"],
  ["n\\", "ल्"],
  ["j\\", "व्"],
  ["z\\", "श्"],
  ["if\\", "ष्"],
  [";\\", "स्"],
  ["x\\", "ह्"],
  ["1", "ज्ञ"],
  ["2", "द्द"],
  ["4", "द्ध"],
  ["!", "१"],
  ["@", "२"],
  ["#", "३"],
  ["$", "४"],
  ["%", "५"],
  ["^", "६"],
  ["&", "७"],
  ["*", "८"],
  ["(", "९"],
  [")", "०"],
  ["cf]", "ओ"],
  ["cf}", "औ"],
  ["cf", "आ"],
  ["c", "अ"],
  ["O{", "ई"],
  ["O", "इ"],
  ["pm", "ऊ"],
  ["p", "उ"],
  ["P{", "ॠ"],
  ["P", "ए"],
  ["P]", "ऐ"],
  ["s", "क"],
  ["v", "ख"],
  ["u", "ग"],
  ["3", "घ"],
  ["ª", "ङ"],
  ["r", "च"],
  ["5", "छ"],
  ["h", "ज"],
  ["¹", "झ"],
  ["`", "ञ"],
  ["6", "ट"],
  ["7", "ठ"],
  ["8", "ड"],
  ["9", "ढ"],
  ["0", "ण"],
  ["t", "त"],
  ["y", "थ"],
  ["b", "द"],
  ["w", "ध"],
  ["g", "न"],
  ["k", "प"],
  ["km", "फ"],
  ["a", "ब"],
  ["e", "भ"],
  ["d", "म"],
  ["o", "य"],
  ["/", "र"],
  ["n", "ल"],
  ["j", "व"],
  ["z", "श"],
  ["if", "ष"],
  [";", "स"],
  ["x", "ह"],
  ["If", "क्ष"],
  ["q", "त्र"],
  ["¿", "ज्ञ"],
  ["|", "।"],
  ["f]", "ो"],
  ["f}", "ौ"],
  ["f", "ा"],
  ["L", "ी"],
  ["'", "ु"],
  ['"', "ू"],
  ["[", "ृ"],
  ["{", "र्"],
  ["}", "ै"],
  ["]", "े"],
  ["+", "्"],
  ["?", "रु"],
  ["¿", "रू"],
  ["M", "ं"],
  [":", "ः"],
  ["F", "ँ"],
  ["~", "ङ"],
];

/**
 * Convert Preeti text to Unicode
 */
export function convertPreetiToUnicode(text: string): string {
  let res = text;

  // Handle 'l' (short i matra) which comes BEFORE the consonant in Preeti
  // e.g. "ls" -> "कि"
  res = res.replace(/l([s-x,A-Z,a-z,0-9,ª,¹,`,¿,1-9])/g, "$1l");
  res = res.replace(/l/g, "ि");

  // Replace each mapped character
  for (const [preeti, unicode] of PREETI_TO_UNICODE_MAP) {
    res = res.split(preeti).join(unicode);
  }

  // Handle reph ("{")
  res = res.replace(/\{([क-ह])/g, "$1्");

  return res;
}

/**
 * Convert Unicode text to Preeti
 */
export function convertUnicodeToPreeti(text: string): string {
  let res = text;

  // Reverse mapping
  for (let i = PREETI_TO_UNICODE_MAP.length - 1; i >= 0; i--) {
    const [preeti, unicode] = PREETI_TO_UNICODE_MAP[i];
    res = res.split(unicode).join(preeti);
  }

  // Reverse short i matra position: consonant + 'ि' -> 'l' + consonant
  res = res.replace(/([s-x,A-Z,a-z,0-9,ª,¹,`,¿,1-9])ि/g, "l$1");

  return res;
}
