export default (pgPool) => ({
  getPokemon: (trainer_id) => {
    if (trainer_id) {
      return pgPool.query(`
        select * from pokemon where trainer_id = ${trainer_id}
      `)
      .then(res => res.rows);
    }
    return pgPool.query(`
      select * from pokemon
    `).then(res => res.rows);
  },
  getTrainers: (id) => {
    if (id) {
      return pgPool.query(`
        select * from trainers where id = ${id}
      `)
      .then(res => res.rows);
    }
    return pgPool.query(`
      select * from trainers
    `).then(res => res.rows);
  },
});
