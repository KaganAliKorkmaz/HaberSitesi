package com.example.demo.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Duyurular;
import com.example.demo.model.Etkinlik;
import com.example.demo.model.Haberler;
import com.example.demo.repository.EtkinlikRepository;
import com.example.demo.repository.HaberlerRepository;

@Service
public class EtkinlikService {
	private static final Logger log = LoggerFactory.getLogger(EtkinlikService.class);

	
	
	
	@Autowired
	private EtkinlikRepository etkinlikRepositoryRef;
	
	
	
	public List<Etkinlik> getAllEtkinlik(){
		
		return etkinlikRepositoryRef.findAll();
		
	}
	
	
	
	public List<Etkinlik> getAllEtkinlikbyTarih(LocalDate testdate,String tur){
			
		
		List<Etkinlik> newlist1 = etkinlikRepositoryRef.findAll();
		List<Etkinlik> haberlist1 = new ArrayList<>();	
		List<Etkinlik> duyurulist1 = new ArrayList<>();	

		for (Etkinlik etkinlik : newlist1) {
		
		if((etkinlik.getGecerlilikTarihi().isAfter(testdate))&& (etkinlik instanceof Haberler)) {
			
			haberlist1.add(etkinlik);
			
		}
		
		else if((etkinlik.getGecerlilikTarihi().isAfter(testdate))&& (etkinlik instanceof Duyurular)) {	
			duyurulist1.add(etkinlik);
		}
			
				
	}
	
		if(tur.equals("Haber")) {
			return haberlist1;
		}
		
		if(tur.equals("Duyuru")) {
			return duyurulist1;
		}
	
		
		return new ArrayList<>();
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
