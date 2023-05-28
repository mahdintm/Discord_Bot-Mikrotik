import CodeGenerator from "node-code-generator";
var generator = new CodeGenerator();
export async function GenerateCode(length) {
  try {
    let pattern = "";
    for (let i = 0; i < length; i++) {
      pattern += "*";
    }
    return generator.generateCodes(pattern, 1, { alphanumericRegex: /\*(?!\+)/g });
  } catch (error) {
    console.log(error);
    return "AAAAA";
  }
}
