import { useState } from "react";
import { jumpMap, destMap, compMap, predefinedSymbols } from "./constante.js";

export default function App() {
  const [assembly, setAssembly] = useState("");
  const [binary, setBinary] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const convertToBinary = () => {
    setErrorMsg(""); // Clear previous error messages
    const lines = assembly
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("//"));

    let binaryLines = [];
    let hasError = false;
    let labelMap = {};
    let variableAddress = 16;
    let lineCounter = 0;

    // First pass: Collect labels
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("(") && line.endsWith(")")) {
        const label = line.slice(1, -1);
        labelMap[label] = lineCounter;
      } else {
        lineCounter++;
      }
    }

    // Second pass: Translate instructions
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("(")) continue;

      const translatedLine = translateLine(line, labelMap, () => variableAddress++);
      if (translatedLine === null) {
        hasError = true;
        break;
      }
      binaryLines.push(translatedLine);
    }

    if (hasError) {
      setBinary("");
    } else {
      setBinary(binaryLines.join("\n"));
    }
  };

  const isAinstruction = (line, labelMap, getNewVariableAddress) => {
    line = line.split("//")[0].trim();
    if (!line.startsWith("@")) return null;

    const symbol = line.substring(1).trim();

    if (predefinedSymbols[symbol]) {
      return predefinedSymbols[symbol].toString(2).padStart(16, "0");
    }

    if (!isNaN(symbol)) {
      return parseInt(symbol).toString(2).padStart(16, "0");
    }

    if (labelMap[symbol] !== undefined) {
      return labelMap[symbol].toString(2).padStart(16, "0");
    }

    if (!(symbol in labelMap)) {
      labelMap[symbol] = getNewVariableAddress();
    }

    return labelMap[symbol].toString(2).padStart(16, "0");
  };

  const isCinstruction = (line) => {
    let dest = "null";
    let comp = "";
    let jump = "null";

    line = line.split("//")[0].trim();

    if (line.includes("=")) {
      const [destPart, compJump] = line.split("=");
      dest = destPart;
      if (compJump.includes(";")) {
        const [compPart, jumpPart] = compJump.split(";");
        comp = compPart;
        jump = jumpPart;
      } else {
        comp = compJump;
      }
    } else if (line.includes(";")) {
      const [compPart, jumpPart] = line.split(";");
      comp = compPart;
      jump = jumpPart;
    }

    if (dest in destMap && comp in compMap && jump in jumpMap) {
      return "111" + compMap[comp] + destMap[dest] + jumpMap[jump];
    }

    setErrorMsg(`Invalid instruction: ${line}`);
    return null;
  };

  const translateLine = (line, labelMap, getNewVariableAddress) => {
    const aInstruction = isAinstruction(line, labelMap, getNewVariableAddress);
    if (aInstruction !== null) return aInstruction;
    return isCinstruction(line);
  };

  return (
    <div className="mt-4 flex flex-col items-center p-4 space-y-4 max-w-xl mx-auto">
      <h1 className=" text-2xl font-bold">Online Hack Assembler</h1>
      <textarea
        className="w-full h-40 p-2 border rounded-lg"
        placeholder="Enter Hack Assembly Code"
        value={assembly}
        onChange={(e) => setAssembly(e.target.value)}
      ></textarea>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={convertToBinary}
      >
        Convert
      </button>
      {binary ? (
        <textarea
          className="w-full h-40 p-2 border rounded-lg bg-gray-100"
          readOnly
          value={binary}
        ></textarea>
      ) : (
        <textarea
          className={`w-full h-40 p-2 border rounded-lg bg-gray-100 ${
            errorMsg ? "text-red-500 border-red-500" : ""
          }`}
          readOnly
          value={errorMsg || ""}
          placeholder="Output value will be placed here..."
        ></textarea>
      )}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => {
          setAssembly("");
          setBinary("");
          setErrorMsg("");
        }}
      >
        Clear
      </button>
      <h2 className="text-2xl mt-35">Created by: Mihailo Terzic</h2>
    </div>
  );
}
