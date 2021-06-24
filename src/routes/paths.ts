import { createPaths } from 'utils/routes/paths';
import { PRIVILEGES } from 'constants/users';

export const appPaths = createPaths('app', {
  dashboard: {
    title: 'Giới thiệu',
  },
  absence: {
    title: 'Đơn nghỉ phép',
    privilege: PRIVILEGES.readAbsence.value,
    path: 'absences',
  },
  accountManagement: {
    title: 'Quản lý tài khoản',
    privilege: PRIVILEGES.readAccount.value,
    path: 'accounts',
  },
  apartment: {
    title: 'Căn hộ',
    privilege: PRIVILEGES.readApartment.value,
    path: 'apartments',
  },
  device: {
    title: 'Thiết bị',
    privilege: PRIVILEGES.readDevice.value,
    path: 'devices',
  },
  maintenance: {
    title: 'Bảo trì',
    privilege: PRIVILEGES.readMaintenance.value,
    path: 'maintenances',
  },
  arrange: {
    title: 'Bố trí',
    privilege: PRIVILEGES.readDeviceArrange.value,
    path: 'arranges',
  },
  event: {
    title: 'Sự kiện',
    privilege: PRIVILEGES.readEvent.value,
    path: 'events',
  },
  notification: {
    title: 'Thông báo',
    privilege: PRIVILEGES.readNotification.value,
    path: 'notifications',
  },
  payslip: {
    title: 'Phiếu chi',
    privilege: PRIVILEGES.readPayslip.value,
    path: 'payslips',
  },
  receipt: {
    title: 'Phiếu thu',
    privilege: PRIVILEGES.readReceipt.value,
    path: 'receipts',
  },
  reflect: {
    title: 'Phản ánh',
    privilege: PRIVILEGES.readReflect.value,
    path: 'reflects',
  },
  repair: {
    title: 'Yêu cầu sửa chữa',
    privilege: PRIVILEGES.readRepair.value,
    path: 'repairs',
  },
  shift: {
    title: 'Ca trực',
    privilege: PRIVILEGES.readShift.value,
    path: 'shifts',
  },
  staff: {
    title: 'Nhân viên',
    privilege: PRIVILEGES.readStaff.value,
    path: 'staffs',
  },
  vehicle: {
    title: 'Thông tin gửi xe',
    privilege: PRIVILEGES.readVehicle.value,
    path: 'vehicles',
  },
  waterIndex: {
    title: 'Chỉ số nước',
    privilege: PRIVILEGES.readWaterIndex.value,
    path: 'water-indexes',
  },
  fee: {
    title: 'Các khoản phí',
    privilege: PRIVILEGES.readFee.value,
    path: 'fees',
  },
});

export const authPaths = createPaths('auth', {
  login: {
    title: 'Login',
    path: (redirectTo?: string) =>
      redirectTo ? `login?redirect=${redirectTo}` : `login`,
  },
});
