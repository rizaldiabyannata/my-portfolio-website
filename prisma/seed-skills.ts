import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const skillsToSeed = [
  // Backend
  { name: 'Node.js', category: 'Backend', icon: 'NodejsIcon' },
  { name: 'Express.js', category: 'Backend', icon: 'ExpressIcon' },
  { name: 'Bun.js', category: 'Backend', icon: 'BunIcon' },
  // Frontend
  { name: 'JavaScript', category: 'Frontend', icon: 'JavaScriptIcon' },
  { name: 'React.js', category: 'Frontend', icon: 'ReactIcon' },
  { name: 'Vue.js', category: 'Frontend', icon: 'VuejsIcon' },
  { name: 'Next.js', category: 'Frontend', icon: 'NextjsIcon' },
  { name: 'Nuxt.js', category: 'Frontend', icon: 'NuxtjsIcon' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'TailwindIcon' },
  { name: 'HTML5', category: 'Frontend', icon: 'HtmlIcon' },
  { name: 'CSS3', category: 'Frontend', icon: 'CssIcon' },
  // Database
  { name: 'MySQL', category: 'Database', icon: 'MysqlIcon' },
  { name: 'MongoDB', category: 'Database', icon: 'MongoIcon' },
  // Others
  { name: 'Docker', category: 'Others', icon: 'DockerIcon' },
  { name: 'Git', category: 'Others', icon: 'GitIcon' },
];

async function main() {
  console.log('Start seeding skills...');
  // Use `upsert` to avoid creating duplicate skills if the script is run again
  // We'll use the combination of name and category as a unique identifier
  for (const s of skillsToSeed) {
    await prisma.skill.upsert({
      where: { name_category: { name: s.name, category: s.category } },
      update: s,
      create: s,
    });
  }
  console.log('Seeding skills finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
