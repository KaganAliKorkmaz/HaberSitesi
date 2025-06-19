package com.example.demo.service;

import com.example.demo.model.Haberler;
import com.example.demo.repository.HaberlerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class HaberlerService {

	private static final Logger log = LoggerFactory.getLogger(HaberlerService.class);

	
	@Autowired
	private HaberlerRepository haberlerRepositoryRef;
	
	
	
	public Haberler CreateNews(String konu, String icerik, LocalDate GTarihi,String haberlinki) {
			Haberler haberlerref = new Haberler();
			haberlerref.setHaber_Linki(haberlinki);
			haberlerref.setGecerlilikTarihi(GTarihi);
			haberlerref.setIçerik(icerik);
			haberlerref.setKonu(konu);
			haberlerRepositoryRef.save(haberlerref);
			return haberlerref;
		}
	
	
	public List<Haberler> getAllHaberler(){
		
		return haberlerRepositoryRef.findAll();
		
	}

	
	public Optional<Haberler> getHaberById(Long id){ 
		return haberlerRepositoryRef.findById(id);
		
	}
	
	 public boolean deleteHaber(Long id) {
		    if (haberlerRepositoryRef.existsById(id)) {
		        haberlerRepositoryRef.deleteById(id);
		        log.info("Haber silindi: ID {}", id);
		        return true;
		    } else {
		        log.info("Silinecek haber bulunamadı: ID {}", id);
		        return false;
		    }
		}
	
	public List<Haberler> searchByBaslik(String baslik) {
        return haberlerRepositoryRef.findByKonuContainingIgnoreCase(baslik);
    }

    public List<Haberler> getAllHaberlerOrderByDateDesc() {
        return haberlerRepositoryRef.findAllByOrderByGecerlilikTarihiDesc();
    }

    public List<Haberler> getAllHaberlerOrderByBaslikAsc() {
        return haberlerRepositoryRef.findAllByOrderByKonuAsc();
    }

    public Haberler updateNews(Long id, Haberler haber) {
        Optional<Haberler> existing = haberlerRepositoryRef.findById(id);
        if (existing.isPresent()) {
            Haberler h = existing.get();
            h.setKonu(haber.getKonu());
            h.setIçerik(haber.getIçerik());
            h.setGecerlilikTarihi(haber.getGecerlilikTarihi());
            h.setHaber_Linki(haber.getHaber_Linki());
            return haberlerRepositoryRef.save(h);
        }
        return null;
    }
}
	