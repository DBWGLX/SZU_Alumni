CREATE TABLE user
(
    id int(10) identity NOT NULL,
    user_name VARCHAR2(50) NOT NULL,
    PRIMARY KEY(id),
    pass_word varchar2(50) not null
);