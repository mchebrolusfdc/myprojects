package com.login.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.google.gson.Gson;
import com.login.bean.DoctorDetailsBean;
import com.login.dao.DoctorDetailsDao;


public class DoctorNamesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public DoctorNamesServlet() {
        super();
      
    }
public void doGET(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
{
	JSONArray arrayObj = null;
	List<DoctorDetailsBean> doctorList = null;
	try {
		
		System.out.println("In Servlet class");

		doctorList = DoctorDetailsDao.getDoctorNames();
		if(doctorList != null && doctorList.size() > 0) {				
			System.out.println("Total Patient Records Fetch From Db Are= " + doctorList.size());
		} 
		else {
			System.out.println("No Patient Records Are Present In Db");
		}

		arrayObj = new JSONArray(doctorList);
		String doctorNamesList = new Gson().toJson(arrayObj);
		System.out.println(doctorNamesList);

		/***** Preparing The Output Response *****/
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(doctorNamesList);
		
	} catch (IOException ex) {
		ex.printStackTrace();
	}	
	


	}

}
