package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.model.Haberler;
import com.example.demo.model.User;
import com.example.demo.model.Duyurular;
import com.example.demo.service.HaberlerService;
import com.example.demo.service.UserService;
import com.example.demo.service.DuyurularService;
import com.example.demo.dto.LoginRequest;


		@RestController
		@RequestMapping("/User")
		public class UserController {

	@Autowired
    private HaberlerService haberlerService;

	@Autowired
    private UserService userService;

	@Autowired
    private DuyurularService duyurularService;

	@GetMapping("/haberler")
	public ResponseEntity<List<Haberler>> getAllHaberler() {
		List<Haberler> haberler = haberlerService.getAllHaberler();
    	return ResponseEntity.ok(haberler);
}
	
	
	@GetMapping("/haberler/arama")
	public ResponseEntity<List<Haberler>> searchHaberByBaslik(@RequestParam("baslik") String baslik) {
    	List<Haberler> sonuc = haberlerService.searchByBaslik(baslik);
   		return ResponseEntity.ok(sonuc);
}
	
	
	
	@GetMapping("/haberler/sirala/tarih")
	public ResponseEntity<List<Haberler>> getHaberlerByDateDesc() {
   		List<Haberler> siraliHaberler = haberlerService.getAllHaberlerOrderByDateDesc();
    	return ResponseEntity.ok(siraliHaberler);
}
	
	
	@GetMapping("/haberler/sirala/baslik")
	public ResponseEntity<List<Haberler>> getHaberlerByBaslikAsc() {
    	List<Haberler> siraliHaberler = haberlerService.getAllHaberlerOrderByBaslikAsc();
    	return ResponseEntity.ok(siraliHaberler);
}

	@GetMapping("/duyurular")
	public ResponseEntity<List<Duyurular>> getAllDuyurular() {
		 List<Duyurular> duyurular = duyurularService.getAllDuyurular();
		return ResponseEntity.ok(duyurular);
	}


	

	@GetMapping("/duyurular/arama")
	public ResponseEntity<List<Duyurular>> searchDuyuruByKonu(@RequestParam("konu") String konu) {
		 List<Duyurular> sonuc = duyurularService.searchByKonu(konu);
		 return ResponseEntity.ok(sonuc);
	}

	@GetMapping("/duyurular/sirala/tarih")
	public ResponseEntity<List<Duyurular>> getDuyurularByDateDesc() {
		  List<Duyurular> siraliDuyurular = duyurularService.getAllDuyurularOrderByDateDesc();
		  return ResponseEntity.ok(siraliDuyurular);
	}



	@GetMapping("/duyurular/sirala/konu")
	public ResponseEntity<List<Duyurular>> getDuyurularByKonuAsc() {
		List<Duyurular> siraliDuyurular = duyurularService.getAllDuyurularOrderByKonuAsc();
		return ResponseEntity.ok(siraliDuyurular);
	}

	@GetMapping("/haberler/{id}")
	public ResponseEntity<Haberler> getHaberById(@PathVariable Long id) {
		Optional<Haberler> haber = haberlerService.getHaberById(id);
		return haber.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
}