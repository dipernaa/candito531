const bcrypt = require('bcrypt');
const { tables } = require('../schema');
const { query } = require('../../server/utils/database');
const {
  days,
  lifts,
  users,
  weeks
} = require('./data');

//  0   1   2   3   4   5   6
// sun mon tue wed thr fri sat
const squatDays = [2];
const benchDays = [1, 4, 6];
const deadliftDays = [5];

const queries = {
  insert: {
    day:
      `INSERT INTO ${tables.days.name}
      (\`week_id\`, \`lift_id\`, \`day_of_week\`)
      VALUES (?, ?, ?)`,
    lift:
      `INSERT INTO ${tables.lifts.name}
      (\`user_id\`, \`name\`, \`modifier\`, \`max\`)
      VALUES (?, ?, ?, ?)`,
    user:
      `INSERT INTO ${tables.users.name}
      (\`email\`, \`first_name\`, \`last_name\`, \`password\`)
      VALUES (?, ?, ?, ?)`,
    week:
      `INSERT INTO ${tables.weeks.name}
      (\`number\`)
      VALUES (?)`,
  }
};

const seedDatabase = (connection) => {
  let squatId, benchId, deadliftId;
  const userPromises = users.map((currentUser) => (
    bcrypt.hash(currentUser.password, 10)
      .then((hashedPassword) => (
        query(connection, {
          sql: queries.insert.user,
          values: [currentUser.email, currentUser.firstName, currentUser.lastName, hashedPassword]
        })
          .then((userInsertResult) => {
            lifts.map((currentLift) => (
              query(connection, {
                sql: queries.insert.lift,
                values: [userInsertResult.insertId, currentLift.name, currentLift.modifier, currentUser[`${currentLift.name}Max`]]
              })
                .then((liftInsertResult) => {
                  if (currentLift.name === 'squat') {
                    squatId = liftInsertResult.insertId;
                  } else if (currentLift.name === 'bench') {
                    benchId = liftInsertResult.insertId;
                  } else if (currentLift.name === 'deadlift') {
                    deadliftId = liftInsertResult.insertId;
                  }
                })
            ))
          })
      ))
    ));

  return Promise.all(userPromises)
    .then(() => {
      const weekPromises = weeks.map((currentWeek) =>(
        query(connection, {
          sql: queries.insert.week,
          values: [currentWeek.number]
        })
          .then((weekInsertResult) => (
            days.map((currentDay) => {
              let liftId;
              if (squatDays.indexOf(currentDay.dayOfWeek) > -1) {
                liftId = squatId;
              } else if (benchDays.indexOf(currentDay.dayOfWeek) > -1) {
                if (currentDay.dayOfWeek > 4) {
                  if (currentWeek.number < 3) {
                    liftId = benchId;
                  }
                } else {
                  liftId = benchId;
                }
              } else if (deadliftDays.indexOf(currentDay.dayOfWeek) > -1) {
                liftId = deadliftId;
              }

              if (!liftId) {
                return Promise.resolve();
              }

              return query(connection, {
                sql: queries.insert.day,
                values: [weekInsertResult.insertId, liftId, currentDay.dayOfWeek]
              })
            })
          ))
      ));

      return Promise.all(weekPromises);
    })
    .then(() => {
      console.log('database successfully seeded');
    });
};

module.exports = seedDatabase;
