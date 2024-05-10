import fs from "fs";
import { isNumber } from "@pureadmin/utils";
import path from "path";

/** 当前文件夹 */
const currentDir = process.cwd();

const srcDir = path.join(currentDir, "src");
const svgDir = path.join(currentDir, "src", "assets", "svg");

const filePath = path.join(srcDir, "utils", "svg.ts");

/** 导入语句 */
let importStatements = "";

/** 导出键 */
let exportedKeys = "";

/** 获取文件中内容 */
const readFolder = (dir: string, filesList: string[] = []): string[] => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filesList = readFolder(filePath, filesList);
    } else {
      if (filePath.endsWith(".svg")) {
        const fileName = file.replace(".svg", "");
        if (!isNumber(fileName)) {
          const srcPath = filePath.replace(srcDir, "@").replace(/\\/g, "/");
          const svgName = fileName + "Svg";
          importStatements += `import ${svgName} from "${srcPath}?component";\n`;
          exportedKeys += svgName + " , ";
          filesList.push(filePath);
        }
      }
    }
  });
  return filesList;
};

/** 写入文件内容 */
const writeFile = (filePath: string, content: string) => {
  try {
    fs.writeFileSync(filePath, content);
    console.log("svg导出构建成功");
  } catch (error) {
    console.error("出现错误:", error);
  }
};

export const runMain = () => {
  console.log("开始构建svg导出\n");
  const files = readFolder(svgDir);
  console.log(`共${files.length}个文件\n`);
  /** 导出语句 */
  const exportStatement = `\nexport default function useLocalSvg() { \n\treturn { ${exportedKeys} }; \n}\n`;
  const content = importStatements + exportStatement;
  writeFile(filePath, content);
};

runMain();
