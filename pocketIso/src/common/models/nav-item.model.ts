export interface NavItem {
    name: string;
    url: string;
    role: string;
    auditName?: string;
    children?: NavItem[];
  }