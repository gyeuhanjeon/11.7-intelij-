package com.ISOUR.ISOUR.servlet;

import java.io.*;

import javax.servlet.http.*;
import javax.servlet.ServletException;

import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;

import com.ISOUR.ISOUR.common.Common;
import com.ISOUR.ISOUR.dao.MemberDAO;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MemberRegServlet extends HttpServlet {
    @PostMapping("/MemberRegServlet")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 한글 깨짐 방지를 위해서 설정
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        // 요청 메시지 받기
        StringBuffer sb = Common.reqStringBuff(request);
        // 요청 받은 메시지 JSON 파싱
        JSONObject jsonObj = Common.getJsonObj(sb);

        // TeamAPI.js 에 작성해둔 memberReg : "memberObj" 를 가져온다.
        String getName = (String)jsonObj.get("name");
        String getId = (String)jsonObj.get("id");
        String getPwd = (String)jsonObj.get("pwd");
        String getBirth = (String)jsonObj.get("birth");
        String getAge = (String)jsonObj.get("age");
        String getGender = (String)jsonObj.get("gender");
        String getRegion1 = (String)jsonObj.get("region1");
        String getRegion2 = (String)jsonObj.get("region2");

        MemberDAO dao = new MemberDAO();
        boolean rstComplete = dao.memberRegister(getName, getId, getPwd, getBirth, getAge, getGender, getRegion1, getRegion2);

        PrintWriter out = response.getWriter();
        JSONObject resJson = new JSONObject();

//		System.out.println("여기까지 와라....Reg");

        if(rstComplete) resJson.put("result", "OK");
        else resJson.put("result", "NOK");
        out.print(resJson);
    }
}
