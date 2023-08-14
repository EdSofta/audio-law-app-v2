export class User {
  id: number = 0;
  name: string = '';
  phone: string = '';
  email: string = '';
  profilePicture?: string;
  subscribed?: boolean;
  plan_id?: string;
  renewal_date?: string;
  subscription_status?: boolean;
}
