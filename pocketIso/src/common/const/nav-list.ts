import { NavItem } from "../models/nav-item.model";

export const NAV_DATA: NavItem[] = [
  {
    name: 'PANEL ADMINISTRATORA',
    url: '',
    role: 'admin',
    children: [
      {
        name: 'LISTA FIRM',
        url: 'companies-list',
        role: 'su'
      },
      {
        name: 'DODAJ FIRMĘ',
        url: 'add-company/',
        role: 'su'
      },
      {
        name: 'LISTA UŻYTKOWNIKÓW',
        url: 'users/',
        role: 'admin'
      },
      {
        name: 'KONTEKST ORGANIZACJI',
        url: 'organizational-context/',
        role: 'admin'
      },
      {
        name: 'DODAJ POLITYKE JAKOŚCI',
        url: 'add-quality-policy',
        role: 'admin'
      },
      {
        name: 'LISTA POLITYK JAKOŚCI',
        url: 'quality-policies',
        role: 'admin'
      },
      {
        name: 'WYBIERZ POLITYKI JAKOŚCI',
        url: 'choose-quality-policy',
        role: 'admin'
      },
      {
        name: 'DODAJ PRZEPIS PRAWNY',
        url: 'add-regulation',
        role: 'admin'
      },
      {
        name: 'PRZEPISY PRAWNE',
        url: 'regulations',
        role: 'admin'
      },
      {
        name: 'DODAJ SCHEMAT ORGANIZACJI',
        url: 'list-of-persons-organization-chart',
        role: 'admin'
      },
      {
        name: 'SCHEMAT ORGANIZACJI',
        url: 'organization-chart',
        role: 'admin'
      },
      {
        name: 'DODAJ PODSTAWOWY PROCES',
        url: 'add-base-process',
        role: 'su'
      },
      {
        name: 'LISTA PODSTAWOWYCH PROCESÓW',
        url: 'base-processes',
        role: 'su'
      },
      {
        name: 'DODAJ PROCES',
        url: 'add-process',
        role: 'admin'
      },
      {
        name: 'LISTA PROCESÓW',
        url: 'processes',
        role: 'admin'
      },
      {
        name: 'DODAJ SZKOLENIE',
        url: 'add-training',
        role: 'admin'
      },
      {
        name: 'LISTA SZKOLEŃ',
        url: 'trainings',
        role: 'admin'
      },
      {
        name: 'PRACOWNICY - SZKOLENIA',
        url: 'employees',
        role: 'admin'
      },
      {
        name: 'SZKOLENIA - TABELA',
        url: 'display-employee-trainings',
        role: 'admin'
      },
      {
        name: 'PROCEDURY SYSTEMOWE',
        url: 'sub-processes/1',
        role: 'admin'
      },
      {
        name: 'INSTRUKCJE SYSTEMOWE',
        url: 'sub-processes/2',
        role: 'admin'
      },
      {
        name: 'REJESTR URZĄDZEŃ',
        url: 'devices',
        role: 'admin'
      },
      {
        name: 'REKLAMACJE',
        url: 'complaints',
        role: 'admin'
      }
    ]
  },
  {
    name: 'KONTEKST ORGANIZACJI',
    url: 'view-organizational-context/',
    role: 'user'
  },
  {
    name: 'POLITYKA JAKOŚCI',
    url: 'display-quality-policies/',
    role: 'user'
  },
  {
    name: 'PRZEPISY PRAWNE',
    url: 'regulations',
    role: 'user'
  },
  {
    name: 'SCHEMAT ORGANIZACJI',
    url: 'display-organization-chart',
    role: 'user'
  },
  {
    name: 'PROCESY W FIRMIE',
    url: 'processes-to-display',
    role: 'user'
  },
  {
    name: 'SZKOLENIA - TABELA',
    url: 'display-employee-trainings',
    role: 'user'
  },
  {
    name: 'PROCEDURY SYSTEMOWE',
    url: 'sub-processes/1',
    role: 'user'
  },
  {
    name: 'INSTRUKCJE SYSTEMOWE',
    url: 'sub-processes/2',
    role: 'user'
  },
  {
    name: 'REKLAMACJE',
    url: 'complaints',
    role: 'user'
  }
];