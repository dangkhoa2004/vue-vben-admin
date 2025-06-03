import type { Recordable } from '@vben/types';
import { requestClient } from '#/api/request';

export namespace SystemMenuApi {
  /** Badge color variants */
  export const BadgeVariants = [
    'default',
    'destructive',
    'primary',
    'success',
    'warning',
  ] as const;

  /** Badge types */
  export const BadgeTypes = ['dot', 'normal'] as const;

  /** Menu types */
  export const MenuTypes = [
    'catalog',
    'menu',
    'embedded',
    'link',
    'button',
  ] as const;

  /** System menu item definition */
  export interface SystemMenu {
    [key: string]: any;
    /** Backend permission identifier */
    authCode: string;
    /** Child menu items */
    children?: SystemMenu[];
    /** Component */
    component?: string;
    /** Menu ID */
    id: string;
    /** Menu metadata */
    meta?: {
      /** Icon when active */
      activeIcon?: string;
      /** Active path for route-based menus */
      activePath?: string;
      /** Pin in tab bar */
      affixTab?: boolean;
      /** Order of pin in tab bar */
      affixTabOrder?: number;
      /** Badge content (valid when badge type is normal) */
      badge?: string;
      /** Badge type */
      badgeType?: (typeof BadgeTypes)[number];
      /** Badge color variant */
      badgeVariants?: (typeof BadgeVariants)[number];
      /** Hide child menus in sidebar */
      hideChildrenInMenu?: boolean;
      /** Hide in breadcrumb */
      hideInBreadcrumb?: boolean;
      /** Hide in sidebar */
      hideInMenu?: boolean;
      /** Hide in tab bar */
      hideInTab?: boolean;
      /** Menu icon */
      icon?: string;
      /** URL for embedded iframe */
      iframeSrc?: string;
      /** Whether to cache the page */
      keepAlive?: boolean;
      /** External link URL */
      link?: string;
      /** Maximum number of open tabs for the same route */
      maxNumOfOpenTab?: number;
      /** No basic layout required */
      noBasicLayout?: boolean;
      /** Open in new window */
      openInNewWindow?: boolean;
      /** Menu order */
      order?: number;
      /** Extra query parameters for the route */
      query?: Recordable<any>;
      /** Menu title */
      title?: string;
    };
    /** Menu name */
    name: string;
    /** Route path */
    path: string;
    /** Parent ID */
    pid: string;
    /** Redirect path */
    redirect?: string;
    /** Menu type */
    type: (typeof MenuTypes)[number];
  }
}

/**
 * Fetch the list of menus
 */
async function getMenuList() {
  return requestClient.get<Array<SystemMenuApi.SystemMenu>>('/system/menu/list');
}

/**
 * Check if a menu name already exists
 * @param name Menu name
 * @param id Optional menu ID
 */
async function isMenuNameExists(
  name: string,
  id?: SystemMenuApi.SystemMenu['id'],
) {
  return requestClient.get<boolean>('/system/menu/name-exists', {
    params: { id, name },
  });
}

/**
 * Check if a menu path already exists
 * @param path Menu path
 * @param id Optional menu ID
 */
async function isMenuPathExists(
  path: string,
  id?: SystemMenuApi.SystemMenu['id'],
) {
  return requestClient.get<boolean>('/system/menu/path-exists', {
    params: { id, path },
  });
}

/**
 * Create a new menu
 * @param data Menu data (excluding children and id)
 */
async function createMenu(
  data: Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>,
) {
  return requestClient.post('/system/menu', data);
}

/**
 * Update an existing menu
 * @param id Menu ID
 * @param data Updated menu data (excluding children and id)
 */
async function updateMenu(
  id: string,
  data: Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>,
) {
  return requestClient.put(`/system/menu/${id}`, data);
}

/**
 * Delete a menu
 * @param id Menu ID
 */
async function deleteMenu(id: string) {
  return requestClient.delete(`/system/menu/${id}`);
}

export {
  createMenu,
  deleteMenu,
  getMenuList,
  isMenuNameExists,
  isMenuPathExists,
  updateMenu,
};
