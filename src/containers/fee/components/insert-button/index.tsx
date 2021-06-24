import React from 'react';
import Button from '@material-ui/core/Button';

import FeeForm from 'containers/fee/components/fee-form';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import useDidUpdate from 'hooks/useDidUpdate';
import useToggle from 'hooks/useToggle';
import feeService from 'services/fee';
import { FeeFormValues } from 'types/fee';
import { SubmitHandler } from 'react-hook-form';
import Spin from 'ui/spin';

const initialValues: FeeFormValues = {
  name: '',
  unit: '',
  amount: 0,
};

interface InsertButtonProps {
  onRefresh: VoidFunction;
}

const InsertButton: React.FC<InsertButtonProps> = ({ onRefresh }) => {
  const [open, toggle] = useToggle();
  const [{ loading, success }, createFee] = useBackendServiceCallback(
    feeService.create,
  );

  const handleCreateFee: SubmitHandler<FeeFormValues> = (values) => {
    createFee(values);
  };

  useDidUpdate(() => {
    if (success) {
      setTimeout(onRefresh, 1000);
      setTimeout(toggle, 500);
    }
  }, [success]);

  return (
    <Spin loading={loading}>
      <Button variant="outlined" color="primary" onClick={toggle}>
        Thêm mới
      </Button>
      <FeeForm
        key={'insert-fee'}
        title="Thêm mới khoản phí"
        open={open}
        loading={loading}
        initialValues={initialValues}
        onClose={toggle}
        onSubmit={handleCreateFee}
      />
    </Spin>
  );
};

export default InsertButton;
