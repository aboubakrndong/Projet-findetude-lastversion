package com.atos.operatappli.repository;

import com.atos.operatappli.domain.Zones;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Zones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZonesRepository extends JpaRepository<Zones, Long> {

}
