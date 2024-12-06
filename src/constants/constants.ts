
interface ProjectContent {
    title: string;
    type: string;
    description: string;
    techStack: string[];
    media: string[];
    mediaType: string;
    link: string;
  }
  
export const contentArray: ProjectContent[] = [
      {
          title: 'Cambridge Carbon Map',
          type: 'Web',
          description: 'We partner with institutions and enterprises across Cambridge, placing them onto our digital map, which celebrates and informs others of the climate actions. We want to make it easier for organisations to learn from, evaluate and inspire each other’s actions, empowering long term sustainable change.',
          techStack: ['TypeScript', 'React', 'Ionic', 'Redux', 'API Integration', 'Leaflet JS', 'Map Data'],
          media: ['ccm.png'],
          mediaType: '3D',
          link: 'https://cambridgecarbonmap.org/'
      },
      {
          title: 'TrailTale',
          type: 'Mobile',
          description: 'TrailTale is a free exploration walking trail app offering self-guided walking tours of London and many other cities towns and villages across GB. It also acts as a repository of many attractions in Great Britain.',
          techStack: ['React Native', 'Expo', 'React Native Maps', 'SQLite', 'Redux', 'API Integration'],
          media: ['trailtale-0.png', 'trailtale-1.png', 'trailtale-2.png'],
          mediaType: 'mobile',
          link: 'https://trailtale.co.uk/'
      },
      {
          title: 'Guida Caffè',
          type: 'Mobile',
          description: 'I was fortunate enough to work with the artist, film maker and coffee expert Leonardo Santetti on this project. He designed the mobile app that allows users to find specialty coffee shops, roasteries and cafes throughout Italy.',
          techStack: ['React Native', 'Expo', 'React Native Maps', 'SQLite', 'Redux', 'API Integration'],
          media: ['guidacaffe-0.png', 'guidacaffe-1.png', 'guidacaffe-2.png'],
          mediaType: 'mobile',
          link: 'https://apps.apple.com/us/app/guida-caff%C3%A8/id1584978048'
      },
      {
          title: 'We Are XYZ',
          type: 'Web',
          description: 'Transform your research into a living archive for all the family',
          techStack: ['React', 'Next.js', 'MUI', 'Cesium', 'Redux', 'Python', 'Django REST Framework', 'PostgreSQL', 'Docker', 'AWS', 'Jira', 'Figma'],
          media: ['wearexyz-logo.png'],
          mediaType: '',
          link: 'https://weare.xyz/'
      },
      {
          title: 'XRD Domains',
          type: 'Web',
          description: 'XRD Domains is a project that aims to make the process of managing domains on the Radix network as simple and user-friendly as possible. Think of it as the GoDaddy or Namecheap of Web3. XRD Domains is also a prominent developer of the Radix Name Service (RNS), which is a domain registry and trust layer running on Radix.',
          techStack: ['TypeScript', 'React', 'Next.js', 'Web3', 'AWS', 'Chrome Extension Development', 'Twitter API', 'Node.js', 'Blockchain DNS'],
          media: ['xrd-domains.png'],
          mediaType: '3D',
          link: 'https://xrd.domains/'
      },
      {
          title: '04postal',
          type: 'Web',
          description: '04postal is a fast growing fashion brand providing their customers with limited edition, high quality design items.',
          techStack: ['TypeScript', 'Next.js', 'Python', 'AWS Lambda', 'TensorFlow Lite', 'Computer Vision', 'Squarespace'],
          media: ['postal-logo.png'],
          mediaType: 'iframe',
          link: 'https://04postal.com/register'
      },
      {
          title: 'NowNook',
          type: 'Mobile',
          description: 'NowNook is a unique e-commerce platform that redefines online shopping by transforming product discovery into an engaging, personalised experience. Users can explore a dynamic video feed of trending products from affiliate programs, allowing them to discover new items that match their preferences and shopping habits.',
          techStack: ['TypeScript', 'React Native', 'Node.js', 'MongoDB', 'Express', 'AWS', 'Twilio'],
          media: ['nownook-0.png', 'nownook-1.png'],
          mediaType: 'mobile',
          link: 'https://www.nownook.co.uk/'
      },
  ]
  