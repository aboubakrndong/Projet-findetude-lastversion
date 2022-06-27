package com.atos.operatappli.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Alertes.
 */
@Entity
@Table(name = "alertes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "alertes")
public class Alertes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "destinataire")
    private String destinataire;

    @Column(name = "details")
    private String details;

    @Column(name = "date")
    private LocalDate date;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "alertes_technicien",
               joinColumns = @JoinColumn(name = "alertes_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "technicien_id", referencedColumnName = "id"))
    private Set<Technicien> techniciens = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("alertes")
    private Bts bts;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDestinataire() {
        return destinataire;
    }

    public Alertes destinataire(String destinataire) {
        this.destinataire = destinataire;
        return this;
    }

    public void setDestinataire(String destinataire) {
        this.destinataire = destinataire;
    }

    public String getDetails() {
        return details;
    }

    public Alertes details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public LocalDate getDate() {
        return date;
    }

    public Alertes date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Technicien> getTechniciens() {
        return techniciens;
    }

    public Alertes techniciens(Set<Technicien> techniciens) {
        this.techniciens = techniciens;
        return this;
    }

    public Alertes addTechnicien(Technicien technicien) {
        this.techniciens.add(technicien);
        technicien.getAlertes().add(this);
        return this;
    }

    public Alertes removeTechnicien(Technicien technicien) {
        this.techniciens.remove(technicien);
        technicien.getAlertes().remove(this);
        return this;
    }

    public void setTechniciens(Set<Technicien> techniciens) {
        this.techniciens = techniciens;
    }

    public Bts getBts() {
        return bts;
    }

    public Alertes bts(Bts bts) {
        this.bts = bts;
        return this;
    }

    public void setBts(Bts bts) {
        this.bts = bts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Alertes)) {
            return false;
        }
        return id != null && id.equals(((Alertes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Alertes{" +
            "id=" + getId() +
            ", destinataire='" + getDestinataire() + "'" +
            ", details='" + getDetails() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
