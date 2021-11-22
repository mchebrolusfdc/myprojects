/** 

Student Name: Mounika Chebrolu
Subject: Algorithms and Data Structures Project

**/

import java.io.*;
import java.util.*;

public class encoding {

	public static void main(String[] args) throws IOException {
		int bit_length;
		bit_length = Integer.parseInt(args[1]); //bit_length as second argument in command line
		double MAX_TABLE_SIZE= Math.pow(2, bit_length);
		int table_size = 256;
		String inputfile, outputfile;
		inputfile = args[0]; //input filename as first argument in command line
		outputfile = inputfile.substring(0,inputfile.indexOf(".")) + ".lzw"; // output filename as per given requirement	

		//initializing table[0 t0 255] with code for individual characters using hashtable datastructure
		Hashtable<String, Integer> hashtable = new Hashtable<String, Integer>();
		{
			for(int i = 0; i <= 255; i++)
			{
				hashtable.put(Character.toString((char)i), i);
			}
		}
		String s = "";
		
		try{
			
		InputStreamReader isr = new InputStreamReader(new FileInputStream(inputfile));  // input file reader
		BufferedReader input = new BufferedReader(isr);
		OutputStreamWriter output = new OutputStreamWriter(new FileOutputStream(outputfile),"UTF-16BE"); //output file writer
		
		
		String str = input.readLine(); // read the data from the input file and store it in str		
		if(str!=null){	//check if the input data is not null
			for(int x=0; x<=str.length()-1; x++) // for loop executes till the data is present in the input file
			{
				char symbol = str.charAt(x);  //assigns each character in a string to symbol
				
				if (hashtable.containsKey(s+symbol)) {  // check if hash table contains the key for the string (s + symbol)
					s= s+symbol;
				}
				else {
					
					output.write(hashtable.get(s)); // write the key of s to output file
					if(table_size < MAX_TABLE_SIZE)	//check if the table size is less than max table size i.e. table is not full
					{
						hashtable.put(s+symbol,table_size++); //increment the size of hash table and insert the strings
						
					}
					s = Character.toString(symbol);

				}

			}

			output.write(hashtable.get(s)); //write the key of s to output file
			
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
