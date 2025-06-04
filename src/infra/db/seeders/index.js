import Database from '../index.js';
import seedUsers from './20250603134040-demo-user.cjs';
import seedGroups from './20250603130634-demo-group.cjs';
import seedGroupParticipants from './20250603130640-demo-group-participant.cjs';
import seedAccounts from './20250604143311-demo-accounts.cjs';
import seedInstitutions from './20250604143246-demo-institutions.cjs';

async function runAllSeeds() {
  const queryInterface = Database.getQueryInterface();

  try {
    await seedUsers.up(queryInterface);
    await seedAccounts.up(queryInterface);
    await seedGroups.up(queryInterface);
    await seedGroupParticipants.up(queryInterface);
    await seedInstitutions.up(queryInterface);

    console.log('All seeds executed successfully!');
  } catch (error) {
    console.error('Error running seeds:', error);
  } finally {
    process.exit(0);
  }
}

runAllSeeds();
