interface ProjectContent {
    title: string;
    type: string;
    description: string[];
    techStack: string[];
    media: string[];
    mediaType: string;
    link: string;
  }
  
export const email = "hello@joshua.so"

export const contentArray: ProjectContent[] = [
      {
          title: 'Cambridge Carbon Map',
          type: 'Web',
          description: [
            "Cambridge Carbon Map makes it easier for organisations to learn from, evaluate and inspire each other's actions, empowering long term sustainable change. By placing carbon emissions and climate action data onto a digital map, institutions and enterprises are celebrated and the public are informed of their actions towards sustainability.",
            'Contributing to this open source project gave me valuable experience working with geospatial data, APIs and digital mapping as well as having the opportunity to work with highly skilled scientists, researchers, designers and developers.',
          ],
          techStack: ['TypeScript', 'React', 'Ionic', 'Redux', 'API Integration', 'Leaflet JS', 'Map Data'],
          media: ['ccm.png'],
          mediaType: '3D',
          link: 'https://cambridgecarbonmap.org/'
      },
      {
          title: 'TrailTale',
          type: 'Mobile',
          description: [
            'TrailTale is a walking trail app offering self-guided walking tours of London and many other cities, towns and villages across the UK for the 50,000 users who have downloaded the app. It also acts as a repository of many attractions in Great Britain.',
            'The app is built using React Native and guides users on designed walking tours around the UK using React Native Maps and audio files. I was the sole developer on this project and built the app from scratch to the exact design specified by the client.',
        ],
          techStack: ['React Native', 'Expo', 'React Native Maps', 'SQLite', 'Redux', 'API Integration'],
          media: ['trailtale-0.png', 'trailtale-1.png', 'trailtale-2.png'],
          mediaType: 'mobile',
          link: 'https://trailtale.co.uk/'
      },
      {
          title: 'Guida Caffè',
          type: 'Mobile',
          description: [
            'I was fortunate enough to work with the Florence based designer, artist, film maker and coffee expert Leonardo Santetti on this project. I brought to life his idea for a mobile app that allows users to find specialty coffee shops, roasteries and cafes throughout Italy. Leonardo released the app along with his own book, "The Italian Specialty Coffee Guide 2021".',
            'The app is built using React Native with the main feature using React Native Maps to show the locations of the specialty shops and roasteries. This was another experience working with maps and geospatial data as well as gaining experience in designing digital maps to the same standard as the app itself.',
          ],
          techStack: ['React Native', 'Expo', 'React Native Maps', 'SQLite', 'Redux', 'API Integration'],
          media: ['guidacaffe-0.png', 'guidacaffe-1.png', 'guidacaffe-2.png'],
          mediaType: 'mobile',
          link: 'https://apps.apple.com/us/app/guida-caff%C3%A8/id1584978048'
      },
      {
          title: 'We Are XYZ',
          type: 'Web',
          description: [
            'Preserving family history for the generations to come is the challenge that We Are XYZ aims to solve. The platform acts as a digital online archive to preserve family history and linking family members to the archives.',
            'I grew a lot at this startup and became a full stack developer whilst also contributing to the design and architecture of the platform. I got a lot of exposure to new technologies and worked with talented senior developers. The front-end was built using React and MUI and the back-end was built using Python and Django REST Framework hosted on AWS.',
          ],
          techStack: ['React', 'Next.js', 'MUI', 'Cesium', 'Redux', 'Python', 'Django REST Framework', 'PostgreSQL', 'Docker', 'AWS', 'Jira', 'Figma'],
          media: ['wearexyz-logo.png'],
          mediaType: '',
          link: 'https://weare.xyz/'
      },
      {
          title: 'XRD Domains',
          type: 'Web',
          description: [
            'XRD Domains is a project that aims to make the process of managing domains on the Radix network as simple and user-friendly as possible. Think of it as the GoDaddy or Namecheap of Web3. XRD Domains is also a prominent developer of the Radix Name Service (RNS), which is a domain registry and trust layer running on Radix. My work directly contributed to the 10,000+ domains that were registered in the first 24 hours of launching',
            'My work here ranged massively from developing chrome extensions, building a VPN mobile app, developing an engagement tracker with the Twitter API, building a DNS lookup on the blockchain to name a few. I got to work with a lot of new technologies and learn a lot about the complexities of building a web3 product whilst working alongside high level developers in Web3.',
          ],
          techStack: ['TypeScript', 'React', 'Next.js', 'Web3', 'AWS', 'Chrome Extension Development', 'Twitter API', 'Node.js', 'Blockchain DNS'],
          media: ['xrd-domains.png'],
          mediaType: '3D',
          link: 'https://xrd.domains/'
      },
      {
          title: '04postal',
          type: 'Web',
          description: [
            '04postal is a fast growing fashion brand providing their customers with limited edition, high quality design items. The London based up and coming brand reached out to me to build their latest marketing idea, a computer vision app that allows customers to register an 04postal passport to gain access to their latest collection.',
            'Using TensorFlow the app masks the body of the user with a white outline to create a passport in the style of 04postal. The passport is then sent to the user along with their ID which they use to access the site. The UI uses Next.js and the API is built using Python and AWS Lambda.',
          ],
          techStack: ['TypeScript', 'Next.js', 'Python', 'AWS Lambda', 'TensorFlow', 'Computer Vision', 'Squarespace'],
          media: ['postal-arrow.png'],
          mediaType: 'iframe',
          link: 'https://04postal.com/register'
      },
      {
          title: 'NowNook',
          type: 'Mobile',
          description: [
            'NowNook is a unique e-commerce platform that redefines online shopping by transforming product discovery into an engaging, personalised experience. Users can explore a dynamic video feed of trending products from affiliate programs, allowing them to discover new items that match their preferences and shopping habits.',
            'I got this project from an MVP to a market ready app. This required a whole redesign along with several additional features. The app is built using the MERN stack with the main feature being a scrolling video feed which I added post MVP along with the explore page.',
          ],
          techStack: ['TypeScript', 'React Native', 'Node.js', 'MongoDB', 'Express', 'AWS', 'Twilio'],
          media: ['nownook-0.png', 'nownook-1.png'],
          mediaType: 'mobile',
          link: 'https://www.nownook.co.uk/'
      },
  ]
  