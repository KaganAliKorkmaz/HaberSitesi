package com.example.demo.model;



import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity                  
@DiscriminatorValue("DUYURU")
public class Duyurular extends Etkinlik{
	private static final long serialVersionUID = 1L;


	  private String imagePath;
	                                             
	    public String getImagePath() {         
	    	return imagePath;                     
	    }                                        
	                                             
	                                             	  
	    public void setImagePath(String name) {
	    	this.imagePath=name;                  
	    	                                        
	    }         
	    
	    
}                                                
