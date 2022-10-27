export interface Logger {
  log(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
}

export default function createLogger(tag: string): Logger {
  function log(message?: any, ...optionalParams: any[]): void {
    return console.log(`[${tag}] ${message}`, ...optionalParams);
  }
  function error(message?: any, ...optionalParams: any[]): void {
    return console.error(`[${tag}] ${message}`, ...optionalParams);
  }
  return { log, error };
}
