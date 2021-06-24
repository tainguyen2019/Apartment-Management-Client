import React from 'react';
import {
  TableProps as MuiTableProps,
  TableHeadProps as MuiTableHeadProps,
  TableCellProps as MuiTableCellProps,
} from '@material-ui/core';

export interface TableProps<TRecord> {
  data: Array<TRecord>;
  columns: ColumnOptionsList<TRecord>;
  tableProps?: ExcludeChildren<MuiTableProps>;
  tableHeadProps?: ExcludeChildren<MuiTableHeadProps>;
}

export interface ColumnOptions<TRecord> {
  key?: keyof TRecord;
  name: React.ReactNode;
  cellProps?: Partial<MuiTableCellProps>;
  cellHeadProps?: Partial<MuiTableCellProps>;
  renderCellContent?: ColumnRenderer<TRecord>;
  renderHeaderContent?: HeaderRenderer;
}

export type ColumnOptionsList<TRecord> = Array<ColumnOptions<TRecord>>;
export type ColumnRenderer<TRecord> = (
  record: TRecord,
  index: number,
) => React.ReactNode;
export type HeaderRenderer = () => React.ReactNode;
