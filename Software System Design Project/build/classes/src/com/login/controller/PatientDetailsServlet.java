package com.login.controller;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import com.google.gson.Gson;
import com.login.bean.BookAppointmentBean;
import com.login.dao.LoginDao;
import com.login.dao.PatientDetailsDao;
import com.login.dao.RegisterDao;
import com.login.util.ConnectionData;
import com.login.util.IConnectionData;

public class PatientDetailsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public PatientDetailsServlet() {
		super();
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		IConnectionData connection = IConnectionData.getInstance("") ;
		PatientDetailsDao patientDetailsDao = new PatientDetailsDao(connection);
			
		JSONArray arrayObj = null;
		List<BookAppointmentBean> patientList = null;
		try {

			System.out.println("In Servlet class");

			patientList = patientDetailsDao.getPatientListFromDb();
			if (patientList != null && patientList.size() > 0) {
				System.out.println("Total Patient Records Fetch From Db Are= " + patientList.size());
			} else {
				System.out.println("No Patient Records Are Present In Db");
			}

			arrayObj = new JSONArray(patientList);
			String jObj = new Gson().toJson(arrayObj);
			System.out.println(jObj);

			/***** Preparing The Output Response *****/
			response.setContentType("text/html");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jObj);

		} catch (IOException ex) {
			ex.printStackTrace();
		}

	}

}
