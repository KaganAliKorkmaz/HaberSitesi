package com.example.demo.service;

import com.example.demo.model.Duyurular;
import com.example.demo.config.*;
import com.example.demo.repository.DuyurularRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class DuyurularService {

	private static final Logger log = LoggerFactory.getLogger(DuyurularService.class);

	
	@Autowired
	private DuyurularRepository DuyurularRepositoryRef;
	@Autowired
	private SimpMessagingTemplate simpMessageRef;
	
	
	
	public Duyurular CreateAnnouncement(String konu, String icerik, LocalDate GTarihi,String imagePath) {
			Duyurular duyurularref = new Duyurular();
			duyurularref.setImagePath(imagePath);
			duyurularref.setGecerlilikTarihi(GTarihi);
			duyurularref.setIçerik(icerik);
			duyurularref.setKonu(konu);
			DuyurularRepositoryRef.save(duyurularref);
	        simpMessageRef.convertAndSend("/topic/duyurular", duyurularref);
			return duyurularref;
		}
	
	
	public List<Duyurular> getAllDuyurular(){
		
		return DuyurularRepositoryRef.findAll();
		
	}

	
	public Optional<Duyurular> getDuyuruById(Long id){ 
		return DuyurularRepositoryRef.findById(id);
		
	}
	
	public Duyurular updateDuyuru(Long id, Duyurular dto) {
        return DuyurularRepositoryRef.findById(id)
            .map(existing -> {
                existing.setKonu(dto.getKonu());
                existing.setIçerik(dto.getIçerik());
                existing.setGecerlilikTarihi(dto.getGecerlilikTarihi());
                existing.setImagePath(dto.getImagePath());
                return DuyurularRepositoryRef.save(existing);
            })
            .orElse(null);
    }
	
	 public boolean deleteDuyuru(Long id) {
		    if (DuyurularRepositoryRef.existsById(id)) {
		        DuyurularRepositoryRef.deleteById(id);
		        log.info("Duyuru silindi: ID {}", id);
		        return true;
		    } else {
		        log.info("Silinecek duyuru bulunamadı: ID {}", id);
		        return false;
		    }
		}
	
	public List<Duyurular> searchByBaslik(String baslik) {
        return DuyurularRepositoryRef.findByKonuContainingIgnoreCase(baslik);
    }

    public List<Duyurular> getAllDuyurularOrderByDateDesc() {
        return DuyurularRepositoryRef.findAllByOrderByGecerlilikTarihiDesc();
    }

    public List<Duyurular> getAllDuyurularOrderByBaslikAsc() {
        return DuyurularRepositoryRef.findAllByOrderByKonuAsc();
    }

    public List<Duyurular> searchByKonu(String konu) {
        return DuyurularRepositoryRef.findByKonuContainingIgnoreCase(konu);
    }

    public List<Duyurular> getAllDuyurularOrderByKonuAsc() {
        return DuyurularRepositoryRef.findAllByOrderByKonuAsc();
    }
}
	