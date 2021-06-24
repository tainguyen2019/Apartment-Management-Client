import React from 'react';
import { TableCell, TableRow, TableCellProps } from '@material-ui/core';
import { ColumnOptionsList } from './types';

export function renderBody<TRecord>(
  data: Array<TRecord>,
  columns: ColumnOptionsList<TRecord>,
) {
  return data.map((record, index) =>
    renderRow(`tr-${index}`, columns, record, index),
  );
}

export function renderRow<TRecord>(
  rowKey: React.Key,
  columns: ColumnOptionsList<TRecord>,
  record: TRecord,
  index: number,
) {
  return (
    <TableRow key={rowKey}>
      {columns.map(({ name, key: columnKey, cellProps, renderCellContent }) => {
        const content = renderCellContent
          ? renderCellContent(record, index)
          : (columnKey && record[columnKey]) || undefined;
        return renderCell(`td-${columnKey ?? name}`, content, cellProps);
      })}
    </TableRow>
  );
}

export function renderHeader<TRecord>(columns: ColumnOptionsList<TRecord>) {
  return columns.map(({ key, name, renderHeaderContent }) => {
    const cellContent = renderHeaderContent ? renderHeaderContent() : name;
    return renderCell(`th-${key ?? name}`, cellContent);
  });
}

export function renderCell(
  key: React.Key,
  content: React.ReactNode,
  cellProps?: TableCellProps,
) {
  return (
    <TableCell key={key} {...cellProps}>
      {content}
    </TableCell>
  );
}
