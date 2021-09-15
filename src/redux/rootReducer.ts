import { combineReducers } from 'redux';
import absenceReducer from './absence/reducer';
import accountReducer from './account/reducer';
import apartmentReducer from './apartment/reducer';
import areaReducer from './area/reducer';
import arrangeReducer from './arrange/reducer';
import departmentReducer from './department/reducer';
import deviceReducer from './device/reducer';
import eventReducer from './event/reducer';
import feeReducer from './fee/reducer';
import maintenanceReducer from './maintenance/reducer';
import notificationReducer from './notification/reducer';
import payslipReducer from './payslip/reducer';
import positionReducer from './position/reducer';
import receiptDetailReducer from './receipt-detail/reducer';
import receiptReducer from './receipt/reducer';
import reflectReducer from './reflect/reducer';
import repairReducer from './repair/reducer';
import roleReducer from './role/reducer';
import shiftReducer from './shift/reducer';
import shiftStaffReducer from './shift-staff/reducer';
import staffReducer from './staff/reducer';
import techniqueStaffReducer from './technique-staff/reducer';
import vehicleReducer from './vehicle/reducer';
import waterIndexReducer from './water-index/reducer';

const rootReducer = combineReducers({
  absence: absenceReducer,
  account: accountReducer,
  apartment: apartmentReducer,
  department: departmentReducer,
  device: deviceReducer,
  event: eventReducer,
  payslip: payslipReducer,
  position: positionReducer,
  reflect: reflectReducer,
  repair: repairReducer,
  staff: staffReducer,
  vehicle: vehicleReducer,
  notification: notificationReducer,
  waterIndex: waterIndexReducer,
  receipt: receiptReducer,
  receiptDetail: receiptDetailReducer,
  shift: shiftReducer,
  area: areaReducer,
  shiftStaff: shiftStaffReducer,
  techniqueStaff: techniqueStaffReducer,
  role: roleReducer,
  maintenance: maintenanceReducer,
  arrange: arrangeReducer,
  fee: feeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
// TODO
// export const buildRootState<RootState> = (overrides={})=>({
// area:buildAreaState()
// })
