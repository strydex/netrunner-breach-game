export interface HelpCommandResult {
  cmd: string;
  helpStatement: string;
}

export interface ParsedCommandResult {
  cmd: string;
  arg1?: string;
  arg2?: string;
  arg3?: string;
}

export type CommandParserResult = HelpCommandResult | ParsedCommandResult;
