import { Logger } from "./app/models";

export default function createLogger(tag: string): Logger {
  function log(message?: any, ...optionalParams: any[]): void {
    return console.log(`[${tag}] ${message}`, ...optionalParams);
  }
  function info(message?: any, ...optionalParams: any[]): void {
    return console.info(`[${tag}] ${message}`, ...optionalParams);
  }
  function error(message?: any, ...optionalParams: any[]): void {
    return console.error(`[${tag}] ${message}`, ...optionalParams);
  }
  return { log, info, error };
}
