import Database from '../index.js';
import seedUsers from './20250603134040-demo-user.cjs';
import seedGroups from './20250603130634-demo-group.cjs';
import seedGroupParticipants from './20250603130640-demo-group-participant.cjs';
import seedAccounts from './20250604143311-demo-accounts.cjs';
import seedInstitutions from './20250604143246-demo-institutions.cjs';
import seedExpenses from './20250616132132-expenses.cjs';
const allSeeds = [
  seedUsers,
  seedInstitutions,
  seedAccounts,
  seedGroups,
  seedGroupParticipants,
  seedExpenses
];

const reverseSeeds = [...allSeeds].reverse();

async function runSeeds() {
  const queryInterface = Database.getQueryInterface();

  try {
    for (const seed of allSeeds) {
      await seed.up(queryInterface);
      console.log(`Seed ${seed.name || seed.toString()} executed`);
    }
    console.log('All seeds executed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

async function undoSeeds() {
  const queryInterface = Database.getQueryInterface();

  try {
    for (const seed of reverseSeeds) {
      await seed.down(queryInterface);
      console.log(`Seed ${seed.name || seed.toString()} reverted`);
    }
    console.log('All seeds reverted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed revert error:', error);
    process.exit(1);
  }
}

const command = process.argv[2];

if (command === '--undo' || command === '-u') {
  undoSeeds();
} else {
  runSeeds();
}
