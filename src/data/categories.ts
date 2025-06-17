export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  nominees: string[];
  isAward?: boolean; // For awards without voting
}

export const categories: Category[] = [
  {
    id: 'mama-mekha',
    title: 'Mama Mekha Award',
    icon: '🥇',
    description: 'Lifetime Service Recognition - Special Award',
    nominees: [],
    isAward: true
  },
  {
    id: 'best-coordinator',
    title: 'Best Camp Coordinator',
    icon: '🏕',
    description: 'Based on camper feedback, leadership, and dedication',
    nominees: [
      'David Mugisha - 2023-2024',
      'Maria Uwimana - 2021-2022',
      'Jean Claude Nzeyimana - 2019-2020',
      'Aline Uwase - 2017-2018',
      'Patrick Ndayisaba - 2015-2016'
    ]
  },
  {
    id: 'top-venue',
    title: 'Top Hosting Venue',
    icon: '🏛',
    description: 'Most welcoming venue with strong logistical support',
    nominees: [
      'University of Rwanda - Huye Campus',
      'Kigali Independent University',
      'INES-Ruhengeri Campus',
      'Adventist University of Central Africa',
      'University of Kigali Main Campus'
    ]
  },
  {
    id: 'volunteer-intake',
    title: 'Volunteer Intake of the Decade',
    icon: '🤝',
    description: 'Group that left a lasting mark through service and spirit',
    nominees: [
      'Class of 2020 Volunteers',
      'Class of 2018 Volunteers',  
      'Class of 2022 Volunteers',
      'Class of 2019 Volunteers',
      'Class of 2021 Volunteers'
    ]
  },
  {
    id: 'debate-coach',
    title: 'Best Debate Camp Coach',
    icon: '👨‍🏫',
    description: 'For energy, consistency, mentorship, and camper impact',
    nominees: [
      'Emmanuel Rutayisire',
      'Claudine Uwimana',
      'James Nkurunziza',
      'Diane Mukamana',
      'Felix Nsabimana'
    ]
  },
  {
    id: 'afternoon-class',
    title: 'Best Afternoon Class',
    icon: '🎨',
    description: 'The most engaging and enjoyable experience for campers',
    nominees: [
      'Creative Writing Workshop',
      'Leadership & Public Speaking',
      'Entrepreneurship Bootcamp',
      'Arts & Drama Therapy',
      'Technology & Innovation Lab'
    ]
  },
  {
    id: 'consistent-partner',
    title: 'Most Consistent Partner',
    icon: '🧩',
    description: 'Organization or individual who supported over the years',
    nominees: [
      'Rwanda Debate Association',
      'Ministry of Education',
      'Private Sector Federation',
      'UN Women Rwanda',
      'British Council Rwanda'
    ]
  },
  {
    id: 'alumni-couple',
    title: 'Alumni Couple of the Decade',
    icon: '💑',
    description: 'From camp sweethearts to life partners',
    nominees: [
      'John & Mary Uwimana (2016 & 2017 Alumni)',
      'Paul & Grace Mukamana (2015 & 2016 Alumni)',
      'Eric & Sarah Nzeyimana (2018 & 2019 Alumni)',
      'Kevin & Alice Uwase (2017 & 2018 Alumni)',
      'Daniel & Claire Mugisha (2019 & 2020 Alumni)'
    ]
  },
  {
    id: 'impact-story',
    title: 'Alumni Story of Impact',
    icon: '🌟',
    description: 'Alumni who became public figures, founders, changemakers',
    nominees: [
      'Aisha Uwimana - Tech Entrepreneur & Founder',
      'Jean Baptiste Nkurunziza - Social Activist & NGO Leader',
      'Claudine Mukamana - Government Official & Policy Maker',
      'Emmanuel Rwigema - International Development Consultant',
      'Grace Uwase - Award-winning Journalist & Media Personality'
    ]
  },
  {
    id: 'best-speaker',
    title: 'Best Speaker of the Decade',
    icon: '🎤',
    description: 'Embodiment of debating excellence and presence',
    nominees: [
      'David Nkurunziza - 2019 Champion',
      'Sarah Mukamana - 2021 Winner',
      'James Uwimana - 2020 Finalist',
      'Alice Uwase - 2022 Champion',
      'Patrick Mugisha - 2018 Winner'
    ]
  },
  {
    id: 'involved-alumni',
    title: 'Most Involved Alumni',
    icon: '🔄',
    description: 'Returned to coach, judge, organize, or mentor over the years',
    nominees: [
      'Martin Nzeyimana - Coach & Organizer (2016-2024)',
      'Diane Uwimana - Judge & Mentor (2017-2024)',
      'Felix Mukamana - Coordinator & Trainer (2018-2024)',
      'Esther Nkurunziza - Alumni Relations (2019-2024)',
      'Kevin Uwase - Volunteer Coordinator (2020-2024)'
    ]
  }
];