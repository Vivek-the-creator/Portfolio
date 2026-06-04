import {
  htmlIcon, cssIcon, jsIcon, reactIcon,
  tailwindIcon, nodeIcon, mongoIcon, pythonIcon,
  gitIcon, figmaIcon, djangoIcon, flutterIcon,
} from './SkillIcons';

// Skills placed on orbits — matching the reference SkillData.ts structure
// orbit 1 = innermost, orbit 4 = outermost
export const skills = [
  { icon: reactIcon,   name: 'React',      orbit: 3, angle: 0   },
  { icon: jsIcon,      name: 'JavaScript', orbit: 3, angle: 90  },
  { icon: pythonIcon,  name: 'Python',     orbit: 3, angle: 180 },
  { icon: nodeIcon,    name: 'Node.js',    orbit: 2, angle: 30  },
  { icon: mongoIcon,   name: 'MongoDB',    orbit: 2, angle: 180 },
  { icon: djangoIcon,  name: 'Django',     orbit: 2, angle: 300 },
  { icon: jsIcon,      name: 'TypeScript', orbit: 4, angle: 0   },
  { icon: gitIcon,     name: 'Git',        orbit: 4, angle: 90  },
  { icon: htmlIcon,    name: 'HTML5',      orbit: 4, angle: 180 },
  { icon: cssIcon,     name: 'CSS3',       orbit: 4, angle: 270 },
  { icon: tailwindIcon,name: 'Tailwind',   orbit: 1, angle: 60  },
  { icon: flutterIcon, name: 'Flutter',    orbit: 1, angle: 240 },
  { icon: figmaIcon,   name: 'Figma',      orbit: 1, angle: 150 },
];

// Showcase skills for the expanded card grid — all 13 with names
export const showcaseSkills = [
  { img: reactIcon,    name: 'React'       },
  { img: jsIcon,       name: 'JavaScript'  },
  { img: pythonIcon,   name: 'Python'      },
  { img: tailwindIcon, name: 'Tailwind CSS'},
  { img: nodeIcon,     name: 'Node.js'     },
  { img: mongoIcon,    name: 'MongoDB'     },
  { img: djangoIcon,   name: 'Django'      },
  { img: htmlIcon,     name: 'HTML5'       },
  { img: cssIcon,      name: 'CSS3'        },
  { img: gitIcon,      name: 'Git'         },
  { img: flutterIcon,  name: 'Flutter'     },
  { img: figmaIcon,    name: 'Figma'       },
];
