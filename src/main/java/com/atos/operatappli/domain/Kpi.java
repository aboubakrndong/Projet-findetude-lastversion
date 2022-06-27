package com.atos.operatappli.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Kpi.
 */
@Entity
@Table(name = "kpi")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "kpi")
public class Kpi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "tauxdappels")
    private String tauxdappels;

    @Column(name = "tauxdepertes")
    private String tauxdepertes;

    @Column(name = "tauxderejets")
    private String tauxderejets;

    @ManyToOne
    @JsonIgnoreProperties("kpis")
    private Zones zones;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTauxdappels() {
        return tauxdappels;
    }

    public Kpi tauxdappels(String tauxdappels) {
        this.tauxdappels = tauxdappels;
        return this;
    }

    public void setTauxdappels(String tauxdappels) {
        this.tauxdappels = tauxdappels;
    }

    public String getTauxdepertes() {
        return tauxdepertes;
    }

    public Kpi tauxdepertes(String tauxdepertes) {
        this.tauxdepertes = tauxdepertes;
        return this;
    }

    public void setTauxdepertes(String tauxdepertes) {
        this.tauxdepertes = tauxdepertes;
    }

    public String getTauxderejets() {
        return tauxderejets;
    }

    public Kpi tauxderejets(String tauxderejets) {
        this.tauxderejets = tauxderejets;
        return this;
    }

    public void setTauxderejets(String tauxderejets) {
        this.tauxderejets = tauxderejets;
    }

    public Zones getZones() {
        return zones;
    }

    public Kpi zones(Zones zones) {
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
        if (!(o instanceof Kpi)) {
            return false;
        }
        return id != null && id.equals(((Kpi) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Kpi{" +
            "id=" + getId() +
            ", tauxdappels='" + getTauxdappels() + "'" +
            ", tauxdepertes='" + getTauxdepertes() + "'" +
            ", tauxderejets='" + getTauxderejets() + "'" +
            "}";
    }
}
