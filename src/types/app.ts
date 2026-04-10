export type AppWinState = "unset" | boolean;

export type StorageKey = "username" | "notes" | "theme" | "plan" | "warning";

export interface CommandHistoryEntry {
  cmd?: string;
  result?: string;
  result2?: string;
  result3?: string;
  result4?: string;
  result5?: string;
}

export type SshLocation = string;
export type IrcLocation = string;
