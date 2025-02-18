// Define the binary encoding for each part of a C-instruction.
export const compMap = {
    '0': '010101',
    '1': '011111',
    '-1': '011110',
    'D': '000110',
    'A': '011000',
    'M': '111000',
    '!D': '000111',
    '!A': '011001',
    '!M': '111001',
    '-D': '000011',
    '-A': '011011',
    '-M': '111011',
    'D+1': '001111',
    'A+1': '011111',
    'M+1': '111111',
    'D-1': '000011',
    'A-1': '011010',
    'M-1': '111010',
    'D+A': '000010',
    'A+D': '000010',
    'D+M': '100010',
    'M+D': '100010',
    'D-A': '001000',
    'D-M': '101000',
    'A-D': '000011',
    'M-D': '100011',
    'D&A': '000000',
    'D&M': '100000',
    'D|A': '001010',
    'D|M': '101010',
  };

  export const destMap = {
    'null': '000',
    'M': '001',
    'D': '010',
    'MD': '011',
    'A': '100',
    'AM': '101',
    'AD': '110',
    'AMD': '111',
  };

  export const jumpMap = {
    'null': '000',
    'JGT': '001',
    'JEQ': '010',
    'JGE': '011',
    'JLT': '100',
    'JNE': '101',
    'JLE': '110',
    'JMP': '111',
  };

  export const predefinedSymbols = {
    "SP": 0x0000,   // Stack pointer
    "LCL": 0x0001,  // Local variable pointer
    "ARG": 0x0002,  // Argument pointer
    "THIS": 0x0003, // This pointer
    "THAT": 0x0004, // That pointer
    "R0": 0x0000,   // Register 0
    "R1": 0x0001,   // Register 1
    "R2": 0x0002,   // Register 2
    "R3": 0x0003,   // Register 3
    "R4": 0x0004,   // Register 4
    "R5": 0x0005,   // Register 5
    "R6": 0x0006,   // Register 6
    "R7": 0x0007,   // Register 7
    "R8": 0x0008,   // Register 8
    "R9": 0x0009,   // Register 9
    "R10": 0x000A,  // Register 10
    "R11": 0x000B,  // Register 11
    "R12": 0x000C,  // Register 12
    "R13": 0x000D,  // Register 13
    "R14": 0x000E,  // Register 14
    "R15": 0x000F,  // Register 15
    "SCREEN": 0x4000, // Screen memory start
    "KBD": 0x6000,  // Keyboard memory start
    "INPUT": 0x600D, // Keyboard input register (for Hack input)
    "OUTPUT": 0x6000, // Keyboard output register (for Hack output)
  };
  
  
