package com.ISOUR.ISOUR.servlet;

import java.io.*;

import javax.servlet.http.*;
import javax.servlet.ServletException;

import org.json.simple.JSONObject;

import com.ISOUR.ISOUR.common.Common;
import com.ISOUR.ISOUR.dao.MemberDAO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TestServlet extends HttpServlet{
    @PostMapping("/TestServlet")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 한글 깨짐 방지를 위해서 설정
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        // 요청 메시지 받기
        StringBuffer sb = Common.reqStringBuff(request);
        // 요청 받은 메시지 JSON 파싱
        JSONObject jsonObj = Common.getJsonObj(sb);

        // TeamAPI.js 에 작성해둔 mbtiReg : "resultObj" 를 가져온다.
        String getMbti = (String)jsonObj.get("mbti");
        String getId = (String)jsonObj.get("id");

        MemberDAO dao = new MemberDAO();
        boolean rstComplete = dao.mbtiRegister(getMbti, getId);

        PrintWriter out = response.getWriter();
        JSONObject resJson = new JSONObject();

//		System.out.println("여기까지 와라....Reg");

        if(rstComplete) resJson.put("result", "OK");
        else resJson.put("result", "NOK");
        out.print(resJson);
    }
}
