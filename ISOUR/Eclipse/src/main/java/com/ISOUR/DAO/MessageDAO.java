package com.ISOUR.DAO;

import java.sql.*;
//import java.sql.Date;

import java.util.*;

import com.ISOUR.Common.Common;
import com.ISOUR.VO.*;

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
				String name = rs.getString("NAME");
				String content = rs.getString("CONTENT");
				String datetime = rs.getString("DATETIME");
				
				MessageVO vo = new MessageVO();  // 각 정보를 저장할 수 있는 객체 생성.
				vo.setName(name);
				vo.setContent(content);
				vo.setDatetime(datetime);
				
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
		
}
