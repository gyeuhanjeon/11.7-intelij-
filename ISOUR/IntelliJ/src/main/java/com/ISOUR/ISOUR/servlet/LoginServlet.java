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
public class LoginServlet extends HttpServlet {
    @PostMapping("/LoginServlet")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 한글 깨짐 방지를 위해서 설정
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("utf-8");
        // 요청 메시지 받기
        StringBuffer sb = Common.reqStringBuff(request);
        // 요청 받은 메시지 JSON 파싱
        JSONObject jsonObj = Common.getJsonObj(sb);

        String getId = (String)jsonObj.get("id");
        String getPwd = (String)jsonObj.get("pwd");

        System.out.println(getId);
        System.out.println(getPwd);

        MemberDAO dao = new MemberDAO();
        boolean isRegister = dao.loginCheck(getId, getPwd);

        PrintWriter out = response.getWriter();
        JSONObject resJson = new JSONObject();
        if(isRegister) resJson.put("result", "OK");
        else resJson.put("result", "NOK");
        out.print(resJson);

    }
}
