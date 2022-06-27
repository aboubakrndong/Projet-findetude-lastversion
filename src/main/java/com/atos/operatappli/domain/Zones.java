package com.atos.operatappli.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Zones.
 */
@Entity
@Table(name = "zones")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "zones")
public class Zones implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "nomzone")
    private String nomzone;

    @Column(name = "couverture")
    private String couverture;

    @Column(name = "cadastre")
    private String cadastre;

    @Column(name = "population")
    private String population;

    @OneToMany(mappedBy = "zones")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Qos> qos = new HashSet<>();

    @OneToMany(mappedBy = "zones")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Kpi> kpis = new HashSet<>();

    @OneToMany(mappedBy = "zones")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Bts> bts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomzone() {
        return nomzone;
    }

    public Zones nomzone(String nomzone) {
        this.nomzone = nomzone;
        return this;
    }

    public void setNomzone(String nomzone) {
        this.nomzone = nomzone;
    }

    public String getCouverture() {
        return couverture;
    }

    public Zones couverture(String couverture) {
        this.couverture = couverture;
        return this;
    }

    public void setCouverture(String couverture) {
        this.couverture = couverture;
    }

    public String getCadastre() {
        return cadastre;
    }

    public Zones cadastre(String cadastre) {
        this.cadastre = cadastre;
        return this;
    }

    public void setCadastre(String cadastre) {
        this.cadastre = cadastre;
    }

    public String getPopulation() {
        return population;
    }

    public Zones population(String population) {
        this.population = population;
        return this;
    }

    public void setPopulation(String population) {
        this.population = population;
    }

    public Set<Qos> getQos() {
        return qos;
    }

    public Zones qos(Set<Qos> qos) {
        this.qos = qos;
        return this;
    }

    public Zones addQos(Qos qos) {
        this.qos.add(qos);
        qos.setZones(this);
        return this;
    }

    public Zones removeQos(Qos qos) {
        this.qos.remove(qos);
        qos.setZones(null);
        return this;
    }

    public void setQos(Set<Qos> qos) {
        this.qos = qos;
    }

    public Set<Kpi> getKpis() {
        return kpis;
    }

    public Zones kpis(Set<Kpi> kpis) {
        this.kpis = kpis;
        return this;
    }

    public Zones addKpi(Kpi kpi) {
        this.kpis.add(kpi);
        kpi.setZones(this);
        return this;
    }

    public Zones removeKpi(Kpi kpi) {
        this.kpis.remove(kpi);
        kpi.setZones(null);
        return this;
    }

    public void setKpis(Set<Kpi> kpis) {
        this.kpis = kpis;
    }

    public Set<Bts> getBts() {
        return bts;
    }

    public Zones bts(Set<Bts> bts) {
        this.bts = bts;
        return this;
    }

    public Zones addBts(Bts bts) {
        this.bts.add(bts);
        bts.setZones(this);
        return this;
    }

    public Zones removeBts(Bts bts) {
        this.bts.remove(bts);
        bts.setZones(null);
        return this;
    }

    public void setBts(Set<Bts> bts) {
        this.bts = bts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Zones)) {
            return false;
        }
        return id != null && id.equals(((Zones) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Zones{" +
            "id=" + getId() +
            ", nomzone='" + getNomzone() + "'" +
            ", couverture='" + getCouverture() + "'" +
            ", cadastre='" + getCadastre() + "'" +
            ", population='" + getPopulation() + "'" +
            "}";
    }
}
