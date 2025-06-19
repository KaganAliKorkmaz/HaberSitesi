package com.example.demo.controller;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Haberler;
import com.example.demo.service.HaberlerService;
import com.example.demo.model.Duyurular;
import com.example.demo.service.DuyurularService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
    private HaberlerService haberlerService;
	
	@Autowired
    private DuyurularService duyurularService;
	
	
	
	@PostMapping("/haber")
	public ResponseEntity<Haberler> createNewsController(@RequestBody Haberler haber) {
	    Haberler h = haberlerService.CreateNews(
	        haber.getKonu(),
	        haber.getIçerik(),
	        haber.getGecerlilikTarihi(),
	        haber.getHaber_Linki()           );
	    
	    
	    
	    return ResponseEntity.ok(h);
	}
	
		
	@PostMapping("/duyuru")
	public ResponseEntity<?> createAnnouncementController(@RequestBody Duyurular duyuru) { 
		
		return ResponseEntity.ok(duyurularService.CreateAnnouncement(duyuru.getKonu(), duyuru.getIçerik(), duyuru.getGecerlilikTarihi(), duyuru.getImagePath()));
		
	}
	
	@DeleteMapping("/haber/{id}")
	public ResponseEntity<String> deleteHaberController(@PathVariable Long id) {
	    boolean success = haberlerService.deleteHaber(id);

	    if (success) {
	        return ResponseEntity.ok("Haber başarıyla silindi.");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Haber bulunamadı.");
	    }
	}
	
	@PutMapping("/duyuru/{id}")
	public ResponseEntity<Duyurular> updateAnnouncementController(
	        @PathVariable Long id,
	        @RequestBody Duyurular duyuru
	) {
	    Duyurular updated = duyurularService.updateDuyuru(id, duyuru);
	    if (updated != null) {
	        return ResponseEntity.ok(updated);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	
	@DeleteMapping("/duyuru/{id}")
	public ResponseEntity<String> deleteDuyuruController(@PathVariable Long id) {
	    boolean success = duyurularService.deleteDuyuru(id);

	    if (success) {
	        return ResponseEntity.ok("Haber başarıyla silindi.");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Haber bulunamadı.");
	    }
	}
	
	@PutMapping("/haber/{id}")
	public ResponseEntity<Haberler> updateNewsController(@PathVariable Long id, @RequestBody Haberler haber) {
	    Haberler updated = haberlerService.updateNews(id, haber);
	    if (updated != null) {
	        return ResponseEntity.ok(updated);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	
	
	
	
	
}
