import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import util from 'util';

import { apiUrls } from '~common/constants';
import type { IConfig } from '~common/interfaces/IConfig';
import { LogService } from '~main/core/log';

const defaultAgentConfig: IConfig = { apiUrl: process.env.NODE_ENV === 'dev' ? apiUrls.localhost : apiUrls.prod };

export function configuration() {
  const userData = app.getPath('userData');
  const configPath = path.resolve(userData, 'config.json');

  if (fs.existsSync(configPath)) {
    return loadUserConfig(configPath);
  } else {
    return createAndLoadDefaultConfig(configPath);
  }
}

function loadUserConfig(configPath: string) {
  return {
    ...defaultAgentConfig,
    ...loadConfig(configPath),
  };
}

function createAndLoadDefaultConfig(configPath: string) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(defaultAgentConfig), { encoding: 'utf-8' });
  } catch (error) {
    LogService.log(`Error while write config file ${util.inspect(error)}`);
  } finally {
    return defaultAgentConfig;
  }
}

function loadConfig(configPath: string) {
  try {
    const data = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as unknown;

    if (isConfig(data)) {
      return validateConfig(data);
    } else {
      return defaultAgentConfig;
    }
  } catch (error) {
    LogService.log(`Error while reading user config file: ${util.inspect(error)}`);

    return defaultAgentConfig;
  }
}

function isConfig(config: unknown): config is IConfig {
  return !Array.isArray(config) && typeof config === 'object';
}

function validateConfig(config: IConfig) {
  const outConfig: IConfig = { ...config };

  if (!Object.values(apiUrls).includes(config.apiUrl)) {
    outConfig.apiUrl = apiUrls.prod;
  }

  return outConfig;
}
