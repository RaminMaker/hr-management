export interface Employee {
  id: string;
  name: string;
  departmentId: string;
  gender: 'male' | 'female';
  mobile?: string;
  education: 'diploma' | 'bachelor' | 'master' | 'phd';
}