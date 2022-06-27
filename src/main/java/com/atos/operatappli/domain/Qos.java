package com.atos.operatappli.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Qos.
 */
@Entity
@Table(name = "qos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "qos")
public class Qos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "traffic")
    private String traffic;

    @Column(name = "tempsdereponse")
    private String tempsdereponse;

    @Column(name = "sensibilite")
    private String sensibilite;

    @Column(name = "debit")
    private String debit;

    @ManyToOne
    @JsonIgnoreProperties("qos")
    private Zones zones;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTraffic() {
        return traffic;
    }

    public Qos traffic(String traffic) {
        this.traffic = traffic;
        return this;
    }

    public void setTraffic(String traffic) {
        this.traffic = traffic;
    }

    public String getTempsdereponse() {
        return tempsdereponse;
    }

    public Qos tempsdereponse(String tempsdereponse) {
        this.tempsdereponse = tempsdereponse;
        return this;
    }

    public void setTempsdereponse(String tempsdereponse) {
        this.tempsdereponse = tempsdereponse;
    }

    public String getSensibilite() {
        return sensibilite;
    }

    public Qos sensibilite(String sensibilite) {
        this.sensibilite = sensibilite;
        return this;
    }

    public void setSensibilite(String sensibilite) {
        this.sensibilite = sensibilite;
    }

    public String getDebit() {
        return debit;
    }

    public Qos debit(String debit) {
        this.debit = debit;
        return this;
    }

    public void setDebit(String debit) {
        this.debit = debit;
    }

    public Zones getZones() {
        return zones;
    }

    public Qos zones(Zones zones) {
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
        if (!(o instanceof Qos)) {
            return false;
        }
        return id != null && id.equals(((Qos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Qos{" +
            "id=" + getId() +
            ", traffic='" + getTraffic() + "'" +
            ", tempsdereponse='" + getTempsdereponse() + "'" +
            ", sensibilite='" + getSensibilite() + "'" +
            ", debit='" + getDebit() + "'" +
            "}";
    }
}
