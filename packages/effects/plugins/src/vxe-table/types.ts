import type {
  VxeGridListeners,
  VxeGridPropTypes,
  VxeGridProps as VxeTableGridProps,
  VxeUIExport,
} from 'vxe-table';

import type { Ref } from 'vue';

import type { ClassType, DeepPartial } from '@vben/types';

import type { VbenFormProps } from '@vben-core/form-ui';

import type { VxeGridApi } from './api';

import { useVbenForm } from '@vben-core/form-ui';

export interface VxePaginationInfo {
  currentPage: number;
  pageSize: number;
  total: number;
}

interface ToolbarConfigOptions extends VxeGridPropTypes.ToolbarConfig {
  /** Show the button to toggle the search form */
  search?: boolean;
}

export interface VxeTableGridOptions<T = any> extends VxeTableGridProps<T> {
  /** Toolbar configuration */
  toolbarConfig?: ToolbarConfigOptions;
}

export interface SeparatorOptions {
  show?: boolean;
  backgroundColor?: string;
}

export interface VxeGridProps {
  /**
   * Table title
   */
  tableTitle?: string;
  /**
   * Help text for the title
   */
  tableTitleHelp?: string;
  /**
   * Component CSS class
   */
  class?: ClassType;
  /**
   * CSS class for vxe-grid
   */
  gridClass?: ClassType;
  /**
   * vxe-grid configuration
   */
  gridOptions?: DeepPartial<VxeTableGridOptions>;
  /**
   * vxe-grid event listeners
   */
  gridEvents?: DeepPartial<VxeGridListeners>;
  /**
   * Form configuration
   */
  formOptions?: VbenFormProps;
  /**
   * Show search form
   */
  showSearchForm?: boolean;
  /**
   * Separator between search form and table content
   */
  separator?: boolean | SeparatorOptions;
}

export type ExtendedVxeGridApi = VxeGridApi & {
  useStore: <T = NoInfer<VxeGridProps>>(
    selector?: (state: NoInfer<VxeGridProps>) => T,
  ) => Readonly<Ref<T>>;
};

export interface SetupVxeTable {
  configVxeTable: (ui: VxeUIExport) => void;
  useVbenForm: typeof useVbenForm;
}
