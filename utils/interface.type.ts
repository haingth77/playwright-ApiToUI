export interface UserInfo {
  first_name: string;
  middle_name: string;
  last_name: string;
  employee_id: number;
  username: string;
  password: string;
}

export interface LeaveInfo {
  employee_name?: string;
  leave_type: string;
  from_date: string;
  to_date: string;
  leave_balance: number;
  comment: string;
}
