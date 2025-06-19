package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Haberler;
import java.util.List;

@Repository
public interface HaberlerRepository extends JpaRepository< Haberler, Long>{
	List<Haberler> findByKonuContainingIgnoreCase(String konu);
    List<Haberler> findAllByOrderByGecerlilikTarihiDesc();
    List<Haberler> findAllByOrderByKonuAsc();

}
