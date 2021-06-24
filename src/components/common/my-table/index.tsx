import React from 'react';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from '@material-ui/core';
import { TableProps } from './types';
import { renderHeader, renderBody } from './utils';

export function TableComponent<TRecord>(props: TableProps<TRecord>) {
  const { data, columns, tableProps, tableHeadProps } = props;
  return (
    <MuiTable {...tableProps}>
      <MuiTableHead {...tableHeadProps}>
        <MuiTableRow>{renderHeader(columns)}</MuiTableRow>
      </MuiTableHead>
      <MuiTableBody>
        {renderBody(data, columns)}
        {data.length === 0 && (
          <MuiTableRow>
            <MuiTableCell colSpan={columns.length}>
              Không có dữ liệu
            </MuiTableCell>
          </MuiTableRow>
        )}
      </MuiTableBody>
    </MuiTable>
  );
}

const Table = React.memo(TableComponent) as typeof TableComponent &
  React.ComponentType<any>;
Table.displayName = 'Table';

export * from './types';

export default Table;
