DROP TABLE I_MEMBER;

DROP TABLE kongdole1;
DROP TABLE kongdole2;
DROP TABLE gyeurok;


SELECT * FROM I_MEMBER;
SELECT * FROM admin;
SELECT * FROM kongdole1;

SELECT * FROM kongdole;
COMMIT;

CREATE TABLE I_MEMBER (
    NAME        VARCHAR2(30),
    ID          VARCHAR2(30) PRIMARY KEY,
    PASSWORD    VARCHAR2(30),
    BIRTH       VARCHAR2(30),
    AGE         VARCHAR2(10),
    GENDER      VARCHAR2(10),
    REGION1     VARCHAR2(30),
    REGION2     VARCHAR2(30),
    MBTI        VARCHAR2(30)
);

CREATE TABLE 【 (
    NAME        VARCHAR2(30),
    CONTENT     VARCHAR2(30),
    DATETIME    VARCHAR2(50) DEFAULT TO_CHAR(SYSDATE, 'yyyy-mm-dd hh24:mi:ss')
);

INSERT INTO I_MEMBER VALUES('嬢球肯', 'admin', 'admin1234', '1971-05-08', '52', '食切', '採至韻蝕獣', '背錘企姥', '');
INSERT INTO I_MEMBER VALUES('戚巨醤', 'dleldi', 'dleldi88', '2000-06-06', '22', '害切', '企姥韻蝕獣', '呪失姥', ''); 
INSERT INTO I_MEMBER VALUES('奄推耕', 'rldyal', 'rldyal59', '1997-06-25', '25', '食切', '辞随働紺獣', '亀裟姥', ''); 

DELETE FROM I_MEMBER WHERE NAME = '嬢球肯';


UPDATE I_MEMBER SET MBTI = 'ESTJ' WHERE ID = 'admin';

--(SYSDATE, 'yyyy-mm-dd hh24:mi:ss')

INSERT INTO kongdole1 (ID, TITLE, CONTENT) VALUES ('kongdole2','ささささ叔蝿さささささささささ', '越 鎧遂戚陥 楕走研 左鎧左切.');
DELETE FROM kongdole1 WHERE ID = 'admin' AND DATETIME ='2022-11-05 13:40:47';
SELECT * FROM kongdole1;
SELECT * FROM kongdole2;
SELECT * FROM I_MEMBER;
