/**
 * @zh_CN 登录页面 url 地址
 */
export const LOGIN_PATH = '/auth/login';

export interface LanguageOption {
  label: string;
  value: 'en-US' | 'zh-CN' | 'vi-VN'; // Thêm 'vi-VN'
}

/**
 * Supported languages
 */
export const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en-US',
  },
  {
    label: 'Tiếng Việt', // Tiếng Việt
    value: 'vi-VN',
  },
];
