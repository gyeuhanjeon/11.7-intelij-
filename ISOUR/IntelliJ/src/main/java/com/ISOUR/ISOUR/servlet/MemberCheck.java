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
public class MemberCheck extends HttpServlet {
    @PostMapping("/MemberCheck")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 한글 깨짐 방지를 위해서 설정
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        // 요청 메시지 받기
        StringBuffer sb = Common.reqStringBuff(request);
        // 요청 받은 메시지 JSON 파싱
        JSONObject jsonObj = Common.getJsonObj(sb);

        // TeamAPI.js 에 작성해둔 memberRegCheck : "regCheck" 를 가져온다.
        String getId = (String)jsonObj.get("id");

        System.out.println("입력한 ID : " + getId);

        MemberDAO dao = new MemberDAO();
        boolean isNotReg = dao.regIdCheck(getId);  // isNotReg = true 가입되어있지 않다.

        PrintWriter out = response.getWriter();
        JSONObject resJson = new JSONObject();
        if(isNotReg) resJson.put("result", true); // 이미가입되어 있다.
        else resJson.put("result", false); // 가입할 수 있다.
        out.print(resJson);
    }
}
