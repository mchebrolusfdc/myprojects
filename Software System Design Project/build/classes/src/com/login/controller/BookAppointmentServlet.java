package com.login.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.google.gson.Gson;
import com.login.bean.BookAppointmentBean;
import com.login.bean.DoctorDetailsBean;
import com.login.bean.RegisterBean;
import com.login.dao.AdminSlotDao;
import com.login.dao.BookAppointmentDao;
import com.login.dao.LoginDao;
import com.login.dao.PatientDetailsDao;
import com.login.util.DateConvert;
import com.login.util.IConnectionData;
import com.login.controller.LoginServlet;

public class BookAppointmentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public BookAppointmentServlet() {
		super();
		System.out.println("In Booking Servlet");

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		Object obj = request.getSession().getAttribute("fullName");

		// request.getAttribute("firstName");

		System.out.println("Displaying value in object" + obj);

		String patientName = (String) obj;
		String doctorName = request.getParameter("dcsource");
		String speciality = request.getParameter("doctorssource");
		String Appointment_Date = request.getParameter("Appointment_Date");
		String Appointment_Time = request.getParameter("Appointment_Time");
		System.out.println(Appointment_Time);
		String Problem_Description = request.getParameter("Problem_Description");
		String Comments = request.getParameter("Comments");

		System.out.println(doctorName);
		System.out.println(speciality);
		System.out.println("New Date" + Appointment_Date);
		System.out.println(Appointment_Time);
		System.out.println(patientName);

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.US);

		LocalDate date = LocalDate.parse(Appointment_Date, formatter);

		// LocalTime lt = LocalTime.parse(Appointment_Time,formatter);

		// Time AppointmentTime = java.sql.Time.valueOf(Appointment_Time);

		SimpleDateFormat formatter1 = new SimpleDateFormat("hh:mm");
		try {

			java.util.Date d = formatter1.parse(Appointment_Time);

			System.out.println("Extracted java.util time " + d);

			// java.sql.Time sqlTime =lt;

			java.sql.Time sqlTime = new java.sql.Time(d.getTime());

			System.out.println("New time after" + sqlTime);

			// java.sql.Time d = new java.sql.Time(sdf.parse(s).getTime());

			System.out.println("Converted date value " + date);

			// System.out.println("Extracted time "+AppointmentTime);

			DateConvert dateConvert = new DateConvert();
			java.util.Date AppointmentDate = dateConvert.convertToDateViaInstant(date);

			System.out.println(doctorName);
			System.out.println(speciality);
			System.out.println(AppointmentDate);
			System.out.println(sqlTime);
			System.out.println(Problem_Description);
			System.out.println(Comments);
			System.out.println(patientName);

			System.out.println("In Booking servlet.. About to set values");

			BookAppointmentBean bookAppointmentBean = new BookAppointmentBean();

			bookAppointmentBean.setDoctorName(doctorName);
			bookAppointmentBean.setPatientName(patientName);
			bookAppointmentBean.setAppointment_Date(AppointmentDate);
			bookAppointmentBean.setAppointment_Time(sqlTime);
			bookAppointmentBean.setSpecialist(speciality);
			bookAppointmentBean.setProblem_Description(Problem_Description);
			bookAppointmentBean.setComments(Comments);

			//BookAppointmentDao bookAppointmentDao = new BookAppointmentDao();

			
			IConnectionData connection = IConnectionData.getInstance("") ;
			BookAppointmentDao bookAppointmentDao = new BookAppointmentDao(connection);
			
			// The core Logic of the Registration application is present here. We are going
			// to insert user data in to the database.
			String userBookedStatus = bookAppointmentDao.bookAppointment(bookAppointmentBean);
			
			AdminSlotDao adminSlotDao = new AdminSlotDao(connection);
			
			String result = adminSlotDao.updateSlot(bookAppointmentBean);
			System.out.println(result);
			System.out.println(userBookedStatus);

			/**** Preparing The Output Response ****/
			response.setContentType("text/html");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			out.write(userBookedStatus);

		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
