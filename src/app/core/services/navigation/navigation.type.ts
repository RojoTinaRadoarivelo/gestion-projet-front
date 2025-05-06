export interface NavigationType {
  horizontal?: Navigation[];
  vertical?: Navigation[];
}

export interface Navigation {
  id: string;
  title: string;
  subtitle?: string;
  link?: string;
  type: NavigationLinkType;
  icon?: string;
  children?: Navigation[];
  disabled?: boolean;
  externalLink?: boolean;
  openNewTab?: boolean;
  hidden?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  isExpanded?: boolean;
}

enum NavigationLinkType {
  basic,
  aside,
  collapsable,
  dropdown,
}

const linkType = {
  basic: NavigationLinkType.basic,
  aside: NavigationLinkType.aside,
  collapsable: NavigationLinkType.collapsable,
  dropdown: NavigationLinkType.dropdown,
};

export const asideType = linkType.aside;
export const basicType = linkType.basic;
export const collapsableType = linkType.collapsable;
export const dropdownType = linkType.dropdown;

export interface LangDefinition {
  id: string;
  label: string;
}
export declare type AvailableLangs = LangDefinition[];
