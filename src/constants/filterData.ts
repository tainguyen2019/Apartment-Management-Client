import { FilterInput } from 'types/filterInput';

const pageSize: FilterInput = {
  label: 'Số dòng / trang',
  name: 'pageSize',
  options: ['10', '20', '30'],
};

const department: FilterInput = {
  label: 'Phòng ban',
  name: 'department',
  options: [
    'Tất cả',
    'Điều hành ban quản lý',
    'Phòng kỹ thuật',
    'Bộ phận kế toán',
    'Bộ phận an ninh',
    'Bộ phận vệ sinh',
    'Bộ phận lễ tân',
    'Bộ phận cảnh quan',
    'Ban quản trị',
  ],
};

export const vehicleFilter: FilterInput[] = [
  {
    label: 'Trạng thái',
    name: 'status',
    options: ['Tất cả', 'Đang gửi', 'Chờ xử lý', 'Đã hủy'],
  },
  {
    label: 'Loại xe',
    name: 'type',
    options: ['Tất cả', 'Xe máy', 'Ô tô'],
  },
  pageSize,
];

export const staffFilter: FilterInput[] = [
  {
    label: 'Trạng thái',
    name: 'status',
    options: ['Tất cả', 'Đang làm việc', 'Đã nghỉ'],
  },
  department,
  pageSize,
];

export const absenceFilter: FilterInput[] = [
  {
    label: 'Trạng thái',
    name: 'status',
    options: ['Tất cả', 'Chờ xử lý', 'Đã phê duyệt'],
  },
  department,
  pageSize,
];

export const eventFilter: FilterInput[] = [
  {
    label: 'Trạng thái',
    name: 'status',
    options: ['Tất cả', 'Chờ xử lý', 'Đã phê duyệt', 'Đã hủy'],
  },
  pageSize,
];

export const repairFilter: FilterInput[] = [
  {
    label: 'Trạng thái',
    name: 'status',
    options: ['Tất cả', 'Chờ xử lý', 'Đã xử lý', 'Đã hủy'],
  },
  pageSize,
];

export const reflectFilter: FilterInput[] = [
  {
    label: 'Trạng thái',
    name: 'status',
    options: ['Tất cả', 'Chờ xử lý', 'Đã xử lý', 'Đã hủy'],
  },
  pageSize,
];

export const payslipFilter: FilterInput[] = [pageSize];

export const apartmentFilter: FilterInput[] = [
  {
    label: 'Loại',
    name: 'type',
    options: ['Tất cả', 'ShopHouse', 'Nhà ở thường'],
  },
  pageSize,
];

export const notificationFilter: FilterInput[] = [pageSize];
