export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  isAward: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Nominee {
  id: string;
  categoryId: string;
  name: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vote {
  id: string;
  categoryId: string;
  nomineeId: string;
  voterId: string;
  createdAt: string;
}

export interface CategoryWithNominees extends Category {
  nominees: Nominee[];
  is_award: boolean; // Add compatibility field
}

// Default categories data
export const defaultCategories: Category[] = [
  {
    id: 'mama-mekha',
    title: 'Mama Mekha Award',
    icon: '🥇',
    description: 'Lifetime Service Recognition - Special Award',
    isAward: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'best-camp-director',
    title: 'Best Camp Director',
    icon: '🎯',
    description: 'Outstanding leadership and vision in camp direction',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'top-venue',
    title: 'Top Host Venue',
    icon: '🏛️',
    description: 'Most welcoming venue with strong logistical support',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'volunteer-intake',
    title: 'Volunteer Intake of the Decade',
    icon: '🤝',
    description: 'Group that left a lasting mark through service and spirit',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-decade',
    title: 'Mentor of the Decade',
    icon: '👨‍🏫',
    description: 'Known for creating winning teams and impacting students',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'afternoon-class',
    title: 'Best Afternoon Class',
    icon: '🎨',
    description: 'The most engaging and enjoyable experience for campers',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partners-spotlight',
    title: 'The Partner\'s Spotlight',
    icon: '🤝',
    description: 'Organization that provided exceptional support and partnership',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-decade',
    title: 'Dreamer of the Decade',
    icon: '💭',
    description: 'When you think of camp, who comes to mind?',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-dreamers',
    title: 'Face of the Dreamers',
    icon: '👑',
    description: 'The person who best represents the spirit of Dreamers Academy',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-maker',
    title: 'Hype Maker of the Decade',
    icon: '🎉',
    description: 'The person who brought the most energy and excitement to camp',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-decade',
    title: 'Alumni of the Decade',
    icon: '🎓',
    description: 'Alumni who consistently returned to support and mentor',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dream-creator',
    title: 'Dream Creator of the Decade',
    icon: '✨',
    description: 'The visionary who helped shape and create the dream',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'execution-excellence',
    title: 'Execution Excellence Award',
    icon: '⚡',
    description: 'Outstanding Project Implementation and Leadership',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Default nominees data with all the provided nominees
export const defaultNominees: Nominee[] = [
  // Best Camp Director
  {
    id: 'director-1',
    categoryId: 'best-camp-director',
    name: 'Ornella TUZA',
    photo: 'data:image/jpeg;base64,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APB9B/pBBBBBBD/+++++qE888888989DDV98DLDX/n//AMwww/8A/wD9B/8AQQQQQQQQQQQQ/wD77776pTzzzzzzzzkMP3m3OW1+9/8A/DDDDX//AP8A/wB/BBBBBBBBBBBD/wDvvvvqggvPPPPKPKffeK9V/wB7y60MMMMMMP8A/wD/AP8A/wDwQQQQQQQQQQ1/vvPvvvqvPPPPKPPfPLROv36lcUySwwww/wD/AP8A/wD/AP8AfQQQQQQQQQQ//vvPvvvvggPPPPTvfeOfW3ifR+HeYSwww4//AP8A/wD/AP8A/wDQQQQQfQQQ/wD/AP8AvvvvvvqvPPafvfdLtZ+Ddwg2/fPfQw1//wD/AP3/AP8A/wD/AAQQQQQQQ/8A777777776qoL0EH30Uxyhp9sja/WzXykMPPPMNf/AP8A/wD8038EEH0Nf777777777L744L7XxE+BHt55b+nnH30MMMMMMP8P/8A/wD/AP8A/BBBBDX+++++++++C+++++++Z5GWtehvuRR789LDDDDDDD//AP8A/wD/AP8A8EEEEP8A+++++++++CC+++++4y+k2usyMP8AMPv/AGkMMMMMMP8A/wD/AP8A/wD/AMEEEEP/AO++++++++C++++++52itcONT/tsfjx998DDDDDD/wD/AP8A/wD/AOkEEEEP/wC++++++++OW+++++y6M/4W0sV+WjDt999NDDDDD/8A/wD/AP8A/wCkEEEEP/7777777777777774LDVWT7DRd1Ddjo33320MMMP/8A/wD/AP8A/wDwQQQfl/vvvvvvvvvvvvvvvvvujudO33W7ff7QffffQwww1/8A/wD9p/8Azf8A8ENf777777777777777775QrXZKtnJvf333333wMMMMP+v8A/t//AP8A/wDBDW++++++++++++++++++XKtP+FHqno9B99999LDDDD//AA//AP8A/wD/AMEEJb7777//AO++++++++++6loozA5m0mBNBB9999rDDDDzDDD/AA1//wD/APDW/wD/AL7/AP8AvvvvvvvvvvuMYsmKPxY3PQQQffffawwwwwwwwww1/wD/AP8Ax1/vvv8A/wD/APvvvvvvvsjefe+FufJXmDPcefQffbQwwwwwwwwww88/+xFvvv8A/wD/AP8A/wC//wDvujtjb/4UbenXXiDPvlQQQdffSwwwwwwwwwww1/6dvvvsggv/AP8A/wDvqjrrswXXcmnFc7Ob1flQRXcfffQwwwwwwwwwww9/Qgvgwwgggw8strPJVGyzsk6XSmsPkXnacPaQfcffAwwwwwwwwww0/aAgwwwwwwwjqnpFpnGubDXU8/nsXbST+58CgQQVfbQwwwwww/Qww/QfF+9g8stv6o9lnFstveTx1/1BsTcaZ701R8gffffffQwzTTfQww1faQAAAAAA/jw63sL+CJXfZcZQXed5eWd4z9dSvQQfffTfffffQww1ffQAAFfTQ4Pa6lOVImvPtfbVc5M65xWfZ915/wAQwH33333333330MH32n33332twH9ZSvqdqDr9X33X1VV+3WW2PnG1cj00EH3333330MMH33333333vkH1fQW32eXqlXl31sX21nH1XUXnHUBz0EEFHX3330MMEHX3333323wnVfSmnl1BS7nn3W3ul18VXW30cu00rH3330H333300EEEEH3332nylV9rhnnFb/Jn1n1mPHNUXk233e392sv3330H0EH332sEEEEEEFGHqkGWbG+1EQ0f20nH2ttejv211Kww/cWoMP300H33332sEEEEEEEG24hX0/b3Vnvpf731GOm5y6vPX1zo43yNsMP33330V3EH8MEEEEEEEFalW9Mpnv3srwLuHW31VN0sudqpHD/P9EwvHHUMV330H+sMMEEEOv8AvpB1X+OvVdytdlt5N5j9LnHXq0rZ9HtlfWPDDDd9nDN//wD/AM8P9f8A/wCdgfW6jFT+f3dZnzZ5yX+Z/f3n9U7sZLdDvvv6fQ1w/Qf/AP8A/P8A/wD/APrV9Vr2QoyXsZDYd9X7nz95rB+79/k04NoI2+/D9hB99AW//wD/AOvf/wD/AAffb1IKHu6GBh7u906/fw718l9Z82rp9v8AD6oMPMX08wEHIDb6vf8A/wD3qfWyuL634J7zHQ2/dslZcYN357QurLDdf/jwwwww/KQMAMMQIP8A/wD5f9ruB9Pr+AOVG9phaYhl1028S/A5b8UrT+rDDD9D88M8AAoA+CD/AMyva1lGSf8AsItrhU1waznVS3+xlxF3Qlxx/b7/APD1B+8888UoA+w+/pJDDWo4Z/8A92QpnvWLBVb30fdfA2mROP6f9rvvvvw/vvPKPKAAAAFv3ZQ1ivJd+011VezTdWsRWfTcckaOJiUe9X/vvvv/AP77zCQAAD7757/l0sK71V+z/wBbznw2l9Ztdrlx754rdl5nPW++++//APKADPtvvvvvv/8A+LcP7XXf3xv17/7YsQiBHVvg0w/PP1F+Xb7777/7yC4765b777/7/wD5SuW+Z1v870IRa9gW+UsxR8bHNnzdF1d/++++++q+++++++++Dz3/AM7k2ptTZ6PLoCAKBPsnIbT/AN33k/f+vE1z777774D777774IMMEP8A/Ddb5evtrcoy6e4K+m49/wD+cW37zeUS/wCX777777777oIMIIMMEEEHMWvdlqpUfgjzzzzDzyqTw800POPc9m/77777oL7776oIAD0AIAAAEP0NK+6pn/w7iAR/0f8ARkw5r3Hr79u+/wDvvvgEMAvvvggPPfaAAAAgl+gvnsjvtu2ZPMN2quMxzzN7WT3v/vvvsgAhPPAgPglPPPKAAAAQvlQi/wD/AOPOO++62N9w8/Pzln7y++++y++yc8SU88EI6C88998oCAAC+C6Cy+7/AOwZXfcW448V969MDKPvvvvpgDPPEMPPPPP/xAAC/9oADAMBAAIAAwAAABD/APBBBB99HjDBDDDABBqA5AA8ACoAAAA8A88AZ19999D/AAsSgwwwww/wwQQffaewwwAwwAgQAgkAFQCgqAGAADAgvADffw7Xwwgwwwwwwww/wwQQffaawwwwwwwwkAgqBBPufIsoAAAAgvKEffff/QwwwwwwwwwwvwwQQffaQQQwwww1wwPPId0kFvg2GNvAgggvAPfffffQgwwwwwwww/6QQQ/fffaQwwww1glPbYIs4LwZwDLsggglAAAPfQABjgwwwgwwww/wQQQ/ffffQfwwwwjQAtVFgODF8lYTRigAgnAAAAAADffwwwww9ww/wwQfffffffaQwwlvQAr43qRMCP6DxDvPAAqAAAACAMeQPQwwwwww/wAMEEEH33332mkELjIACmeZlfG9MNk91j2gLAwwzygAAAD08/EMMP8A/rBBB999999x99NB9IDx8/77BMo1B3o0ACCCCUCCA8AJAVBBVDDDD/rBBB999999B9999999lD/soEYQlMFVz8KCACCCC8AA99AAA9DDDD/BBB9999999BB99999/KikAIpS0yXMpECoCCCCCCAAAAAAA9DDDD/AAQQQffQfffQfffff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',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-2',
    categoryId: 'best-camp-director',
    name: 'Angelo Urukundo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-3',
    categoryId: 'best-camp-director',
    name: 'Wesley',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-4',
    categoryId: 'best-camp-director',
    name: 'Amanda',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-5',
    categoryId: 'best-camp-director',
    name: 'Nelson',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-6',
    categoryId: 'best-camp-director',
    name: 'Bangaly',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-7',
    categoryId: 'best-camp-director',
    name: 'Bruce Jesh',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Top Host Venue
  {
    id: 'venue-1',
    categoryId: 'top-venue',
    name: 'New Life High School',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'venue-2',
    categoryId: 'top-venue',
    name: 'Hope Haven',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'venue-3',
    categoryId: 'top-venue',
    name: 'Saint Vincent Muhoza',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'venue-4',
    categoryId: 'top-venue',
    name: 'Gashora Girls Academy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Volunteer Intake of the Decade
  {
    id: 'vol-1',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'2024-25',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vol-2',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'2023-24',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vol-3',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'2022-23',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vol-4',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'2021-22',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Mentor of the Decade
  {
    id: 'mentor-1',
    categoryId: 'mentor-decade',
    name: 'Karema Teta Shamira',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-2',
    categoryId: 'mentor-decade',
    name: 'Emma Victor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-3',
    categoryId: 'mentor-decade',
    name: 'Keza Kestia',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-4',
    categoryId: 'mentor-decade',
    name: 'Lucas Shema',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-5',
    categoryId: 'mentor-decade',
    name: 'Queen Kabandana',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-6',
    categoryId: 'mentor-decade',
    name: 'Joana Byumvohore',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-7',
    categoryId: 'mentor-decade',
    name: 'Ally hamis Rwemera',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Best Afternoon Class
  {
    id: 'class-1',
    categoryId: 'afternoon-class',
    name: 'Dance Class',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-2',
    categoryId: 'afternoon-class',
    name: 'Creative writing',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-3',
    categoryId: 'afternoon-class',
    name: 'Multimedia',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-4',
    categoryId: 'afternoon-class',
    name: 'Art class',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-5',
    categoryId: 'afternoon-class',
    name: 'Leadership Nexus',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // The Partner's Spotlight
  {
    id: 'partner-1',
    categoryId: 'partners-spotlight',
    name: 'BK Foundation',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-2',
    categoryId: 'partners-spotlight',
    name: 'Mastercard Foundation',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-3',
    categoryId: 'partners-spotlight',
    name: 'JMU',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-4',
    categoryId: 'partners-spotlight',
    name: 'ALX',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-5',
    categoryId: 'partners-spotlight',
    name: 'Vanderbilt',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-6',
    categoryId: 'partners-spotlight',
    name: 'Weber state university',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-7',
    categoryId: 'partners-spotlight',
    name: 'Never Again',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Dreamer of the Decade
  {
    id: 'dreamer-1',
    categoryId: 'dreamer-decade',
    name: 'KALISA Danny',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-2',
    categoryId: 'dreamer-decade',
    name: 'Rukundo Bonfils',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-3',
    categoryId: 'dreamer-decade',
    name: 'Abi benie',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-4',
    categoryId: 'dreamer-decade',
    name: 'Eva',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-5',
    categoryId: 'dreamer-decade',
    name: 'Christelle Maiga',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-6',
    categoryId: 'dreamer-decade',
    name: 'Ndahiro Clever',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-7',
    categoryId: 'dreamer-decade',
    name: 'King Kitoko',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-8',
    categoryId: 'dreamer-decade',
    name: 'Karenzi Boris',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-9',
    categoryId: 'dreamer-decade',
    name: 'Christian Bahire',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-10',
    categoryId: 'dreamer-decade',
    name: 'Ornella Ikirezi Tuza',
    photo: 'data:image/jpeg;base64,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APB9B/pBBBBBBD/+++++qE888888989DDV98DLDX/n//AMwww/8A/wD9B/8AQQQQQQQQQQQQ/wD77776pTzzzzzzzzkMP3m3OW1+9/8A/DDDDX//AP8A/wB/BBBBBBBBBBBD/wDvvvvqggvPPPPKPKffeK9V/wB7y60MMMMMMP8A/wD/AP8A/wDwQQQQQQQQQQ1/vvPvvvqvPPPPKPPfPLROv36lcUySwwww/wD/AP8A/wD/AP8AfQQQQQQQQQQ//vvPvvvvggPPPPTvfeOfW3ifR+HeYSwww4//AP8A/wD/AP8A/wDQQQQQfQQQ/wD/AP8AvvvvvvqvPPafvfdLtZ+Ddwg2/fPfQw1//wD/AP3/AP8A/wD/AAQQQQQQQ/8A777777776qoL0EH30Uxyhp9sja/WzXykMPPPMNf/AP8A/wD8038EEH0Nf777777777L744L7XxE+BHt55b+nnH30MMMMMMP8P/8A/wD/AP8A/BBBBDX+++++++++C+++++++Z5GWtehvuRR789LDDDDDDD//AP8A/wD/AP8A8EEEEP8A+++++++++CC+++++4y+k2usyMP8AMPv/AGkMMMMMMP8A/wD/AP8A/wD/AMEEEEP/AO++++++++C++++++52itcONT/tsfjx998DDDDDD/wD/AP8A/wD/AOkEEEEP/wC++++++++OW+++++y6M/4W0sV+WjDt999NDDDDD/8A/wD/AP8A/wCkEEEEP/7777777777777774LDVWT7DRd1Ddjo33320MMMP/8A/wD/AP8A/wDwQQQfl/vvvvvvvvvvvvvvvvvujudO33W7ff7QffffQwww1/8A/wD9p/8Azf8A8ENf777777777777777775QrXZKtnJvf333333wMMMMP+v8A/t//AP8A/wDBDW++++++++++++++++++XKtP+FHqno9B99999LDDDD//AA//AP8A/wD/AMEEJb7777//AO++++++++++6loozA5m0mBNBB9999rDDDDzDDD/AA1//wD/APDW/wD/AL7/AP8AvvvvvvvvvvuMYsmKPxY3PQQQffffawwwwwwwwww1/wD/AP8Ax1/vvv8A/wD/APvvvvvvvsjefe+FufJXmDPcefQffbQwwwwwwwwww88/+xFvvv8A/wD/AP8A/wC//wDvujtjb/4UbenXXiDPvlQQQdffSwwwwwwwwwww1/6dvvvsggv/AP8A/wDvqjrrswXXcmnFc7Ob1flQRXcfffQwwwwwwwwwww9/Qgvgwwgggw8strPJVGyzsk6XSmsPkXnacPaQfcffAwwwwwwwwww0/aAgwwwwwwwjqnpFpnGubDXU8/nsXbST+58CgQQVfbQwwwwww/Qww/QfF+9g8stv6o9lnFstveTx1/1BsTcaZ701R8gffffffQwzTTfQww1faQAAAAAA/jw63sL+CJXfZcZQXed5eWd4z9dSvQQfffTfffffQww1ffQAAFfTQ4Pa6lOVImvPtfbVc5M65xWfZ915/wAQwH33333333330MH32n33332twH9ZSvqdqDr9X33X1VV+3WW2PnG1cj00EH3333330MMH33333333vkH1fQW32eXqlXl31sX21nH1XUXnHUBz0EEFHX3330MMEHX3333323wnVfSmnl1BS7nn3W3ul18VXW30cu00rH3330H333300EEEEH3332nylV9rhnnFb/Jn1n1mPHNUXk233e392sv3330H0EH332sEEEEEEFGHqkGWbG+1EQ0f20nH2ttejv211Kww/cWoMP300H33332sEEEEEEEG24hX0/b3Vnvpf731GOm5y6vPX1zo43yNsMP33330V3EH8MEEEEEEEFalW9Mpnv3srwLuHW31VN0sudqpHD/P9EwvHHUMV330H+sMMEEEOv8AvpB1X+OvVdytdlt5N5j9LnHXq0rZ9HtlfWPDDDd9nDN//wD/AM8P9f8A/wCdgfW6jFT+f3dZnzZ5yX+Z/f3n9U7sZLdDvvv6fQ1w/Qf/AP8A/P8A/wD/APrV9Vr2QoyXsZDYd9X7nz95rB+79/k04NoI2+/D9hB99AW//wD/AOvf/wD/AAffb1IKHu6GBh7u906/fw718l9Z82rp9v8AD6oMPMX08wEHIDb6vf8A/wD3qfWyuL634J7zHQ2/dslZcYN357QurLDdf/jwwwww/KQMAMMQIP8A/wD5f9ruB9Pr+AOVG9phaYhl1028S/A5b8UrT+rDDD9D88M8AAoA+CD/AMyva1lGSf8AsItrhU1waznVS3+xlxF3Qlxx/b7/APD1B+8888UoA+w+/pJDDWo4Z/8A92QpnvWLBVb30fdfA2mROP6f9rvvvvw/vvPKPKAAAAFv3ZQ1ivJd+011VezTdWsRWfTcckaOJiUe9X/vvvv/AP77zCQAAD7757/l0sK71V+z/wBbznw2l9Ztdrlx754rdl5nPW++++//APKADPtvvvvvv/8A+LcP7XXf3xv17/7YsQiBHVvg0w/PP1F+Xb7777/7yC4765b777/7/wD5SuW+Z1v870IRa9gW+UsxR8bHNnzdF1d/++++++q+++++++++Dz3/AM7k2ptTZ6PLoCAKBPsnIbT/AN33k/f+vE1z777774D777774IMMEP8A/Ddb5evtrcoy6e4K+m49/wD+cW37zeUS/wCX777777777oIMIIMMEEEHMWvdlqpUfgjzzzzDzyqTw800POPc9m/77777oL7776oIAD0AIAAAEP0NK+6pn/w7iAR/0f8ARkw5r3Hr79u+/wDvvvgEMAvvvggPPfaAAAAgl+gvnsjvtu2ZPMN2quMxzzN7WT3v/vvvsgAhPPAgPglPPPKAAAAQvlQi/wD/AOPOO++62N9w8/Pzln7y++++y++yc8SU88EI6C88998oCAAC+C6Cy+7/AOwZXfcW448V969MDKPvvvvpgDPPEMPPPPP/xAAC/9oADAMBAAIAAwAAABD/APBBBB99HjDBDDDABBqA5AA8ACoAAAA8A88AZ19999D/AAsSgwwwww/wwQQffaewwwAwwAgQAgkAFQCgqAGAADAgvADffw7Xwwgwwwwwwww/wwQQffaawwwwwwwwkAgqBBPufIsoAAAAgvKEffff/QwwwwwwwwwwvwwQQffaQQQwwww1wwPPId0kFvg2GNvAgggvAPfffffQgwwwwwwww/6QQQ/fffaQwwww1glPbYIs4LwZwDLsggglAAAPfQABjgwwwgwwww/wQQQ/ffffQfwwwwjQAtVFgODF8lYTRigAgnAAAAAADffwwwww9ww/wwQfffffffaQwwlvQAr43qRMCP6DxDvPAAqAAAACAMeQPQwwwwww/wAMEEEH33332mkELjIACmeZlfG9MNk91j2gLAwwzygAAAD08/EMMP8A/rBBB999999x99NB9IDx8/77BMo1B3o0ACCCCUCCA8AJAVBBVDDDD/rBBB999999B9999999lD/soEYQlMFVz8KCACCCC8AA99AAA9DDDD/BBB9999999BB99999/KikAIpS0yXMpECoCCCCCCAAAAAAA9DDDD/AAQQQffQfffQfffff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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-11',
    categoryId: 'dreamer-decade',
    name: 'Sonia NYANTABA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Face of the Dreamers
  {
    id: 'face-1',
    categoryId: 'face-dreamers',
    name: 'Kalisa Deborah',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-2',
    categoryId: 'face-dreamers',
    name: 'Ruzindana Kessy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-3',
    categoryId: 'face-dreamers',
    name: 'Akarabo Katsey',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-4',
    categoryId: 'face-dreamers',
    name: 'Ashley Mutoni',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Hype Maker of the Decade
  {
    id: 'hype-1',
    categoryId: 'hype-maker',
    name: 'Cyimana',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-2',
    categoryId: 'hype-maker',
    name: 'Lebon',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-3',
    categoryId: 'hype-maker',
    name: 'Uwase LaTasha Muganga',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-4',
    categoryId: 'hype-maker',
    name: 'Wesley',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-5',
    categoryId: 'hype-maker',
    name: 'Bangaly',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-6',
    categoryId: 'hype-maker',
    name: 'Nelson',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-7',
    categoryId: 'hype-maker',
    name: 'Jesh',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Alumni of the Decade
  {
    id: 'alumni-1',
    categoryId: 'alumni-decade',
    name: 'Kalisa Danny',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-2',
    categoryId: 'alumni-decade',
    name: 'Kirenga Sherif',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-3',
    categoryId: 'alumni-decade',
    name: 'Minega Jerry',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-4',
    categoryId: 'alumni-decade',
    name: 'Iriza Jade',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-5',
    categoryId: 'alumni-decade',
    name: 'Gloria munana',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-6',
    categoryId: 'alumni-decade',
    name: 'Ingride cyuzuzo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-7',
    categoryId: 'alumni-decade',
    name: 'Dadi',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-8',
    categoryId: 'alumni-decade',
    name: 'Captain Franck',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-9',
    categoryId: 'alumni-decade',
    name: 'Jean David Tuyishime',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-10',
    categoryId: 'alumni-decade',
    name: 'Diakite Bangaly',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-11',
    categoryId: 'alumni-decade',
    name: 'Christian Bahire',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Dream Creator of the Decade
  {
    id: 'creator-1',
    categoryId: 'dream-creator',
    name: 'Ngoga Guillaume',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-2',
    categoryId: 'dream-creator',
    name: 'Dave Hemsworth',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-3',
    categoryId: 'dream-creator',
    name: 'Lebon Israel',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-4',
    categoryId: 'dream-creator',
    name: 'Babu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-5',
    categoryId: 'dream-creator',
    name: 'BETA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-6',
    categoryId: 'dream-creator',
    name: 'JayD',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-7',
    categoryId: 'dream-creator',
    name: 'Kingly Diakite',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Execution Excellence Award
  {
    id: 'exec-1',
    categoryId: 'execution-excellence',
    name: 'Danny Kalisa',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-2',
    categoryId: 'execution-excellence',
    name: 'Abi Benie Umwari',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-3',
    categoryId: 'execution-excellence',
    name: 'Asingizwe Joie Colette',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-4',
    categoryId: 'execution-excellence',
    name: 'Arsene Maurice',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-5',
    categoryId: 'execution-excellence',
    name: 'Hakidu Shema',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-6',
    categoryId: 'execution-excellence',
    name: 'Ornella Ikirezi',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-7',
    categoryId: 'execution-excellence',
    name: 'Kitoko',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-8',
    categoryId: 'execution-excellence',
    name: 'Mutezintare Isimbi Sumaya',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-9',
    categoryId: 'execution-excellence',
    name: 'Mfuranzima Divin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-10',
    categoryId: 'execution-excellence',
    name: 'Abatesi Nadine',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-11',
    categoryId: 'execution-excellence',
    name: 'Cyuzuzo Kendy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Generate a unique voter ID for each user
export const getVoterId = (): string => {
  let voterId = localStorage.getItem('dreamers-voter-id');
  if (!voterId) {
    voterId = `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('dreamers-voter-id', voterId);
  }
  return voterId;
};

// Local storage keys
export const STORAGE_KEYS = {
  CATEGORIES: 'dreamers-categories',
  NOMINEES: 'dreamers-nominees',
  VOTES: 'dreamers-votes',
  PHOTOS: 'dreamers-photos'
};

// Initialize local storage with default data
export const initializeLocalData = () => {
  // Always refresh with latest data to ensure all nominees are present
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
  localStorage.setItem(STORAGE_KEYS.NOMINEES, JSON.stringify(defaultNominees));
  
  // Only initialize votes if they don't exist
  if (!localStorage.getItem(STORAGE_KEYS.VOTES)) {
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PHOTOS)) {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify({}));
  }
};

// Utility functions for local storage operations
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error);
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key ${key}:`, error);
  }
};

// Photo upload utilities
export const uploadPhoto = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      reject(new Error('File size must be less than 5MB'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    reader.readAsDataURL(file);
  });
};