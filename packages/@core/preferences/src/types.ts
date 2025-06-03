import type {
  AccessModeType,
  AuthPageLayoutType,
  BreadcrumbStyleType,
  BuiltinThemeType,
  ContentCompactType,
  DeepPartial,
  LayoutHeaderMenuAlignType,
  LayoutHeaderModeType,
  LayoutType,
  LoginExpiredModeType,
  NavigationStyleType,
  PageTransitionType,
  PreferencesButtonPositionType,
  TabsStyleType,
  ThemeModeType,
} from '@vben-core/typings';

type SupportedLanguagesType = 'en-US' | 'zh-CN' | 'vi-VN';

interface AppPreferences {
  /** Access mode */
  accessMode: AccessModeType;
  /** Login/registration page layout */
  authPageLayout: AuthPageLayoutType;
  /** Polling interval for checking updates */
  checkUpdatesInterval: number;
  /** Enable gray mode */
  colorGrayMode: boolean;
  /** Enable color weak mode */
  colorWeakMode: boolean;
  /** Enable compact mode */
  compact: boolean;
  /** Enable content compact mode */
  contentCompact: ContentCompactType;
  /** Content compact width */
  contentCompactWidth: number;
  /** Content padding */
  contentPadding: number;
  /** Content bottom padding */
  contentPaddingBottom: number;
  /** Content left padding */
  contentPaddingLeft: number;
  /** Content right padding */
  contentPaddingRight: number;
  /** Content top padding */
  contentPaddingTop: number;
  /** Default avatar */
  defaultAvatar: string;
  /** Default home path */
  defaultHomePath: string;
  /** Enable dynamic title */
  dynamicTitle: boolean;
  /** Enable check for updates */
  enableCheckUpdates: boolean;
  /** Show preferences */
  enablePreferences: boolean;
  /** Enable refresh token */
  enableRefreshToken: boolean;
  /** Is mobile device */
  isMobile: boolean;
  /** Layout type */
  layout: LayoutType;
  /** Supported language */
  locale: SupportedLanguagesType;
  /** Login expired mode */
  loginExpiredMode: LoginExpiredModeType;
  /** App name */
  name: string;
  /** Preferences button position */
  preferencesButtonPosition: PreferencesButtonPositionType;
  /** Enable watermark */
  watermark: boolean;
  /** z-index */
  zIndex: number;
}

interface BreadcrumbPreferences {
  /** Enable breadcrumbs */
  enable: boolean;
  /** Hide when only one item */
  hideOnlyOne: boolean;
  /** Show home icon */
  showHome: boolean;
  /** Show breadcrumb icons */
  showIcon: boolean;
  /** Breadcrumb style */
  styleType: BreadcrumbStyleType;
}

interface CopyrightPreferences {
  /** Company name */
  companyName: string;
  /** Company site link */
  companySiteLink: string;
  /** Copyright date */
  date: string;
  /** Enable copyright */
  enable: boolean;
  /** ICP number */
  icp: string;
  /** ICP site link */
  icpLink: string;
  /** Show settings panel */
  settingShow?: boolean;
}

interface FooterPreferences {
  /** Show footer */
  enable: boolean;
  /** Fix footer */
  fixed: boolean;
  /** Footer height */
  height: number;
}

interface HeaderPreferences {
  /** Show header */
  enable: boolean;
  /** Header height */
  height: number;
  /** Hide header via CSS */
  hidden: boolean;
  /** Header menu alignment */
  menuAlign: LayoutHeaderMenuAlignType;
  /** Header display mode */
  mode: LayoutHeaderModeType;
}

interface LogoPreferences {
  /** Show logo */
  enable: boolean;
  /** Logo image fit type */
  fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Logo source URL */
  source: string;
}

interface NavigationPreferences {
  /** Accordion mode for navigation */
  accordion: boolean;
  /** Split navigation (for layout=mixed-nav) */
  split: boolean;
  /** Navigation style */
  styleType: NavigationStyleType;
}

interface SidebarPreferences {
  /** Auto activate child menu when clicking directory */
  autoActivateChild: boolean;
  /** Sidebar collapsed */
  collapsed: boolean;
  /** Show sidebar collapse button */
  collapsedButton: boolean;
  /** Show title when sidebar collapsed */
  collapsedShowTitle: boolean;
  /** Sidebar collapse width */
  collapseWidth: number;
  /** Show sidebar */
  enable: boolean;
  /** Auto expand menus on hover */
  expandOnHover: boolean;
  /** Collapse extra sidebar area */
  extraCollapse: boolean;
  /** Extra sidebar collapsed width */
  extraCollapsedWidth: number;
  /** Show fixed button in sidebar */
  fixedButton: boolean;
  /** Hide sidebar (CSS) */
  hidden: boolean;
  /** Mixed sidebar width */
  mixedWidth: number;
  /** Sidebar width */
  width: number;
}

interface ShortcutKeyPreferences {
  /** Enable global shortcuts */
  enable: boolean;
  /** Enable global lock screen shortcut */
  globalLockScreen: boolean;
  /** Enable global logout shortcut */
  globalLogout: boolean;
  /** Enable global preferences shortcut */
  globalPreferences: boolean;
  /** Enable global search shortcut */
  globalSearch: boolean;
}

interface TabbarPreferences {
  /** Enable tab drag-and-drop */
  draggable: boolean;
  /** Enable multiple tabs */
  enable: boolean;
  /** Tab height */
  height: number;
  /** Enable tab caching */
  keepAlive: boolean;
  /** Max tab count */
  maxCount: number;
  /** Close tab with middle click */
  middleClickToClose: boolean;
  /** Persist tabs */
  persist: boolean;
  /** Show tab icons */
  showIcon: boolean;
  /** Show maximize button */
  showMaximize: boolean;
  /** Show more button */
  showMore: boolean;
  /** Tab style type */
  styleType: TabsStyleType;
  /** Enable vertical scroll with wheel */
  wheelable: boolean;
}

interface ThemePreferences {
  /** Built-in theme type */
  builtinType: BuiltinThemeType;
  /** Destructive color */
  colorDestructive: string;
  /** Primary color */
  colorPrimary: string;
  /** Success color */
  colorSuccess: string;
  /** Warning color */
  colorWarning: string;
  /** Theme mode */
  mode: ThemeModeType;
  /** Border radius */
  radius: string;
  /** Semi-dark header (only for light theme) */
  semiDarkHeader: boolean;
  /** Semi-dark sidebar (only for light theme) */
  semiDarkSidebar: boolean;
}

interface TransitionPreferences {
  /** Enable page transition animation */
  enable: boolean;
  /** Enable page loading animation */
  loading: boolean;
  /** Page transition animation name */
  name: PageTransitionType | string;
  /** Enable progress bar animation */
  progress: boolean;
}

interface WidgetPreferences {
  /** Enable fullscreen widget */
  fullscreen: boolean;
  /** Enable global search widget */
  globalSearch: boolean;
  /** Enable language toggle widget */
  languageToggle: boolean;
  /** Enable lock screen widget */
  lockScreen: boolean;
  /** Show notification widget */
  notification: boolean;
  /** Show refresh button */
  refresh: boolean;
  /** Show sidebar toggle widget */
  sidebarToggle: boolean;
  /** Show theme toggle widget */
  themeToggle: boolean;
}

interface Preferences {
  /** Global app preferences */
  app: AppPreferences;
  /** Breadcrumb preferences */
  breadcrumb: BreadcrumbPreferences;
  /** Copyright preferences */
  copyright: CopyrightPreferences;
  /** Footer preferences */
  footer: FooterPreferences;
  /** Header preferences */
  header: HeaderPreferences;
  /** Logo preferences */
  logo: LogoPreferences;
  /** Navigation preferences */
  navigation: NavigationPreferences;
  /** Shortcut keys preferences */
  shortcutKeys: ShortcutKeyPreferences;
  /** Sidebar preferences */
  sidebar: SidebarPreferences;
  /** Tabbar preferences */
  tabbar: TabbarPreferences;
  /** Theme preferences */
  theme: ThemePreferences;
  /** Transition preferences */
  transition: TransitionPreferences;
  /** Widget preferences */
  widget: WidgetPreferences;
}

type PreferencesKeys = keyof Preferences;

interface InitialOptions {
  namespace: string;
  overrides?: DeepPartial<Preferences>;
}

export type {
  AppPreferences,
  BreadcrumbPreferences,
  FooterPreferences,
  HeaderPreferences,
  InitialOptions,
  LogoPreferences,
  NavigationPreferences,
  Preferences,
  PreferencesKeys,
  ShortcutKeyPreferences,
  SidebarPreferences,
  SupportedLanguagesType,
  TabbarPreferences,
  ThemePreferences,
  TransitionPreferences,
  WidgetPreferences,
};
