module.exports = {
  createTable:`create table space_war_ranking(
    ranking_id serial not null ,
      name char(12) default 'Anonymous',
      message varchar(255),
      score int not null,    
      primary key(ranking_id)
  );`,

  dropTable:`drop table if exists space_war_ranking`,
  dummyData : {
    text : 'insert into space_war_ranking(name, message, score) values($1,$2,$3)',
    values : ['hello', 'hi, nice to meet you', 54]
  }
}