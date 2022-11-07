package com.ISOUR.ISOUR.dao;

import java.sql.*;
import java.util.*;

import com.ISOUR.ISOUR.common.Common;
import com.ISOUR.ISOUR.vo.MessageVO;
public class MessageDAO {
    private Connection conn = null;
    private Statement stmt = null; //표준 SQL문을 수행하기 위한 Statement 객체 얻기
    private ResultSet rs = null; // Statement의 수행 결과를 여러행으로 받음
    // SQL문을 미리 컴파일해서 재 사용하므로 Statement 인터페이스보다 훨씬 빨르게 데이터베이스 작업을 수행
    private PreparedStatement pstmt = null;

    // 내 쪽지함 보기
    public List<MessageVO> messageList(String reqId) {
        List<MessageVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM " + reqId;

            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                // getString() 안에 테이블의 컬럼명과 동일하게 입력해야 함
                String id = rs.getString("ID");
                String title = rs.getString("TITLE");
                String content = rs.getString("CONTENT");
                String datetime = rs.getString("DATETIME");

                System.out.println(title);

                MessageVO vo = new MessageVO();  // 각 정보를 저장할 수 있는 객체 생성.
                vo.setId(id);
                vo.setTitle(title);
                vo.setContent(content);
                vo.setDatetime(datetime);

                System.out.println(title);

                list.add(vo);  // 받은 정보를 list로 저장.
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);

        } catch(Exception e) {
            e.printStackTrace();	// 어디서 오류가 발생했는지 뿌려줌.
        }
        return list;
    }

    // 쪽지 보내기
    public boolean mbtiRegister(String id, String receiverId, String title, String content) {
        int result = 0;
        // 테이블 컬럼명이랑 똑같이
        String insertSQL = "INSERT INTO " + receiverId + " (ID, TITLE, CONTENT) VALUES(?, ?, ?)";

        try {
            conn = Common.getConnection();
            pstmt = conn.prepareStatement(insertSQL);
            pstmt.setString(1, id);
            pstmt.setString(1, title);
            pstmt.setString(2, content);

            result = pstmt.executeUpdate();
            System.out.println("쪽지 보내기 DB 등록 확인 : " + result);

        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(pstmt);
        Common.close(conn);

        if(result == 1) return true;
        else return false;
    }

}
