export const ACTIONS = [
  'read',
  'create',
  'write',
  'delete',
  'approve',
] as const;

export const TABLE_NAMES = [
  'absence',
  'account',
  'apartment',
  'area',
  'department',
  'device',
  'device_arrange',
  'event',
  'fee',
  'maintenance',
  'notification',
  'payslip',
  'receipt',
  'receipt_detail',
  'reflect_info',
  'repair_info',
  'role',
  'shift',
  'staff',
  'vehicle',
  'water_index',
] as const;

export const PRIVILEGES = {
  // Accounts
  readAccount: { label: 'View Account', value: 'READ_ACCOUNT' },
  createAccount: { label: 'Create Account', value: 'CREATE_ACCOUNT' },
  writeAccount: { label: 'Edit Account', value: 'WRITE_ACCOUNT' },

  //Absences
  readAbsence: { label: 'View Absence', value: 'READ_ABSENCE' },
  createAbsence: { label: 'Create Absence', value: 'CREATE_ABSENCE' },
  writeAbsence: { label: 'Edit Absence', value: 'WRITE_ABSENCE' },
  approveAbsence: { label: 'Approve Absence', value: 'APPROVE_ABSENCE' },

  //Apartments
  readApartment: { label: 'View Apartment', value: 'READ_APARTMENT' },
  createApartment: { label: 'Create Apartment', value: 'CREATE_APARTMENT' },
  writeApartment: { label: 'Edit Apartment', value: 'WRITE_APARTMENT' },

  //Devices
  readDevice: { label: 'Read Device', value: 'READ_DEVICE' },
  createDevice: { label: 'Create Device', value: 'CREATE_DEVICE' },
  writeDevice: { label: 'Edit Device', value: 'WRITE_DEVICE' },

  //Events
  readEvent: { label: 'Read Event', value: 'READ_EVENT' },
  createEvent: { label: 'Create Event', value: 'CREATE_EVENT' },
  writeEvent: { label: 'Edit Event', value: 'WRITE_EVENT' },
  approveEvent: { label: 'Approve/Cancel Event', value: 'APPROVE_EVENT' },

  //Notifications
  readNotification: { label: 'Read Notification', value: 'READ_NOTIFICATION' },
  createNotification: {
    label: 'Create Notification',
    value: 'CREATE_NOTIFICATION',
  },
  writeNotification: {
    label: 'Edit Notification',
    value: 'WRITE_NOTIFICATION',
  },
  approveNotification: {
    label: 'Publish Notification',
    value: 'APPROVE_NOTIFICATION',
  },

  //Payslips
  readPayslip: { label: 'Read Payslip', value: 'READ_PAYSLIP' },
  createPayslip: { label: 'Create Payslip', value: 'CREATE_PAYSLIP' },
  writePayslip: { label: 'Edit Payslip', value: 'WRITE_PAYSLIP' },

  //Receipts
  readReceipt: { label: 'Read Receipt', value: 'READ_RECEIPT' },
  createReceipt: { label: 'Create Receipt', value: 'CREATE_RECEIPT' },
  writeReceipt: { label: 'Edit Receipt', value: 'WRITE_RECEIPT' },
  deleteReceipt: { label: 'Delete Receipt', value: 'DELETE_RECEIPT' },
  approveReceipt: { label: 'Approve Receipt', value: 'APPROVE_RECEIPT' },

  //Reflects
  readReflect: { label: 'Read Reflect', value: 'READ_REFLECT_INFO' },
  createReflect: { label: 'Create Reflect', value: 'CREATE_REFLECT_INFO' },
  writeReflect: { label: 'Edit Reflect', value: 'WRITE_REFLECT_INFO' },
  approveReflect: { label: 'Answer Reflect', value: 'APPROVE_REFLECT_INFO' },

  //Repairs
  readRepair: { label: 'Read Repair', value: 'READ_REPAIR_INFO' },
  createRepair: { label: 'Create Repair', value: 'CREATE_REPAIR_INFO' },
  writeRepair: { label: 'Edit/Rate Repair', value: 'WRITE_REPAIR_INFO' },
  approveRepair: {
    label: 'Assignment/Complete Repair',
    value: 'APPROVE_REPAIR_INFO',
  },

  //Shifts
  readShift: { label: 'Read Shift', value: 'READ_SHIFT' },
  createShift: { label: 'Create Shift', value: 'CREATE_SHIFT' },
  writeShift: { label: 'Create Shift', value: 'WRITE_SHIFT' },

  //Staffs
  readStaff: { label: 'Read Staff', value: 'READ_STAFF' },
  createStaff: { label: 'Create Staff', value: 'CREATE_STAFF' },
  writeStaff: { label: 'Edit Staff', value: 'WRITE_STAFF' },

  //Vehicles
  readVehicle: {
    label: 'Read Vehicle',
    value: 'READ_VEHICLE_PARKING_REGISTRATION',
  },
  createVehicle: {
    label: 'Create Vehicle',
    value: 'CREATE_VEHICLE_PARKING_REGISTRATION',
  },
  writeVehicle: {
    label: 'Edit Vehicle',
    value: 'WRITE_VEHICLE_PARKING_REGISTRATION',
  },
  approveVehicle: {
    label: 'Approve/Cancel Vehicle',
    value: 'APPROVE_VEHICLE_PARKING_REGISTRATION',
  },

  //WaterIndexs
  readWaterIndex: { label: 'Read Water Index', value: 'READ_WATER_INDEX' },
  createWaterIndex: {
    label: 'Create Water Index',
    value: 'CREATE_WATER_INDEX',
  },
  writeWaterIndex: {
    label: 'Edit/Lock Water Index',
    value: 'WRITE_WATER_INDEX',
  },
  approveWaterIndex: {
    label: 'Lock Water Index',
    value: 'APPROVE_WATER_INDEX',
  },

  //Maintenances
  readMaintenance: { label: 'Read Maintenance', value: 'READ_MAINTENANCE' },
  createMaintenance: {
    label: 'Create Maintenance',
    value: 'CREATE_MAINTENANCE',
  },
  writeMaintenance: {
    label: 'Edit Maintenance',
    value: 'WRITE_MAINTENANCE',
  },

  //Arranges
  readDeviceArrange: {
    label: 'Read Device Arrange',
    value: 'READ_DEVICE_ARRANGE',
  },
  createDeviceArrange: {
    label: 'Create Device Arrange',
    value: 'CREATE_DEVICE_ARRANGE',
  },
  writeDeviceArrange: {
    label: 'Edit Device Arrange',
    value: 'WRITE_DEVICE_ARRANGE',
  },

  //Fees
  readFee: { label: 'Read Fee', value: 'READ_FEE' },
  createFee: { label: 'Create Fee', value: 'CREATE_FEE' },
  writeFee: { label: 'Edit Fee', value: 'WRITE_FEE' },
} as const;

export type PrivilegeLabelValue = ValueOf<typeof PRIVILEGES>;

export type Privilege = PrivilegeLabelValue['value'];
