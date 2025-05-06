import {
  asideType,
  basicType,
  collapsableType,
  dropdownType,
  NavigationType,
} from './navigation.type';

// EN
export const ADMIN_NAVIGATION_EN: NavigationType = {
  horizontal: [
    {
      id: 'dashboard',
      title: 'Dashboard HO',
      type: basicType,
      link: '/dashboard',
      icon: 'scratch-icon:activity',
    },
  ],
  vertical: [
    {
      id: 'students',
      title: 'Students VE',
      type: basicType,
      link: '/students',
      icon: 'scratch-icon:activity',
    },
  ],
};

export const PROFESSOR_NAVIGATION_EN: NavigationType = {
  horizontal: [
    {
      id: 'notes',
      title: 'Notes HO',
      type: basicType,
      link: '/dashboard',
      icon: 'scratch-icon:activity',
    },
    {
      id: 'primes',
      title: 'Primes et Salaires dropdown',
      type: dropdownType,
      icon: 'scratch-icon:activity',
      children: [
        {
          id: 'primes',
          title: 'Primes',
          type: basicType,
          link: '/primes',
          icon: 'scratch-icon:activity',
        },
        {
          id: 'primes',
          title: 'Salares',
          type: dropdownType,
          isExpanded: false,
          icon: 'scratch-icon:activity',
          children: [
            {
              id: 'encore',
              title: 'Encore',
              type: basicType,
              link: '/encore',
              icon: 'scratch-icon:activity',
            },
            {
              id: 'dd',
              title: 'ss',
              type: collapsableType,
              icon: 'scratch-icon:activity',
              children: [
                {
                  id: 'sub',
                  title: 'Sub',
                  type: basicType,
                  link: '/sub',
                  icon: 'scratch-icon:activity',
                },
              ],
            },
          ],
        },
        {
          id: 'dd',
          title: 'ff',
          type: dropdownType,
          icon: 'scratch-icon:activity',
          children: [
            {
              id: 'sub',
              title: 'Sub',
              type: basicType,
              link: '/sub',
              icon: 'scratch-icon:activity',
            },
            {
              id: 'primes',
              title: 'Salares',
              type: collapsableType,
              isExpanded: false,
              icon: 'scratch-icon:activity',
              children: [
                {
                  id: 'encore',
                  title: 'Encore',
                  type: basicType,
                  link: '/encore',
                  icon: 'scratch-icon:activity',
                },
                {
                  id: 'dd',
                  title: 'ss',
                  type: basicType,
                  link: '/sub',
                  icon: 'scratch-icon:activity',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  vertical: [
    {
      id: 'congés',
      title: 'Congés VE',
      type: collapsableType,
      isExpanded: false,
      icon: 'scratch-icon:activity',
      children: [
        {
          id: 'calendrier',
          title: 'congé 01 VE',
          type: asideType,
          icon: 'scratch-icon:activity',
          children: [
            {
              id: 'sous-calendrier',
              title: 'sous congé 01 VE',
              type: basicType,
              link: '/sous-congés',
              icon: 'scratch-icon:activity',
            },
          ],
        },
        {
          id: 'repos',
          title: 'Calendrier VE',
          type: basicType,
          link: '/congés/calendrier',
          icon: 'scratch-icon:activity',
        },
      ],
    },
    {
      id: 'settings',
      title: 'Settings VE',
      type: asideType,
      icon: 'scratch-icon:new',
      children: [
        {
          id: 'edt',
          title: 'Emploi du temps VE',
          type: collapsableType,
          isExpanded: false,
          icon: 'scratch-icon:new',
          children: [
            {
              id: 'edt-calendrier',
              title: 'Calendrier VE',
              type: basicType,
              link: '/congés/calendrier',
              icon: 'scratch-icon:new',
            },
            {
              id: 'calendrier4',
              title: 'cal 01 VE',
              type: collapsableType,
              icon: 'scratch-icon:new',
              children: [
                {
                  id: 'calendrier5',
                  title: 'sous congé 01 VE',
                  type: basicType,
                  link: '/sous-congés',
                  icon: 'scratch-icon:new',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const STUDENT_NAVIGATION_EN: NavigationType = {
  vertical: [
    {
      id: 'notes',
      title: 'Notes VE',
      type: basicType,
      link: '/notes',
      icon: 'scratch-icon:activity',
    },
  ],
};

export const CLUB_ADMIN_NAVIGATION_EN: NavigationType = {
  vertical: [
    {
      id: 'posts',
      title: 'Posts VE',
      type: basicType,
      link: '/posts',
      icon: 'scratch-icon:activity',
    },
  ],
};

export const VISITOR_NAVIGATION_EN: NavigationType = {
  horizontal: [
    {
      id: 'home',
      title: 'LOGO',
      type: basicType,
      link: '/home',
      icon: 'scratch-icon:activity',
    },
    {
      id: 'course',
      title: 'Course HO',
      type: basicType,
      link: '/course',
      icon: 'scratch-icon:activity',
    },
    {
      id: 'faq',
      title: 'FAQ HO',
      type: basicType,
      link: '/faq',
      icon: 'scratch-icon:activity',
    },
  ],
};
