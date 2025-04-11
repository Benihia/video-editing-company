export const VIDEO_TYPES = [
  {
    id: 'youtube',
    name: 'YouTube Video',
    description: 'Engaging content for your channel'
  },
  {
    id: 'commercial',
    name: 'Commercial',
    description: 'Professional advertising content'
  },
  {
    id: 'event',
    name: 'Event Video',
    description: 'Wedding, corporate, or special occasion'
  },
  {
    id: 'shortfilm',
    name: 'Short Film',
    description: 'Narrative storytelling'
  }
];

export const VIDEO_LENGTHS = [
  {
    id: '30',
    name: 'Up to 30 seconds',
    price: 250
  },
  {
    id: '60',
    name: '30-60 seconds',
    price: 450
  },
  {
    id: '180',
    name: '1-3 minutes',
    price: 850
  },
  {
    id: '300',
    name: '3-5 minutes',
    price: 1250
  },
  {
    id: '600',
    name: '5-10 minutes',
    price: 1950
  },
  {
    id: 'custom',
    name: 'Custom length',
    price: 0,
    description: 'Request quote'
  }
];

export const FEATURES = [
  {
    id: 'color-grading',
    name: 'Color Grading',
    description: 'Professional color correction and cinematic look',
    price: 150
  },
  {
    id: 'transitions',
    name: 'Custom Transitions',
    description: 'Smooth, professional scene transitions',
    price: 100
  },
  {
    id: 'subtitles',
    name: 'Professional Subtitles',
    description: 'Styled, timed subtitles for accessibility',
    price: 125
  },
  {
    id: 'sfx',
    name: 'Sound Effects',
    description: 'Professional SFX design and mixing',
    price: 175
  },
  {
    id: 'vfx',
    name: 'Visual Effects',
    description: 'Custom VFX elements and enhancements',
    price: 300
  },
  {
    id: 'voiceover',
    name: 'Voice-over',
    description: 'Professional narration recording',
    price: 250
  }
];

export const PORTFOLIO_ITEMS = [
  {
    title: 'Luxury Brand Campaign',
    categories: 'Commercial • Color Grading • Visual Effects',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    title: 'Ocean Depths Documentary',
    categories: 'Documentary • Sound Design • Narrative Editing',
    image: 'https://images.unsplash.com/photo-1551184451-76b792a8a0a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    title: 'Williams Wedding Highlight',
    categories: 'Event • Emotional Storytelling • Music Sync',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  }
];

export const SERVICES = [
  {
    icon: 'VideoIcon',
    title: 'Commercial Editing',
    description: 'Transform your brand messaging into compelling visual stories that drive engagement and conversions.',
    features: [
      'Cinematic color grading',
      'Dynamic transitions',
      'Professional sound design'
    ]
  },
  {
    icon: 'FilmIcon',
    title: 'Content Creation',
    description: 'Elevate your YouTube, social media, and web content with professional editing that keeps viewers engaged.',
    features: [
      'Engaging pacing and rhythm',
      'Custom graphics and text',
      'Thumbnail creation'
    ]
  },
  {
    icon: 'PlayCircleIcon',
    title: 'Event Cinematography',
    description: 'Preserve your special moments with beautifully edited videos that capture the essence of your event.',
    features: [
      'Emotional storytelling',
      'Music synchronization',
      'Highlight reels'
    ]
  }
];
