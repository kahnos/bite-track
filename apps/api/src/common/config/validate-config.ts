import { ENV_CONFIGURATION } from '@bite-track/types';
import { Logger } from '@nestjs/common';

/**
 * Validate the config object based on ENV_CONFIGURATION constant.
 * @param config The configuration object to validate.
 */
export const validateConfig = (config: Record<string, any>): Record<string, any> => {
  const logger = new Logger('validateConfig');
  const requiredKeys = Object.keys(ENV_CONFIGURATION);

  // Validate every key in the env_configuration is present in the config object and is not undefined, or throw an error.
  const missingKeys = requiredKeys.filter((key) => !config[key]);
  if (missingKeys.length) {
    logger.error({
      message: `❌❌ Missing required configuration keys ❌❌ ${missingKeys.join(' | ')}`,
    });
    process.exit(0);
  }

  return config;
};
