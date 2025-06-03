export type SupportedLanguagesType = 'en-US' | 'zh-CN' | 'vi-VN';

export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>;

/**
 * Load message function
 * @param lang
 * @returns
 */
export type LoadMessageFn = (
  lang: SupportedLanguagesType,
) => Promise<Record<string, string> | undefined>;

/**
 * Setup options for i18n
 */
export interface LocaleSetupOptions {
  /**
   * Default language
   * @default zh-CN
   */
  defaultLocale?: SupportedLanguagesType;

  /**
   * Load message function
   */
  loadMessages?: LoadMessageFn;

  /**
   * Whether to warn when the key is not found
   */
  missingWarn?: boolean;
}
