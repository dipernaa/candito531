const databaseName = 'candito_531';

const tables = {
  days: {
    name: 'days',
    select: (alias) => (
      `${alias}.id, ${alias}.email, ${alias}.first_name as firstName, ${alias}.last_name as lastName,
      ${alias}.created_on as createdOn, ${alias}.updated_on as updatedOn`
    )
  },
  lifts: {
    name: 'lifts',
    select: (alias) => (
      `${alias}.id, ${alias}.email, ${alias}.first_name as firstName, ${alias}.last_name as lastName,
      ${alias}.created_on as createdOn, ${alias}.updated_on as updatedOn`
    )
  },
  users: {
    name: 'users',
    select: (alias) => (
      `${alias}.id, ${alias}.email, ${alias}.first_name as firstName, ${alias}.last_name as lastName,
      ${alias}.created_on as createdOn, ${alias}.updated_on as updatedOn`
    )
  },
  weeks: {
    name: 'weeks',
    select: (alias) => (
      `${alias}.id, ${alias}.email, ${alias}.first_name as firstName, ${alias}.last_name as lastName,
      ${alias}.created_on as createdOn, ${alias}.updated_on as updatedOn`
    )
  }
};

const queries = {
  database: {
    create: `CREATE DATABASE ${databaseName}`,
    drop: `DROP DATABASE ${databaseName}`,
    use: `USE ${databaseName}`
  },
  tables: {
    days:
      `CREATE TABLE \`${databaseName}\`.\`${tables.days.name}\` (
        \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`week_id\` INT UNSIGNED NOT NULL,
        \`lift_id\` INT UNSIGNED NOT NULL,
        \`day_of_week\` INT UNSIGNED NOT NULL,
        \`created_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (\`week_id\`) REFERENCES \`${tables.weeks.name}\`(\`id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`lift_id\`) REFERENCES \`${tables.lifts.name}\`(\`id\`) ON DELETE CASCADE
      )`,
    lifts:
      `CREATE TABLE \`${databaseName}\`.\`${tables.lifts.name}\` (
        \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`user_id\` INT UNSIGNED NOT NULL,
        \`name\` VARCHAR(255) NOT NULL,
        \`modifier\` INT UNSIGNED,
        \`max\` DOUBLE UNSIGNED NOT NULL,
        \`created_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (\`user_id\`) REFERENCES \`${tables.users.name}\`(\`id\`) ON DELETE CASCADE
      )`,
    users:
      `CREATE TABLE \`${databaseName}\`.\`${tables.users.name}\` (
        \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`email\` VARCHAR(64) NOT NULL,
        \`first_name\` VARCHAR(64) NOT NULL,
        \`last_name\` VARCHAR(64) NOT NULL,
        \`password\` CHAR(60),
        \`created_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC)
      )`,
    weeks:
      `CREATE TABLE \`${databaseName}\`.\`${tables.weeks.name}\` (
        \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`number\` INT UNSIGNED NOT NULL,
        \`created_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_on\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      )`
  }
};

module.exports = {
  databaseName,
  queries,
  tables
};
