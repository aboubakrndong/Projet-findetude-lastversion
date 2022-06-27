package com.atos.operatappli.domain;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "taches")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "taches")
public class Taches implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "datededebut")
    private LocalDate datededebut;

    @Column(name = "datedefin")
    private LocalDate datedefin;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "taches_technicien",
               joinColumns = @JoinColumn(name = "taches_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "technicien_id", referencedColumnName = "id"))
    private Set<Technicien> techniciens = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Taches type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getDatededebut() {
        return datededebut;
    }

    public Taches datededebut(LocalDate datededebut) {
        this.datededebut = datededebut;
        return this;
    }

    public void setDatededebut(LocalDate datededebut) {
        this.datededebut = datededebut;
    }

    public LocalDate getDatedefin() {
        return datedefin;
    }

    public Taches datedefin(LocalDate datedefin) {
        this.datedefin = datedefin;
        return this;
    }

    public void setDatedefin(LocalDate datedefin) {
        this.datedefin = datedefin;
    }

    public Set<Technicien> getTechniciens() {
        return techniciens;
    }

    public Taches techniciens(Set<Technicien> techniciens) {
        this.techniciens = techniciens;
        return this;
    }

    public Taches addTechnicien(Technicien technicien) {
        this.techniciens.add(technicien);
        technicien.getTaches().add(this);
        return this;
    }

    public Taches removeTechnicien(Technicien technicien) {
        this.techniciens.remove(technicien);
        technicien.getTaches().remove(this);
        return this;
    }

    public void setTechniciens(Set<Technicien> techniciens) {
        this.techniciens = techniciens;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Taches)) {
            return false;
        }
        return id != null && id.equals(((Taches) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Taches{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", datededebut='" + getDatededebut() + "'" +
            ", datedefin='" + getDatedefin() + "'" +
            "}";
    }
}
