
require('dotenv').config();
const mongoose = require('mongoose');
const HistoricalFigure = require('../models/HistoricalFigure');

const historicalFigures = [
    {
        name: 'Martin Luther King Jr.',
        birthYear: 1929,
        deathYear: 1968,
        birthPlace: 'Atlanta, Georgia, USA',
        nationality: 'American',
        occupation: ['Civil Rights Activist', 'Minister', 'Author'],
        knownFor: ['I Have a Dream speech', 'Civil Rights Movement', 'Nonviolent resistance'],
        biography: 'Martin Luther King Jr. was an American Baptist minister and activist who became the most visible spokesperson and leader in the Civil Rights Movement from 1955 until his assassination in 1968. King advanced civil rights through nonviolence and civil disobedience, inspired by his Christian beliefs and the nonviolent activism of Mahatma Gandhi.',
        achievements: [
            'Nobel Peace Prize (1964)',
            'Led the Montgomery Bus Boycott',
            'Organized the March on Washington for Jobs and Freedom',
            'Instrumental in passing the Civil Rights Act of 1964',
            'Helped pass the Voting Rights Act of 1965'
        ],
        quotes: [
        {
            text: 'I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.',
            context: 'March on Washington, 1963'
        },
        {
            text: 'Injustice anywhere is a threat to justice everywhere.',
            context: 'Letter from Birmingham Jail, 1963'
        }
        ],
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Martin_Luther_King%2C_Jr..jpg',
            timelinePeriod: '20th Century',
            category: 'leader'
},
{
    name: 'Rosa Parks',
    birthYear: 1913,
    deathYear: 2005,
    birthPlace: 'Tuskegee, Alabama, USA',
    nationality: 'American',
    occupation: ['Civil Rights Activist', 'Seamstress'],
    knownFor: ['Montgomery Bus Boycott', 'Civil Rights Movement', 'Mother of the Civil Rights Movement'],
    biography: 'Rosa Louise McCauley Parks was an American activist in the civil rights movement best known for her pivotal role in the Montgomery bus boycott. The United States Congress has called her "the first lady of civil rights" and "the mother of the freedom movement".',
    achievements: [
      'Sparked the Montgomery Bus Boycott by refusing to give up her seat',
      'Presidential Medal of Freedom (1996)',
      'Congressional Gold Medal (1999)',
      'Helped establish the Rosa and Raymond Parks Institute for Self Development'
    ],
    quotes: [
      {
        text: 'I would like to be remembered as a person who wanted to be free... so other people would be also free.',
        context: 'Interview'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Rosaparks.jpg',
    timelinePeriod: '20th Century',
    category: 'leader'
  },
  {
    name: 'Maya Angelou',
    birthYear: 1928,
    deathYear: 2014,
    birthPlace: 'St. Louis, Missouri, USA',
    nationality: 'American',
    occupation: ['Poet', 'Author', 'Civil Rights Activist'],
    knownFor: ['I Know Why the Caged Bird Sings', 'Poetry', 'Civil Rights activism'],
    biography: 'Maya Angelou was an American memoirist, popular poet, and civil rights activist. She published seven autobiographies, three books of essays, several books of poetry, and is credited with a list of plays, movies, and television shows spanning over 50 years.',
    achievements: [
      'Presidential Medal of Freedom (2010)',
      'Published over 30 bestselling titles',
      'Received over 50 honorary degrees',
      'First African American woman to write a screenplay that was filmed',
      'Delivered poem at President Bill Clinton\'s inauguration'
    ],
    quotes: [
      {
        text: 'I\'ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.',
        context: 'Various interviews'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg',
    timelinePeriod: '20th Century',
    category: 'writer'
  },
  {
    name: 'Frederick Douglass',
    birthYear: 1818,
    deathYear: 1895,
    birthPlace: 'Talbot County, Maryland, USA',
    nationality: 'American',
    occupation: ['Abolitionist', 'Author', 'Orator', 'Statesman'],
    knownFor: ['Narrative of the Life of Frederick Douglass', 'Abolitionist movement', 'Women\'s suffrage'],
    biography: 'Frederick Douglass was an American social reformer, abolitionist, orator, writer, and statesman. After escaping from slavery in Maryland, he became a national leader of the abolitionist movement in Massachusetts and New York, becoming famous for his oratory and incisive antislavery writings.',
    achievements: [
      'Published three autobiographies',
      'Advised President Abraham Lincoln',
      'First African American nominated for Vice President (1872)',
      'U.S. Marshal for the District of Columbia',
      'Founded and edited The North Star newspaper'
    ],
    quotes: [
      {
        text: 'If there is no struggle, there is no progress.',
        context: 'Speech on West India Emancipation, 1857'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Frederick_Douglass_portrait.jpg',
    timelinePeriod: '19th Century',
    category: 'leader'
  },
  {
    name: 'Harriet Tubman',
    birthYear: 1822,
    deathYear: 1913,
    birthPlace: 'Dorchester County, Maryland, USA',
    nationality: 'American',
    occupation: ['Abolitionist', 'Political Activist', 'Union Spy'],
    knownFor: ['Underground Railroad', 'Civil War spy', 'Women\'s suffrage'],
    biography: 'Harriet Tubman was an American abolitionist and political activist. Born into slavery, Tubman escaped and subsequently made some 13 missions to rescue approximately 70 enslaved people, including family and friends, using the network of antislavery activists and safe houses known as the Underground Railroad.',
    achievements: [
      'Led hundreds to freedom via Underground Railroad',
      'Served as Union Army scout and spy during Civil War',
      'First woman to lead an armed expedition in the war',
      'Helped establish schools for formerly enslaved people',
      'Active in women\'s suffrage movement'
    ],
    quotes: [
      {
        text: 'I never ran my train off the track, and I never lost a passenger.',
        context: 'Referring to the Underground Railroad'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Harriet_Tubman%2C_by_Squyer%2C_NPG%2C_c1885.jpg',
    timelinePeriod: '19th Century',
    category: 'leader'
  },
  {
    name: 'George Washington Carver',
    birthYear: 1864,
    deathYear: 1943,
    birthPlace: 'Diamond, Missouri, USA',
    nationality: 'American',
    occupation: ['Agricultural Scientist', 'Inventor', 'Educator'],
    knownFor: ['Crop rotation methods', 'Peanut products', 'Agricultural innovation'],
    biography: 'George Washington Carver was an American agricultural scientist and inventor who promoted alternative crops to cotton and methods to prevent soil depletion. He was one of the most prominent black scientists of the early 20th century.',
    achievements: [
      'Developed 300+ uses for peanuts',
      'Created 100+ products from sweet potatoes',
      'Pioneered crop rotation techniques',
      'First African American to earn a Bachelor of Science degree',
      'Presidential appointment to advisor roles'
    ],
    quotes: [
      {
        text: 'Education is the key to unlock the golden door of freedom.',
        context: 'Various speeches'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/George_Washington_Carver_crop.jpg',
    timelinePeriod: '19th-20th Century',
    category: 'scientist'
  },
  {
    name: 'Katherine Johnson',
    birthYear: 1918,
    deathYear: 2020,
    birthPlace: 'White Sulphur Springs, West Virginia, USA',
    nationality: 'American',
    occupation: ['Mathematician', 'NASA Scientist'],
    knownFor: ['NASA space calculations', 'Apollo 11 mission', 'Hidden Figures'],
    biography: 'Katherine Johnson was an American mathematician whose calculations of orbital mechanics as a NASA employee were critical to the success of the first and subsequent U.S. crewed spaceflights. Her work was depicted in the 2016 film Hidden Figures.',
    achievements: [
      'Calculated trajectory for first American in space',
      'Verified computer calculations for John Glenn\'s orbit',
      'Worked on Apollo 11 moon landing calculations',
      'Presidential Medal of Freedom (2015)',
      'NASA facility named in her honor'
    ],
    quotes: [
      {
        text: 'We will always have STEM with us. Some things will drop out of the public eye and will go away, but there will always be science, engineering, and technology.',
        context: 'Interview'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Katherine_Johnson_in_2008.jpg',
    timelinePeriod: '20th Century',
    category: 'scientist'
  },
  {
    name: 'Langston Hughes',
    birthYear: 1901,
    deathYear: 1967,
    birthPlace: 'Joplin, Missouri, USA',
    nationality: 'American',
    occupation: ['Poet', 'Novelist', 'Playwright'],
    knownFor: ['Harlem Renaissance', 'Jazz poetry', 'The Weary Blues'],
    biography: 'James Mercer Langston Hughes was an American poet, social activist, novelist, playwright, and columnist from Joplin, Missouri. One of the earliest innovators of the literary art form called jazz poetry, Hughes is best known as a leader of the Harlem Renaissance.',
    achievements: [
      'Published over 860 poems',
      'Leader of the Harlem Renaissance',
      'Created the character Jesse B. Semple',
      'Influenced the Beat Generation',
      'Wrote for over 50 years'
    ],
    quotes: [
      {
        text: 'Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.',
        context: 'Dreams poem, 1922'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Langston_Hughes_by_Carl_Van_Vechten_1936.jpg',
    timelinePeriod: '20th Century',
    category: 'writer'
  },
  {
    name: 'Malcolm X',
    birthYear: 1925,
    deathYear: 1965,
    birthPlace: 'Omaha, Nebraska, USA',
    nationality: 'American',
    occupation: ['Minister', 'Human Rights Activist'],
    knownFor: ['Civil Rights Movement', 'Black nationalism', 'The Autobiography of Malcolm X'],
    biography: 'Malcolm X was an African-American Muslim minister and human rights activist who was a prominent figure during the civil rights movement. A spokesman for the Nation of Islam until 1964, he was a vocal advocate for Black empowerment and the promotion of Islam within the Black community.',
    achievements: [
      'Founded Muslim Mosque, Inc.',
      'Established Organization of Afro-American Unity',
      'Influential autobiography published posthumously',
      'Advocated for Black self-determination',
      'International human rights advocate'
    ],
    quotes: [
      {
        text: 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.',
        context: 'Various speeches'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Malcolm_X_NYWTS_2a.jpg',
    timelinePeriod: '20th Century',
    category: 'leader'
  },
  {
    name: 'Sojourner Truth',
    birthYear: 1797,
    deathYear: 1883,
    birthPlace: 'Swartekill, New York, USA',
    nationality: 'American',
    occupation: ['Abolitionist', 'Women\'s Rights Activist'],
    knownFor: ['Ain\'t I a Woman speech', 'Abolitionist movement', 'Women\'s suffrage'],
    biography: 'Sojourner Truth was an American abolitionist and women\'s rights activist. Born into slavery, she escaped with her infant daughter to freedom in 1826. After going to court to recover her son in 1828, she became the first black woman to win such a case against a white man.',
    achievements: [
      'First black woman to win a case against a white man',
      'Delivered famous "Ain\'t I a Woman?" speech',
      'Helped recruit Black troops for Union Army',
      'Advocated for women\'s property rights',
      'Met with President Abraham Lincoln'
    ],
    quotes: [
      {
        text: 'Truth is powerful and it prevails.',
        context: 'Various speeches'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Sojourner_truth_c1870.jpg',
    timelinePeriod: '19th Century',
    category: 'leader'
  },
  {
    name: 'W.E.B. Du Bois',
    birthYear: 1868,
    deathYear: 1963,
    birthPlace: 'Great Barrington, Massachusetts, USA',
    nationality: 'American',
    occupation: ['Sociologist', 'Historian', 'Civil Rights Activist', 'Author'],
    knownFor: ['The Souls of Black Folk', 'NAACP co-founder', 'Pan-Africanism'],
    biography: 'William Edward Burghardt Du Bois was an American sociologist, socialist, historian, civil rights activist, Pan-Africanist, author, writer and editor. He was the first African American to earn a doctorate from Harvard University.',
    achievements: [
      'Co-founded the NAACP',
      'Published The Souls of Black Folk',
      'First African American to earn PhD from Harvard',
      'Founded The Crisis magazine',
      'Pioneer in sociology and civil rights'
    ],
    quotes: [
      {
        text: 'The cost of liberty is less than the price of repression.',
        context: 'Various writings'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/80/WEB_DuBois_1918.jpg',
    timelinePeriod: '19th-20th Century',
    category: 'writer'
  },
  {
    name: 'Thurgood Marshall',
    birthYear: 1908,
    deathYear: 1993,
    birthPlace: 'Baltimore, Maryland, USA',
    nationality: 'American',
    occupation: ['Lawyer', 'Supreme Court Justice', 'Civil Rights Activist'],
    knownFor: ['Brown v. Board of Education', 'First African American Supreme Court Justice'],
    biography: 'Thurgood Marshall was an American lawyer and civil rights activist who served as Associate Justice of the Supreme Court of the United States from 1967 until 1991. He was the Supreme Court\'s first African-American justice.',
    achievements: [
      'First African American Supreme Court Justice',
      'Won Brown v. Board of Education case',
      'Won 29 of 32 cases before Supreme Court',
      'Director-Counsel of NAACP Legal Defense Fund',
      'Solicitor General of the United States'
    ],
    quotes: [
      {
        text: 'In recognizing the humanity of our fellow beings, we pay ourselves the highest tribute.',
        context: 'Various speeches'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Thurgood-marshall-2.jpg',
    timelinePeriod: '20th Century',
    category: 'leader'
  },
  {
    name: 'Jackie Robinson',
    birthYear: 1919,
    deathYear: 1972,
    birthPlace: 'Cairo, Georgia, USA',
    nationality: 'American',
    occupation: ['Baseball Player', 'Civil Rights Activist'],
    knownFor: ['Breaking baseball color barrier', 'Brooklyn Dodgers', 'Civil rights advocacy'],
    biography: 'Jack Roosevelt Robinson was an American professional baseball player who became the first African American to play in Major League Baseball in the modern era. Robinson broke the baseball color line when he started at first base for the Brooklyn Dodgers on April 15, 1947.',
    achievements: [
      'First African American in modern MLB',
      'Rookie of the Year (1947)',
      'MLB MVP (1949)',
      'Six-time All-Star',
      'Baseball Hall of Fame inductee',
      'Number 42 retired across all MLB teams'
    ],
    quotes: [
      {
        text: 'A life is not important except in the impact it has on other lives.',
        context: 'Autobiography'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/85/JackieRobinson1945.jpg',
    timelinePeriod: '20th Century',
    category: 'other'
  },
  {
    name: 'Bessie Coleman',
    birthYear: 1892,
    deathYear: 1926,
    birthPlace: 'Atlanta, Texas, USA',
    nationality: 'American',
    occupation: ['Pilot', 'Aviator'],
    knownFor: ['First African American woman pilot', 'First African American with international pilot license'],
    biography: 'Elizabeth "Bessie" Coleman was an early American civil aviator. She was the first African-American woman and first Native American to hold a pilot license. She earned her license from the Fédération Aéronautique Internationale on June 15, 1921.',
    achievements: [
      'First African American woman to hold a pilot license',
      'First African American to earn international pilot license',
      'Performed in numerous air shows',
      'Refused to perform before segregated audiences',
      'Inspired generations of aviators'
    ],
    quotes: [
      {
        text: 'The air is the only place free from prejudices.',
        context: 'Various interviews'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Bessie_Coleman.jpg',
    timelinePeriod: '20th Century',
    category: 'other'
  },
  {
    name: 'James Baldwin',
    birthYear: 1924,
    deathYear: 1987,
    birthPlace: 'New York City, New York, USA',
    nationality: 'American',
    occupation: ['Novelist', 'Essayist', 'Playwright', 'Poet'],
    knownFor: ['Go Tell It on the Mountain', 'The Fire Next Time', 'Civil Rights essays'],
    biography: 'James Arthur Baldwin was an American novelist, playwright, essayist, poet, and activist. His essays, as collected in Notes of a Native Son, explore intricacies of racial, sexual, and class distinctions in Western society, most notably in regard to the mid-twentieth-century United States.',
    achievements: [
      'Published numerous influential novels and essays',
      'Voice of the Civil Rights Movement',
      'Legion of Honor from France',
      'Influenced American literature and civil rights discourse',
      'Works studied worldwide'
    ],
    quotes: [
      {
        text: 'Not everything that is faced can be changed, but nothing can be changed until it is faced.',
        context: 'Various writings'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/37/James_Baldwin_33_Allan_Warren.jpg',
    timelinePeriod: '20th Century',
    category: 'writer'
  },
  {
    name: 'Mae Jemison',
    birthYear: 1956,
    deathYear: null,
    birthPlace: 'Decatur, Alabama, USA',
    nationality: 'American',
    occupation: ['Astronaut', 'Physician', 'Engineer'],
    knownFor: ['First African American woman in space', 'NASA astronaut', 'STEM advocate'],
    biography: 'Mae Carol Jemison is an American engineer, physician, and former NASA astronaut. She became the first African American woman to travel into space when she served as a mission specialist aboard the Space Shuttle Endeavour in 1992.',
    achievements: [
      'First African American woman in space',
      'Served aboard Space Shuttle Endeavour',
      'Medical doctor and engineer',
      'Founded technology research company',
      'Professor and STEM education advocate',
      'Appeared on Star Trek: The Next Generation'
    ],
    quotes: [
      {
        text: 'Never be limited by other people\'s limited imaginations.',
        context: 'Various speeches'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Mae_Carol_Jemison.jpg',
    timelinePeriod: '20th-21st Century',
    category: 'scientist'
  }    
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
        });

        console.log('✅ MongoDB Connected');


        // Clear existing data
        await HistoricalFigure.deleteMany({});
        console.log('🗑️  Cleared existing historical figures');

        // Test index
        await HistoricalFigure.collection.createIndex({
            name: 'text',
            biography: 'text',
            knownFor: 'text'
          });
          console.log('✅ Text index created');

        // Insert seed data
        const createdFigures = await HistoricalFigure.insertMany(historicalFigures);
        console.log(`✅ Successfully seeded ${createdFigures.length} historical figures`);

        // Display summary
        console.log('\n📊 Seed Summary:');
        console.log(`   - Total Figures: ${createdFigures.length}`);


        const categories = {};
        createdFigures.forEach(fig => {
            categories[fig.category] = (categories[fig.ctegory] || 0) + 1;
        });

        console.log('   - By Category:');
        Object.entries(categories).forEach(([category, count]) => {
            console.log(`   • ${category}: ${count}`);
        });

        console.log('\n🎉 Database seeding complete!');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
      }
};

seedDatabase();