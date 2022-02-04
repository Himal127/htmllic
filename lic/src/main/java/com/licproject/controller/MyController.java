package com.licproject.controller;

import java.util.Random;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.servlet.ModelAndView;


@Controller
public class MyController {
	
	@GetMapping("/linkpan")
	public String newAbout()
	{
		return "panlink";
	}
	@GetMapping("/panseeding")
	public String seeding() {
		return "seeding";
	}
	@GetMapping("/cap")
	public ModelAndView GenCap(Model model)
    {

        char data[]={'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'};
        char index[]=new char[6];
        String captcha = null;
        Random r=new Random();
        int i =0;

        for( i=0;i<(index.length);i++)
        {
            int ran=r.nextInt(data.length);
            index[i]=data[ran];
            captcha=String.valueOf(index);
        }
        System.out.println("captcha is "+captcha);
        
        model.addAttribute("captcha", captcha);
        return new ModelAndView("test.html");
        
    }
	 
	    
	}
	


