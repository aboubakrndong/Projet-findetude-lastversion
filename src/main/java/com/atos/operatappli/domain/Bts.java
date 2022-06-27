package com.atos.operatappli.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Bts.
 */
@Entity
@Table(name = "bts")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "bts")
public class Bts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "puissance")
    private String puissance;

    @Column(name = "etat")
    private String etat;

    @OneToMany(mappedBy = "bts")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Alertes> alertes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("bts")
    private Zones zones;

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

    public Bts type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPuissance() {
        return puissance;
    }

    public Bts puissance(String puissance) {
        this.puissance = puissance;
        return this;
    }

    public void setPuissance(String puissance) {
        this.puissance = puissance;
    }

    public String getEtat() {
        return etat;
    }

    public Bts etat(String etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Set<Alertes> getAlertes() {
        return alertes;
    }

    public Bts alertes(Set<Alertes> alertes) {
        this.alertes = alertes;
        return this;
    }

    public Bts addAlertes(Alertes alertes) {
        this.alertes.add(alertes);
        alertes.setBts(this);
        return this;
    }

    public Bts removeAlertes(Alertes alertes) {
        this.alertes.remove(alertes);
        alertes.setBts(null);
        return this;
    }

    public void setAlertes(Set<Alertes> alertes) {
        this.alertes = alertes;
    }

    public Zones getZones() {
        return zones;
    }

    public Bts zones(Zones zones) {
        this.zones = zones;
        return this;
    }

    public void setZones(Zones zones) {
        this.zones = zones;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bts)) {
            return false;
        }
        return id != null && id.equals(((Bts) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Bts{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", puissance='" + getPuissance() + "'" +
            ", etat='" + getEtat() + "'" +
            "}";
    }
}
