export class DashboardModel {
  total: number;
  assigned: number;
  approved: number;
  rejected: number;
}

export class AssignedUsersCount {
  user_name: number;
  assigned_count: string;
  pending_count: number;
  closed_count: number;
  rejected_count: number;
  assignedCount: string;
  user_id: string;
  tot_count: number;
}

export class PosmBulkAssignModel {
  // program_id: number;
  itemRows: any;
}

export class TaskModel {
  id: number;
  task_id: number;
  task_date: string;
  status: number;
  user_id: number;
  success_points: number;
  task_question_id: number;
  subtask_question_id: number;
  time_slot_id: number;
  rewardsetting_id: number;
  internal_status: number;
  reason: number;
  created_date: string;
  completed_date: string;
  updated_date: string;
  agent_comments_date: string;
  answer_given: string;
  subtask_answer_given: number;
  agent_comments: string;
  lat: string;
  lng: string;
  img1: string;
  img2: string;
  user_details: UserDetailModel;
  assigned_details: CustomerAssignedModel;
  statusString: string;
  task_details: TaskDetailsModel;
  assigned_id: number;
  assigned_user_id: number;
  program_id = 1;
  template: any[]
}

export class UserDetailModel {
  id: number;
  user_id: number;
  geographical_id: number;
  geography_name: string;
  channel_type: string;
  channel_id: number;
  channel_name: string;
  sub_channel: string;
  state_code: number;
  state_name: string;
  state_year: string;
  ro_code: string;
  ro_name: string;
  ro_email: string;
  user_detail_name: string;
  subbranch_id: number;
  salestax_regno: number;
  class_code: number;
  group_id: number;
  license_no: number;
  outlet_img1: string;
  outlet_img2: string;
  profile_pic: string;
  address: string;
  lane: string;
  landmark: string;
  area: string;
  city: string;
  pincode: string;
  contact_no: string;
  business_from_time: string;
  business_to_time: string;
  cover_def: string;
  chiller_placed: string;
  signage_placed: string;
  stock_space: string;
  waiter_no: number;
  owner_name: string;
  owner_contact_no: string;
  manager_name: string;
  manager_contact_no: string;
  manager_email: string;
  location_id: string;
  status: number;
  created_date: string;
  updated_date: string;
  tse_user_id: string;
  document_no: string;
  document_file: string;
  gender: string;
  date_of_birth: string;
  emp_code: string;
  latitude: string;
  longitude: string;
  anniversary_date: string;
  region_id: string;
  user_role_id: number;
  isCooler: boolean;

}

export class CustomerAssignedModel {
  category_record_id: number;
  allocated_user_id: number;
  assigned_user_name: string;
  assigned_user_id: number;
  status: number;
  program_id: number;
  campaign_id: number;
  category_id: number;
  created_date: string;
  updated_date: string;
  id: number;
}

export class TaskDetailsModel {
  id: number;
  campaign_id: number;
  campaign_name: string;
  task_type: string;
  subtask_type: string;
  success_points: number;
  status: number;
  user_role_id: number;
  task_question_id: number;
  subtask_question_id: number;
  program_id: number;
  task_frequency: number;
  is_information: number;
  campaign_activities_config_id: number;
  campaign_activity: string;
  quiz_points_criteria: number;
  starttimeslot: string;
  endtimeslot: string;
  created_date: string;
  updated_date: string;
  has_subtask: boolean;
  description: string;
  instruction: string;
  title: string;
  subtitle: string;
  help: string;
  success_msg: string;
  failure_msg: string;
  timeslotdate: string;
  end_date: string;
  redirect_url: string;
  task_rules: string;
  realted_module: boolean;
  module_id: number;
  module_trans_id: number;
  title_hi: string;
  instruction_hi: string;
  title_ka: string;
  instruction_ka: string;
  template: any[]
}


