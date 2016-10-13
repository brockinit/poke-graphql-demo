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
});
