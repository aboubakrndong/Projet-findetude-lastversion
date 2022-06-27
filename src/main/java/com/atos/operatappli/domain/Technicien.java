package com.atos.operatappli.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Technicien.
 */
@Entity
@Table(name = "technicien")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "technicien")
public class Technicien implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "datedenaissance")
    private LocalDate datedenaissance;

    @Column(name = "specialite")
    private String specialite;

    @Column(name = "email")
    private String email;

    @Column(name = "domaine")
    private String domaine;

    @ManyToMany(mappedBy = "techniciens")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Alertes> alertes = new HashSet<>();

    @ManyToMany(mappedBy = "techniciens")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Taches> taches = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Technicien nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Technicien prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public LocalDate getDatedenaissance() {
        return datedenaissance;
    }

    public Technicien datedenaissance(LocalDate datedenaissance) {
        this.datedenaissance = datedenaissance;
        return this;
    }

    public void setDatedenaissance(LocalDate datedenaissance) {
        this.datedenaissance = datedenaissance;
    }

    public String getSpecialite() {
        return specialite;
    }

    public Technicien specialite(String specialite) {
        this.specialite = specialite;
        return this;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public String getEmail() {
        return email;
    }

    public Technicien email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDomaine() {
        return domaine;
    }

    public Technicien domaine(String domaine) {
        this.domaine = domaine;
        return this;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public Set<Alertes> getAlertes() {
        return alertes;
    }

    public Technicien alertes(Set<Alertes> alertes) {
        this.alertes = alertes;
        return this;
    }

    public Technicien addAlertes(Alertes alertes) {
        this.alertes.add(alertes);
        alertes.getTechniciens().add(this);
        return this;
    }

    public Technicien removeAlertes(Alertes alertes) {
        this.alertes.remove(alertes);
        alertes.getTechniciens().remove(this);
        return this;
    }

    public void setAlertes(Set<Alertes> alertes) {
        this.alertes = alertes;
    }

    public Set<Taches> getTaches() {
        return taches;
    }

    public Technicien taches(Set<Taches> taches) {
        this.taches = taches;
        return this;
    }

    public Technicien addTaches(Taches taches) {
        this.taches.add(taches);
        taches.getTechniciens().add(this);
        return this;
    }

    public Technicien removeTaches(Taches taches) {
        this.taches.remove(taches);
        taches.getTechniciens().remove(this);
        return this;
    }

    public void setTaches(Set<Taches> taches) {
        this.taches = taches;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Technicien)) {
            return false;
        }
        return id != null && id.equals(((Technicien) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Technicien{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", datedenaissance='" + getDatedenaissance() + "'" +
            ", specialite='" + getSpecialite() + "'" +
            ", email='" + getEmail() + "'" +
            ", domaine='" + getDomaine() + "'" +
            "}";
    }
}
