import React from 'react';
import { useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AreaState, buildAreaState } from 'redux/area/reducer';
import { RootState } from 'redux/rootReducer';
import { createMockStore } from 'testUtils';
import theme from 'theme';

import AreaSelect, { AreaSelectProps, DEFAULT_OPTION } from './index';

interface TestFormValues {
  area_id: string;
}

interface TestComponentProps extends Partial<AreaSelectProps> {
  defaultAreaId?: string;
}

const areas = [
  {
    id: '569623f5-0ff5-44bd-8f2b-dd3a387b0d5e',
    building: 'A',
    location: 'Lobby',
  },
  {
    id: '0eef529c-a9e6-4000-85d7-37b87f6e76f5',
    building: 'A',
    location: 'Floors',
  },
];

const mockSubmit = jest.fn();

const TestComponent: React.FC<TestComponentProps> = ({
  defaultAreaId = '',
  ...props
}) => {
  const { control, handleSubmit } = useForm<TestFormValues>({
    defaultValues: { area_id: defaultAreaId },
  });

  return (
    <form onSubmit={handleSubmit((values) => mockSubmit(values))}>
      <AreaSelect {...props} control={control} name="area_id" id="area_id" />
      <button type="submit">Submit</button>
    </form>
  );
};
const defaultAreaState = buildAreaState({ data: { areas } });

const setupTest = (props: TestComponentProps, areaState?: AreaState) => {
  const mockStore = createMockStore({
    area: areaState ?? defaultAreaState,
  } as RootState);

  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={theme}>
        <TestComponent {...props} />
      </ThemeProvider>
    </Provider>,
  );
};

describe('AreaSelect', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without error', () => {
    setupTest({
      label: 'area',
    });

    const areaSelect = screen.getByLabelText('area');

    expect(areaSelect).toBeVisible();
  });

  it('should load areas from store', async () => {
    setupTest({
      label: 'area',
    });

    const areaSelect = screen.getByLabelText('area');
    const submitButton = screen.getByText('Submit');

    act(() => {
      userEvent.click(areaSelect);
    });

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(areas.length);

    act(() => {
      userEvent.click(options[0]);
    });

    await waitFor(() => {
      userEvent.click(submitButton);
      expect(mockSubmit).toBeCalledWith({
        area_id: areas[0].id,
      });
    });
  });

  it('should show loading indicator', () => {
    setupTest(
      {
        label: 'area',
      },
      buildAreaState({ loading: true }),
    );

    const loadingIndicator = screen.getByTestId('loading_indicator');

    expect(loadingIndicator).toBeVisible();
  });

  it('should use default option', async () => {
    setupTest({
      label: 'area',
      usingDefaultOption: true,
      defaultAreaId: String(DEFAULT_OPTION.value),
    });

    const areaSelect = screen.getByLabelText('area');
    const submitButton = screen.getByText('Submit');

    act(() => {
      userEvent.click(areaSelect);
    });

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(areas.length + 1);

    await waitFor(() => {
      userEvent.click(submitButton);
      expect(mockSubmit).toBeCalledWith({
        area_id: DEFAULT_OPTION.value,
      });
    });
  });
});
