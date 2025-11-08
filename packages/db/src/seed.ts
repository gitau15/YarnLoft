import { PrismaClient, YarnWeight, SkillLevel, PatternType, ProjectStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@yarnloft.com' },
    update: {},
    create: {
      email: 'admin@yarnloft.com',
      passwordHash: hashedPassword,
      name: 'YarnLoft Admin',
      bio: 'Welcome to YarnLoft - your global hub for the fiber arts community!',
      skillLevel: SkillLevel.ADVANCED,
      preferredCrafts: 'BOTH',
      profileVisibility: 'PUBLIC',
    },
  });

  // Create test user
  const testPassword = await bcrypt.hash('password123', 12);
  const testUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      passwordHash: testPassword,
      name: 'Jane Crafter',
      bio: 'Passionate knitter and crocheter who loves working with natural fibers.',
      location: 'Portland, OR',
      ravelryUsername: 'janecrafter',
      skillLevel: SkillLevel.INTERMEDIATE,
      preferredCrafts: 'BOTH',
      profileVisibility: 'PUBLIC',
    },
  });

  console.log('👥 Created users:', adminUser.name, testUser.name);

  // Create sample yarn products
  const products = [
    {
      name: 'Merino Worsted',
      brand: 'YarnCo',
      colorway: 'Ocean Blue',
      description: 'Soft and squishy 100% merino wool perfect for sweaters and accessories.',
      price: 24.00,
      weightCategory: YarnWeight.WORSTED,
      fiberContent: '100% Merino Wool',
      yardage: 220,
      meters: 200,
      gauge: '4.5-5 sts per inch',
      needleSize: 'US 7-8 (4.5-5mm)',
      careInstructions: 'Hand wash cold, lay flat to dry',
      stockQuantity: 50,
      lowStockThreshold: 10,
    },
    {
      name: 'Silk Lace',
      brand: 'Luxury Fibers',
      colorway: 'Rose Garden',
      description: 'Elegant lace weight yarn with a beautiful silk sheen.',
      price: 32.00,
      weightCategory: YarnWeight.LACE,
      fiberContent: '100% Silk',
      yardage: 440,
      meters: 400,
      gauge: '6-8 sts per inch',
      needleSize: 'US 2-4 (2.75-3.5mm)',
      careInstructions: 'Hand wash cold, lay flat to dry',
      stockQuantity: 30,
      lowStockThreshold: 5,
    },
    {
      name: 'Organic Cotton DK',
      brand: 'EcoKnits',
      colorway: 'Forest Green',
      description: 'Sustainable and soft organic cotton perfect for baby items and summer garments.',
      price: 18.00,
      weightCategory: YarnWeight.DK,
      fiberContent: '100% Organic Cotton',
      yardage: 240,
      meters: 220,
      gauge: '5.5-6 sts per inch',
      needleSize: 'US 6-7 (4-4.5mm)',
      careInstructions: 'Machine wash gentle, tumble dry low',
      stockQuantity: 75,
      lowStockThreshold: 15,
    },
    {
      name: 'Superwash Bulky',
      brand: 'QuickKnits',
      colorway: 'Cozy Gray',
      description: 'Machine washable bulky yarn that knits up quickly for warm winter projects.',
      price: 16.00,
      weightCategory: YarnWeight.BULKY,
      fiberContent: '100% Superwash Wool',
      yardage: 120,
      meters: 110,
      gauge: '3-3.5 sts per inch',
      needleSize: 'US 10-11 (6-8mm)',
      careInstructions: 'Machine wash gentle, tumble dry low',
      stockQuantity: 40,
      lowStockThreshold: 8,
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.create({
      data: productData,
    });

    // Add product images
    await prisma.productImage.createMany({
      data: [
        {
          productId: product.id,
          url: `https://images.unsplash.com/photo-1622445275983-93c608176d3b?w=400&h=300&fit=crop&auto=format`,
          alt: `${product.name} in ${product.colorway}`,
          isMain: true,
          order: 0,
        },
        {
          productId: product.id,
          url: `https://images.unsplash.com/photo-1622445275983-93c608176d3b?w=400&h=300&fit=crop&auto=format&sat=2`,
          alt: `${product.name} closeup in ${product.colorway}`,
          isMain: false,
          order: 1,
        },
      ],
    });

    console.log('🧶 Created product:', product.name);
  }

  // Create sample patterns
  const patterns = [
    {
      name: 'Cozy Cardigan',
      designer: 'Sarah Designer',
      description: 'A comfortable and versatile cardigan perfect for everyday wear. Worked in bulky yarn, this pattern knits up quickly.',
      difficultyLevel: SkillLevel.INTERMEDIATE,
      price: 8.00,
      isFree: false,
      patternType: PatternType.KNITTING,
      requiredYarnWeight: 'Bulky',
      requiredYarnAmount: '800-1200 yards',
      gauge: '3 sts per inch',
      needleSize: 'US 10.5 (6.5mm)',
      downloadUrl: '#',
      coverImageUrl: 'https://images.unsplash.com/photo-1610035849948-68385845e729?w=400&h=500&fit=crop&auto=format',
    },
    {
      name: 'Lace Shawl',
      designer: 'Emma Knits',
      description: 'An elegant lace shawl perfect for special occasions. The repetitive pattern is easy to memorize.',
      difficultyLevel: SkillLevel.ADVANCED,
      price: 0.00,
      isFree: true,
      patternType: PatternType.KNITTING,
      requiredYarnWeight: 'Lace',
      requiredYarnAmount: '400-600 yards',
      gauge: '7 sts per inch',
      needleSize: 'US 3 (3.25mm)',
      downloadUrl: '#',
      coverImageUrl: 'https://images.unsplash.com/photo-1584985052428-1a252c671e44?w=400&h=500&fit=crop&auto=format',
    },
    {
      name: 'Amigurumi Bear',
      designer: 'Crochet Creatures',
      description: 'A cute and cuddly bear perfect for gifts. Suitable for beginners with basic crochet knowledge.',
      difficultyLevel: SkillLevel.BEGINNER,
      price: 5.00,
      isFree: false,
      patternType: PatternType.CROCHETING,
      requiredYarnWeight: 'Worsted',
      requiredYarnAmount: '200 yards',
      gauge: '4 sts per inch',
      needleSize: 'US H (5mm)',
      downloadUrl: '#',
      coverImageUrl: 'https://images.unsplash.com/photo-1574376833295-1e0c8273a1a5?w=400&h=500&fit=crop&auto=format',
    },
  ];

  for (const patternData of patterns) {
    const pattern = await prisma.pattern.create({
      data: patternData,
    });

    // Add pattern images
    await prisma.patternImage.createMany({
      data: [
        {
          patternId: pattern.id,
          url: patternData.coverImageUrl,
          alt: `${pattern.name} by ${pattern.designer}`,
          order: 0,
        },
      ],
    });

    console.log('📄 Created pattern:', pattern.name);
  }

  // Create sample stash items for test user
  const stashItems = [
    {
      userId: testUser.id,
      productId: '1', // Merino Worsted
      customName: 'Special Blue Merino',
      quantity: 3,
      quantityUnit: 'SKEINS',
      purchaseDate: new Date('2024-01-15'),
      purchasePrice: 72.00,
      purchaseLocation: 'Local Yarn Store',
      storageLocation: 'Craft Room - Shelf A',
      dyeLot: 'A123',
      notes: 'Planning to use for a sweater. Beautiful blue color!',
    },
    {
      userId: testUser.id,
      customName: 'Hand-dyed Sock Yarn',
      quantity: 400,
      quantityUnit: 'YARDS',
      purchaseDate: new Date('2024-02-20'),
      purchasePrice: 25.00,
      purchaseLocation: 'Fiber Festival',
      storageLocation: 'Craft Room - Bin 2',
      notes: 'Indie dyer, variegated colors. Would make great socks.',
    },
  ];

  for (const stashData of stashItems) {
    const stashItem = await prisma.stashItem.create({
      data: stashData,
    });

    // Add stash item photos
    await prisma.stashItemPhoto.createMany({
      data: [
        {
          stashItemId: stashItem.id,
          url: 'https://images.unsplash.com/photo-1622445275983-93c608176d3b?w=300&h=300&fit=crop&auto=format',
          alt: stashItem.customName || 'Yarn stash item',
          order: 0,
        },
      ],
    });

    console.log('📦 Created stash item:', stashItem.customName || 'Custom yarn');
  }

  // Create sample projects for test user
  const projects = [
    {
      userId: testUser.id,
      patternId: '1', // Cozy Cardigan
      title: 'My First Cardigan',
      description: 'Working on my first adult-sized cardigan. The bulky yarn makes it knit up quickly!',
      status: ProjectStatus.IN_PROGRESS,
      startedAt: new Date('2024-02-01'),
      notes: 'Currently working on the body. So far it looks great!',
      modifications: 'Made the sleeves a bit longer than the pattern called for.',
      usedStashItems: ['1'],
      isPublic: true,
    },
    {
      userId: testUser.id,
      title: 'Baby Blanket for Friend',
      description: 'A simple baby blanket using the organic cotton DK. Perfect for a baby shower gift.',
      status: ProjectStatus.FINISHED,
      startedAt: new Date('2024-01-10'),
      finishedAt: new Date('2024-01-25'),
      notes: 'Used a simple basketweave pattern. Very soft and machine washable!',
      usedStashItems: [],
      isPublic: true,
    },
  ];

  for (const projectData of projects) {
    const project = await prisma.project.create({
      data: projectData,
    });

    // Add project photos
    await prisma.projectPhoto.createMany({
      data: [
        {
          projectId: project.id,
          url: 'https://images.unsplash.com/photo-1574376833295-1e0c8273a1a5?w=400&h=300&fit=crop&auto=format',
          alt: project.title,
          order: 0,
        },
      ],
    });

    console.log('🎨 Created project:', project.title);
  }

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });