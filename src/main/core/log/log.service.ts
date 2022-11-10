import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

import { logger } from './log.util';

@Injectable({ scope: Scope.TRANSIENT })
export class LogService extends ConsoleLogger {
  public info(message: string) {
    logger.info(`[${this.context}] ${message}`);
  }

  public override log(message: string) {
    logger.info(`[${this.context}] ${message}`);
  }

  public override debug(message: string) {
    logger.debug(`[${this.context}] ${message}`);
  }

  public override error(message: string, trace?: string) {
    logger.error(`[${this.context}] ${message} ${trace ? ': ' + trace : ''}`);
  }

  public static log(message: string, context?: string) {
    logger.info(`[${context}] ${message}`);
  }

  public static debug(message: any, context?: string) {
    logger.debug(`[${context || '?'}] ${message}`);
  }

  public static error(message: any, trace?: string, context?: string) {
    logger.error(`[${context || '?'}] ${message}: ${trace ? ': ' + trace : ''}`);
  }
}
