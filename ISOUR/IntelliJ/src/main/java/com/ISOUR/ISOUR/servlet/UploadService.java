package com.ISOUR.ISOUR.servlet;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UploadService extends HttpServlet {

    private static final String UPLOAD_DIR = "IMGfolder";
    @PostMapping("/UploadService")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, UnsupportedEncodingException, ServletException {
        // 한글 깨짐 방지를 위해서 설정
        request.setCharacterEncoding("utf-8");

        // 서버의 실제 경로
        String applicationPath = request.getServletContext().getRealPath("");
//		String applicationPath = "UploadImg/";
        String uploadFilePath = applicationPath + UPLOAD_DIR;

        System.out.println(" LOG :: [서버 루트 경로] :: " + applicationPath);
        System.out.println(" LOG :: [파일 저장 경로] :: " + uploadFilePath);

        // creates the save directory if it does not exists
        File fileSaveDir = new File(uploadFilePath);

        // 파일 경로 없으면 생성
        if (!fileSaveDir.exists()) {
            fileSaveDir.mkdirs();
        }

        String fileName = null;
        //Get all the parts from request and write it to the file on server
        for (Part part : request.getParts()) {
            getPartConfig(part);
            fileName = getFileName(part);
            System.out.println(" LOG :: [ 업로드 파일 경로 ] :: " + uploadFilePath + File.separator + fileName);
            part.write(uploadFilePath + File.separator + fileName);
        }
        request.setAttribute("fileName", fileName);
        getServletContext().getRequestDispatcher("/response.jsp").forward(request, response);
    } // doPost 의 끝

    private void getPartConfig(Part part) {
        System.out.println("------------------------------------------------------------");
        System.out.println(" LOG :: [HTML태그의 폼태그 이름] :: " + part.getName());
        System.out.println(" LOG :: [ 파일 사이즈 ] :: " + part.getSize());
        for(String name : part.getHeaderNames()) {
            System.out.println(" LOG :: HeaderName :: " + name + ", HeaderValue :: " + part.getHeader(name) + "\n");
        }
        System.out.println("------------------------------------------------------------");
    } // getPartConfig 의 끝

    private String getFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        System.out.println(" LOG :: content-disposition 헤더 :: = " + contentDisp);
        String[] tokens = contentDisp.split(";");
        for (String token : tokens) {
            if (token.trim().startsWith("filename")) {
                System.out.println(" LOG :: 파일 이름 :: " + token);
                return token.substring(token.indexOf("=") + 2, token.length()-1);
            }
        }
        return "";
    } // getFileName 의 끝

}
