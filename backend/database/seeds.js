const User = require('../models/User');

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // Create sample users
    const sampleUsers = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'AdminPass123'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'JohnPass123'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'JanePass123'
      }
    ];

    for (const userData of sampleUsers) {
      try {
        await User.create(userData);
        console.log(`✅ Created user: ${userData.email}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  User already exists: ${userData.email}`);
        } else {
          console.error(`❌ Error creating user ${userData.email}:`, error.message);
        }
      }
    }

    console.log('🎉 Database seeding completed!');
    console.log('\n📋 Sample login credentials:');
    console.log('Email: admin@example.com | Password: AdminPass123');
    console.log('Email: john@example.com  | Password: JohnPass123');
    console.log('Email: jane@example.com  | Password: JanePass123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;