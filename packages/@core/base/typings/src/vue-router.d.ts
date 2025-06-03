import type { Component } from 'vue';
import type { Router, RouteRecordRaw } from 'vue-router';

interface RouteMeta {
  /**
   * Active icon (menu/tab)
   */
  activeIcon?: string;
  /**
   * The menu to activate; sometimes you want to activate the parent menu
   * instead of the current menu
   */
  activePath?: string;
  /**
   * Whether to fix the tab
   * @default false
   */
  affixTab?: boolean;
  /**
   * The order of the fixed tab
   * @default 0
   */
  affixTabOrder?: number;
  /**
   * Required role identifiers to access the route
   * @default []
   */
  authority?: string[];
  /**
   * Badge text
   */
  badge?: string;
  /**
   * Badge type
   */
  badgeType?: 'dot' | 'normal';
  /**
   * Badge color
   */
  badgeVariants?:
  | 'default'
  | 'destructive'
  | 'primary'
  | 'success'
  | 'warning'
  | string;
  /**
   * Use the full route path as the tab key (default true)
   */
  fullPathKey?: boolean;
  /**
   * Whether to hide children of this route in the menu
   * @default false
   */
  hideChildrenInMenu?: boolean;
  /**
   * Whether to hide this route in the breadcrumb
   * @default false
   */
  hideInBreadcrumb?: boolean;
  /**
   * Whether to hide this route in the menu
   * @default false
   */
  hideInMenu?: boolean;
  /**
   * Whether to hide this route in the tabs view
   * @default false
   */
  hideInTab?: boolean;
  /**
   * Icon (menu/tab)
   */
  icon?: Component | string;
  /**
   * iframe address
   */
  iframeSrc?: string;
  /**
   * Ignore permissions and allow access
   * @default false
   */
  ignoreAccess?: boolean;
  /**
   * Enable KeepAlive caching
   */
  keepAlive?: boolean;
  /**
   * External link target path
   */
  link?: string;
  /**
   * Whether the route has already been loaded
   */
  loaded?: boolean;
  /**
   * Maximum number of open tabs
   * @default -1
   */
  maxNumOfOpenTab?: number;
  /**
   * Menu is visible, but access will be redirected to 403
   */
  menuVisibleWithForbidden?: boolean;
  /**
   * Do not use the basic layout (only at the top level)
   */
  noBasicLayout?: boolean;
  /**
   * Open in a new window
   */
  openInNewWindow?: boolean;
  /**
   * Used for route-to-menu ordering
   */
  order?: number;
  /**
   * Parameters carried by the menu
   */
  query?: Recordable;
  /**
   * Title name
   */
  title: string;
}

// Define a recursive type to change the RouteRecordRaw's `component` property to string
type RouteRecordStringComponent<T = string> = Omit<
  RouteRecordRaw,
  'children' | 'component'
> & {
  children?: RouteRecordStringComponent<T>[];
  component: T;
};

type ComponentRecordType = Record<string, () => Promise<Component>>;

interface GenerateMenuAndRoutesOptions {
  fetchMenuListAsync?: () => Promise<RouteRecordStringComponent[]>;
  forbiddenComponent?: RouteRecordRaw['component'];
  layoutMap?: ComponentRecordType;
  pageMap?: ComponentRecordType;
  roles?: string[];
  router: Router;
  routes: RouteRecordRaw[];
}

export type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
  RouteMeta,
  RouteRecordRaw,
  RouteRecordStringComponent,
};
