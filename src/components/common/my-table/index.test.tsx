import { render, screen, within } from '@testing-library/react';
import { TableComponent } from './index';
import { ColumnOptionsList, TableProps } from './types';

interface TestData {
  id: string;
  name: string;
}

const mockRenderCellContent = jest.fn();
const mockRenderHeaderContent = jest.fn();

const data: TestData[] = [
  { id: '1', name: 'a' },
  { id: '2', name: 'b' },
];
const columns: ColumnOptionsList<TestData> = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Ten' },
];

const setupTest = (props: TableProps<TestData>) => {
  render(<TableComponent {...props} />);
};

describe('Table Component', () => {
  // run before each test
  beforeEach(() => {
    console.log('before testcase run');
  });

  afterEach(() => {
    console.log('after testcase run');
    jest.clearAllMocks(); // reset all mocks(calls, parameters)
  });

  beforeAll(() => {
    console.log('before ALL testcase');
  });

  afterAll(() => {
    console.log('after ALL testcase');
  });

  it('should render table head', () => {
    setupTest({ data, columns });
    // screen.debug();clg component html

    //check STT header
    // const header = screen.getByText('STT');
    // const header2 = screen.getByText('Ten');

    //Khang dinh
    // expect(header).toBeVisible();
    // expect(header2).toBeVisible();
    // expect(header).toBeInTheDocument();

    // Phu dinh
    // expect(header).not.toBeVisible();

    const headerRow = screen.getAllByRole('row').shift();

    expect(headerRow).toBeVisible();

    const headerCells = within(headerRow!).getAllByRole('columnheader');

    columns.forEach((item, index) => {
      expect(headerCells[index]).toHaveTextContent(String(item.name));
    });
  });

  it('should render table cell', () => {
    setupTest({ data, columns });

    const rows = screen.getAllByRole('row').slice(1);

    expect(rows).toHaveLength(data.length);
  });

  // it.only: chay 1 test; it.skip: bo qua test do

  it('should render data', () => {
    setupTest({ data, columns });

    const dataRows = screen.getAllByRole('row').slice(1);

    dataRows.forEach((row, index) => {
      const item = data[index];
      const cells = within(row).getAllByRole('cell');

      columns.forEach(({ key }, index) => {
        const dataContent = item[key!]; // key! force cho TS biet ko undefined

        expect(cells[index]).toHaveTextContent(dataContent);
      });
    });
  });

  it('should render no data section', () => {
    setupTest({ columns, data: [] });

    const cell = screen.getByText('Không có dữ liệu');

    expect(cell).toBeVisible();
  });

  it('should call render cell content', () => {
    setupTest({
      data,
      columns: [
        { name: 'STT', renderCellContent: mockRenderCellContent },
        ...columns,
      ],
    });

    // console.log(mockRenderCellContent.mock.calls); //xem info goi ham cua mock

    expect(mockRenderCellContent).toBeCalled();
    expect(mockRenderCellContent).toBeCalledTimes(data.length);
  });

  it('should render undefined cell', () => {
    setupTest({ data, columns: [{ name: 'STT' }] });

    const dataRows = screen.getAllByRole('row').slice(1);

    dataRows.forEach((row) => {
      const cell = within(row).getByRole('cell');

      expect(cell).toBeEmptyDOMElement();
    });
  });

  it('should call render header content', () => {
    setupTest({
      columns: [{ name: 'STT', renderHeaderContent: mockRenderHeaderContent }],
      data: [],
    });

    expect(mockRenderHeaderContent).toBeCalled();
    expect(mockRenderHeaderContent).toBeCalledTimes(1);
  });
});
