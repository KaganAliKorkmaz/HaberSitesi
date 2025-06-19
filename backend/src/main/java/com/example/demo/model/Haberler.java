package com.example.demo.model;




import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;



@Entity
@DiscriminatorValue("HABER")
public class Haberler extends Etkinlik {

	private static final long serialVersionUID = 1L;

    private String Haber_Linki;
    
    public String getHaber_Linki() {
    	return Haber_Linki;
    }
    
    
    public void setHaber_Linki(String name) {
    	this.Haber_Linki=name; 
    	
    }
    
 
}
