package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.time.LocalDate;


@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "etkinlik_turu", discriminatorType = DiscriminatorType.STRING)
@Table(name = "Etkinlikler")
public abstract class Etkinlik implements Serializable {
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String konu;
    
    @Lob
    @Column(
    	      name = "içerik",
    	      nullable = false,
    	      columnDefinition = "LONGTEXT"
    	    )
    private String içerik;
    private	LocalDate gecerlilikTarihi;
    

    public String getKonu() {
		return konu;
	}

	public void setKonu(String konu) {
		this.konu = konu;
	}

	public String getIçerik() {
		return içerik;
	}

	public void setIçerik(String içerik) {
		this.içerik = içerik;
	}

	public LocalDate getGecerlilikTarihi() {
		return gecerlilikTarihi;
	}

	public void setGecerlilikTarihi(LocalDate gecerlilikTarihi) {
		this.gecerlilikTarihi = gecerlilikTarihi;
	}

	    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}







