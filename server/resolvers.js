export default (pgPool) => ({
  getPokemon: (trainerId) => {
    if (trainerId) {
      return pgPool.query(`
        select * from pokemon where trainer_id = ${trainerId}
      `)
      .then(res => res.rows);
    }
    return pgPool.query(`
      select * from pokemon
    `).then(res => res.rows);
  },
  getTrainers: (firstName) => {
    if (firstName) {
      return pgPool.query(`
        select * from trainers where first_name = '${firstName}'
      `)
      .then(res => res.rows);
    }
    return pgPool.query(`
      select * from trainers
    `).then(res => res.rows);
  },
  getTrainerById: (id) => {
    return pgPool.query(`
      select * from trainers where id = '${id}'
    `).then(res => res.rows[0]);
  },
  getBattles: (losingTrainer) => {
    if (losingTrainer) {
      return pgPool.query(`
        select * from battles where losing_trainer = ${losingTrainer}
      `)
      .then(res => res.rows);
    }
    return pgPool.query(`
      select * from battles
    `).then(res => res.rows);
  },
});
