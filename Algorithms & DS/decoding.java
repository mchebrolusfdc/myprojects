/** 

Student Name: Mounika Chebrolu
Subject: Algorithms and Data Structures- Project

**/

import java.io.*;
import java.util.*;

public class decoding {
	public static void main(String[] args) throws IOException {
		
		int bit_length, table_size = 256;
		bit_length = Integer.parseInt(args[1]); //bit_length as second argument in command line
		double MAX_TABLE_SIZE = Math.pow(2, bit_length); 
		
		String inputfile, outputfile;
		inputfile = args[0]; //input filename as first argument in command line 
		outputfile = inputfile.substring(0,inputfile.indexOf(".")) + "_decoded.txt"; // output filename as per given requirement	
		
		//initializing table[0 t0 255] with code for individual characters using hashtable datastructure
		Hashtable<Integer, String> hashtable = new Hashtable<Integer, String>();{
			
		  for(int i = 0; i <= 255; i++){
				hashtable.put(i, Character.toString((char)i));
			}
		
		}
		
		try {
		
		InputStreamReader input = new InputStreamReader(new FileInputStream(inputfile), "UTF-16BE"); // input file reader
		OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(outputfile));
		BufferedWriter output = new BufferedWriter(osw); //output file writer
		
		int code = input.read(); //read the code from the input file
		String s = hashtable.get(code); //get key for the code from the hash table and assign it to s
		output.write(s); // write the output to the output file
		String new_string;
		
		while ((code = input.read())!= -1) { //check if the input file is not null, read() method returns -1 if there are no values i.e. null
			
			boolean table= hashtable.containsKey(code); // check if the hash table contains key of the code
			if(!table){	
    			new_string = s + s.substring(0,1); 
    		}
			else{
				new_string = hashtable.get(code); ////get key for the code from the hash table and assign it to new_string
			}
			
			output.write(new_string);
			
			if(table_size < MAX_TABLE_SIZE){ //check if the table size is less than max table size i.e. table is not full
				hashtable.put(table_size++, s + new_string.substring(0,1)); //increment the size of hash table and insert the strings
			}
			s = new_string;
			
		}
			input.close();
			output.close();		
		}
		catch(FileNotFoundException fne){     
			System.out.println("Input file not found");
			fne.printStackTrace();            
		}	
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}
		
		
		
		
		
	
