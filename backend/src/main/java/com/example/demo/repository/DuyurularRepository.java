package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Duyurular;
import java.util.List;

@Repository
public interface DuyurularRepository extends JpaRepository<Duyurular,Long>{
	List<Duyurular> findByKonuContainingIgnoreCase(String konu);
    List<Duyurular> findAllByOrderByGecerlilikTarihiDesc();
    List<Duyurular> findAllByOrderByKonuAsc();
}
